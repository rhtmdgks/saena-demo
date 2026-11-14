import type { BrandVisibilityData, CitationAnalysisData, TopicVisibilityData, HomeContentData, MarketingStrategyData, STPData, ShoppingContentData, ModelContentData, IndustryContentData } from "@/types/dashboard";

export type DashboardFailure = "unmeasured" | "authenticationRequired" | "accessDenied" | "upstreamUnavailable" | "invalidResponse";
export class DashboardDataError extends Error {
  constructor(public readonly code: DashboardFailure) { super(code); this.name = "DashboardDataError"; }
}
export function dashboardFailure(error: unknown): DashboardFailure {
  return error instanceof DashboardDataError ? error.code : "upstreamUnavailable";
}

// No demo fallback, client-selected tenant, token storage, or persistent cross-user cache.
async function dashboard(): Promise<Record<string, unknown>> {
  let response: Response;
  try { response = await fetch("/api/rapid7/dashboard", { credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } }); }
  catch { throw new DashboardDataError("upstreamUnavailable"); }
  if (response.status === 401) throw new DashboardDataError("authenticationRequired");
  if (response.status === 403) throw new DashboardDataError("accessDenied");
  if (!response.ok) throw new DashboardDataError("upstreamUnavailable");
  let body: unknown;
  try { body = await response.json(); } catch { throw new DashboardDataError("invalidResponse"); }
  if (!body || typeof body !== "object") throw new DashboardDataError("invalidResponse");
  const envelope = body as Record<string, unknown>;
  if (envelope.schemaVersion !== 1 || envelope.provider !== "chatgpt-search" || !envelope.sections || typeof envelope.sections !== "object") throw new DashboardDataError("invalidResponse");
  return envelope;
}

async function section<T>(key: string): Promise<T> {
  const envelope = await dashboard();
  const value = (envelope.sections as Record<string, unknown>)[key];
  if (!value || typeof value !== "object") throw new DashboardDataError("invalidResponse");
  const result = value as Record<string, unknown>;
  if (result.status === "unmeasured") throw new DashboardDataError("unmeasured");
  if (result.status !== "measured" || !result.data || typeof result.data !== "object" || Array.isArray(result.data)) throw new DashboardDataError("invalidResponse");
  // Shape validation and provenance are owned by the server-side adapter contract.
  return result.data as T;
}

export const getBrandVisibilityData = () => section<BrandVisibilityData>("brandVisibility");
export const getCitationAnalysisData = () => section<CitationAnalysisData>("citationAnalysis");
export const getTopicVisibilityData = () => section<TopicVisibilityData>("topicVisibility");
export const getHomeContentData = () => section<HomeContentData>("homeContent");
export const getMarketingStrategyData = () => section<MarketingStrategyData>("marketingStrategy");
export const getSTPData = () => section<STPData>("stp");
export const getShoppingContentData = () => section<ShoppingContentData>("shoppingContent");
export const getIndustryContentData = () => section<IndustryContentData>("industryContent");
export async function getModelContentData(): Promise<ModelContentData> {
  const data = await section<ModelContentData>("modelContent");
  if (!Array.isArray(data.models) || data.models.some(model => model.name !== "ChatGPT" && model.name !== "ChatGPT Search")) throw new DashboardDataError("invalidResponse");
  return data;
}

export interface HtmlAuditData {
  reportId: string;
  report: { scope: "offline_supplied_html"; expected_page_count: number; measured_page_count: number;
    unmeasured_pages: string[]; measured_pages: { page_url: string; evidence_ref: string; findings: { code: string; level: string; detail: string; lines: number[] }[]; unknown: string[] }[];
    warnings: string[]; limitations: string[];
  };
}
export async function getHtmlAuditData(): Promise<HtmlAuditData> {
  const body = await dashboard();
  const audit = body.htmlAudit as HtmlAuditData | undefined;
  if (!audit || typeof audit.reportId !== "string" || !audit.report || audit.report.scope !== "offline_supplied_html" || !Number.isSafeInteger(audit.report.expected_page_count) || !Number.isSafeInteger(audit.report.measured_page_count) || !Array.isArray(audit.report.measured_pages) || !Array.isArray(audit.report.unmeasured_pages) || !Array.isArray(audit.report.limitations)) throw new DashboardDataError("invalidResponse");
  const report = audit.report;
  const textList = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");
  if (report.expected_page_count < 0 || report.measured_page_count < 0 || report.measured_pages.length !== report.measured_page_count || report.unmeasured_pages.length + report.measured_page_count !== report.expected_page_count || !textList(report.unmeasured_pages) || !textList(report.limitations) || !textList(report.warnings)) throw new DashboardDataError("invalidResponse");
  for (const page of report.measured_pages) {
    if (!page || typeof page.page_url !== "string" || typeof page.evidence_ref !== "string" || !textList(page.unknown) || !Array.isArray(page.findings) || page.findings.some(finding => !finding || typeof finding.code !== "string" || typeof finding.level !== "string" || typeof finding.detail !== "string" || !Array.isArray(finding.lines) || finding.lines.some(line => !Number.isSafeInteger(line) || line < 1))) throw new DashboardDataError("invalidResponse");
  }
  return audit;
}

export interface ObservationSummary {
  schema_version: 1;
  collection_id: string;
  tenant_id: string;
  engine_id: "chatgpt-search";
  status: "measured" | "unmeasured";
  sample_count: number;
  total_citations: number;
  unique_domains: number;
  by_day: { date: string; sample_count: number; citation_count: number }[];
  domain_counts: { domain: string; count: number }[];
  evidence_ids: string[];
  coverage: { expected_samples: number; measured_samples: number; missing_samples: number };
  provenance: { observation_id: string; artifact_hash: string; captured_at: string }[];
  limitations: string[];
}
export interface ObservationData { status: "measured" | "unmeasured"; collectionId?: string; data?: ObservationSummary; reason?: string }
export async function getObservationData(): Promise<ObservationData> {
  const envelope = await dashboard();
  const value = envelope.observations as ObservationData | undefined;
  if (!value || !["measured", "unmeasured"].includes(value.status)) throw new DashboardDataError("invalidResponse");
  if (!value.data) {
    if (value.status !== "unmeasured") throw new DashboardDataError("invalidResponse");
    return value;
  }
  const data = value.data;
  const count = (number: unknown) => typeof number === "number" && Number.isSafeInteger(number) && number >= 0;
  if (data.schema_version !== 1 || data.engine_id !== "chatgpt-search" || data.status !== value.status || typeof data.collection_id !== "string" || data.collection_id !== value.collectionId || !count(data.sample_count) || !count(data.total_citations) || !count(data.unique_domains) || !data.coverage || !Object.values(data.coverage).every(count) || data.coverage.measured_samples !== data.sample_count || data.coverage.expected_samples !== data.coverage.measured_samples + data.coverage.missing_samples || !Array.isArray(data.by_day) || !Array.isArray(data.domain_counts) || !Array.isArray(data.provenance) || !Array.isArray(data.evidence_ids) || !Array.isArray(data.limitations) || data.limitations.some(item => typeof item !== "string")) throw new DashboardDataError("invalidResponse");
  if ((value.status === "measured") !== (data.sample_count > 0) || data.by_day.some(day => !day || typeof day.date !== "string" || !count(day.sample_count) || !count(day.citation_count)) || data.domain_counts.some(domain => !domain || typeof domain.domain !== "string" || !count(domain.count)) || data.provenance.some(item => !item || typeof item.observation_id !== "string" || typeof item.artifact_hash !== "string" || typeof item.captured_at !== "string")) throw new DashboardDataError("invalidResponse");
  return value;
}
