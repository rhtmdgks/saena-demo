"use client";
import { useEffect, useState } from "react";
import { getObservationData, dashboardFailure, type ObservationData, type DashboardFailure } from "@/lib/api/dashboard-data";
import MeasurementState from "./measurement-state";

/** Observed counts are not brand visibility scores, causal lift or revenue. */
export default function ObservationPanel() {
  const [observation, setObservation] = useState<ObservationData>();
  const [error, setError] = useState<DashboardFailure>();
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  function handleRetry() {
    setLoading(true); setError(undefined); setObservation(undefined);
    setRetry(value => value + 1);
  }
  useEffect(() => {
    let active = true;
    getObservationData().then(value => { if (active) setObservation(value); }).catch(reason => { if (active) setError(dashboardFailure(reason)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  const data = observation?.data;
  const measured = observation?.status === "measured";
  return <section className="space-y-4 mb-6" aria-label="Registered ChatGPT Search observations">
    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">ChatGPT Search Observations</h3><button disabled={loading} onClick={handleRetry} className="px-3 py-1.5 text-xs rounded bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 disabled:opacity-50">{loading ? "조회 중" : "다시 조회"}</button></div>
    <p className="text-sm text-gray-500">등록된 관측의 인용 수 집계입니다. 브랜드 점수·인용 상승의 인과관계·매출 성과를 의미하지 않습니다.</p>
    {loading ? <p role="status" className="text-sm text-gray-500">관측 자료를 확인하고 있습니다.</p> : error ? <MeasurementState code={error} title="Observation data" labels={["Samples", "Citations", "Domains", "Coverage"]} /> : <>
      {!measured && <p role="status" className="text-sm text-gray-500">측정 전 · 등록된 유효 관측이 없습니다. 0 인용과는 다릅니다.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{[["Observed samples", measured ? data?.sample_count : "--"], ["Citation occurrences", measured ? data?.total_citations : "--"], ["Unique domains", measured ? data?.unique_domains : "--"], ["Coverage", data ? `${data.coverage.measured_samples} / ${data.coverage.expected_samples}` : "--"]].map(([label, value]) => <div key={label} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]"><p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p><p className="text-sm text-gray-500">{label}</p></div>)}</div>
      {data && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]"><h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Daily observations</h4><table className="w-full text-sm text-left"><thead className="text-gray-500"><tr><th>Date</th><th>Samples</th><th>Citations</th></tr></thead><tbody className="text-gray-900 dark:text-white">{data.by_day.map(day => <tr key={day.date}><td>{day.date}</td><td>{day.sample_count}</td><td>{day.citation_count}</td></tr>)}</tbody></table></div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]"><h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Observed citation domains</h4>{measured && data.total_citations === 0 ? <p className="text-sm text-gray-500">유효 관측 {data.sample_count}건에서 인용 0건이 관측되었습니다. 미측정과 구분됩니다.</p> : <ul className="text-sm text-gray-900 dark:text-white space-y-2">{data.domain_counts.map(domain => <li key={domain.domain} className="flex justify-between gap-4"><span className="break-all">{domain.domain}</span><span>{domain.count}</span></li>)}</ul>}</div>
        <details className="lg:col-span-2 bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]"><summary className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer">Evidence & limitations</summary><p className="text-xs text-gray-500 my-2">Collection: {data.collection_id} · Missing samples: {data.coverage.missing_samples}</p><ul className="text-xs text-gray-500 space-y-2">{data.provenance.map((entry, index) => <li key={index} className="break-all">{entry.observation_id} · {entry.captured_at}<br />{entry.artifact_hash}</li>)}{data.limitations.map(item => <li key={item}>{item}</li>)}</ul></details>
      </div>}
    </>}
  </section>;
}
