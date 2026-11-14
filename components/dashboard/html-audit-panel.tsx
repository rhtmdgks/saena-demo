"use client";
import { useEffect, useState } from "react";
import { getHtmlAuditData, dashboardFailure, type HtmlAuditData, type DashboardFailure } from "@/lib/api/dashboard-data";
import MeasurementState from "./measurement-state";

export default function HtmlAuditPanel() {
  const [audit, setAudit] = useState<HtmlAuditData>();
  const [error, setError] = useState<DashboardFailure>();
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  function handleRetry() {
    setLoading(true); setError(undefined); setAudit(undefined);
    setRetry(value => value + 1);
  }
  useEffect(() => {
    let active = true;
    getHtmlAuditData().then(value => { if (active) setAudit(value); }).catch(reason => { if (active) setError(dashboardFailure(reason)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  return <section className="space-y-4" aria-label="HTML diagnostic report">
    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">HTML Diagnostic Report</h3><button disabled={loading} onClick={handleRetry} className="px-3 py-1.5 text-xs rounded bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 disabled:opacity-50">{loading ? "조회 중" : "다시 조회"}</button></div>
    <p className="text-sm text-gray-500">제공된 HTML의 기술 진단입니다. 실제 AI 인용·트래픽·매출 또는 인용 상승을 측정한 결과가 아닙니다.</p>
    {loading ? <p role="status" className="text-sm text-gray-500">보고서를 확인하고 있습니다.</p> : error ? <MeasurementState code={error} title="HTML Diagnostics" labels={["Expected pages", "Examined pages", "Unmeasured pages"]} /> : audit ? <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[["Expected pages", audit.report.expected_page_count], ["Examined pages", audit.report.measured_page_count], ["Unmeasured pages", audit.report.unmeasured_pages.length]].map(([label, value]) => <div key={label} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]"><p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p><p className="text-sm text-gray-500">{label}</p></div>)}</div>
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] space-y-4">
        <p className="text-xs text-gray-500">Report: {audit.reportId}</p>
        {audit.report.measured_pages.map(page => <details key={page.page_url} className="border-b border-gray-200 dark:border-[#1F1F23] pb-3"><summary className="text-sm text-gray-900 dark:text-white cursor-pointer break-all">{page.page_url}</summary><p className="text-xs text-gray-500 break-all">Evidence: {page.evidence_ref}</p>{page.findings.length ? <ul className="space-y-2 mt-2">{page.findings.map((finding, index) => <li key={index} className="text-sm text-gray-600 dark:text-gray-400"><strong>{finding.code}</strong> · {finding.level}<p>{finding.detail}</p><p className="text-xs">Lines: {finding.lines.join(", ") || "--"}</p></li>)}</ul> : <p className="text-sm text-gray-500">이 HTML에 보고된 항목이 없습니다. 인용 적격성이나 성공을 의미하지 않습니다.</p>}<p className="text-xs text-gray-500">확인되지 않은 항목: {page.unknown.join(", ")}</p></details>)}
        {audit.report.unmeasured_pages.length > 0 && <div><h4 className="text-sm font-semibold text-gray-900 dark:text-white">Unmeasured pages</h4><ul>{audit.report.unmeasured_pages.map(url => <li className="text-xs text-gray-500 break-all" key={url}>{url}</li>)}</ul></div>}
        <ul className="text-xs text-gray-500 space-y-1">{audit.report.limitations.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </> : null}
  </section>;
}
