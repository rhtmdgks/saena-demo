import type { DashboardFailure } from "@/lib/api/dashboard-data";

const messages: Record<DashboardFailure, string> = {
  unmeasured: "측정 전 · 검증된 ChatGPT Search 관측 자료가 아직 없습니다. 0점이나 성과 없음으로 해석하지 마세요.",
  authenticationRequired: "로그인이 필요합니다. 승인된 세션으로 다시 접속해 주세요.",
  accessDenied: "이 테넌트의 데이터 조회 권한이 없습니다.",
  upstreamUnavailable: "데이터 서비스에 연결할 수 없습니다. 측정값 대신 연결 상태를 확인해 주세요.",
  invalidResponse: "데이터 계약을 확인할 수 없습니다. 측정값은 표시하지 않습니다.",
};
export default function MeasurementState({ code = "unmeasured", title = "ChatGPT Search", labels = ["Visibility", "Citations", "Coverage", "Change"] }: { code?: DashboardFailure; title?: string; labels?: string[] }) {
  return <div className="space-y-6" role="status">
    <div><h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2><p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{messages[code]}</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{labels.map(label => <div key={label} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]"><p className="text-2xl font-bold text-gray-900 dark:text-white" aria-label="측정값 없음">--</p><p className="text-sm text-gray-600 dark:text-gray-400">{label}</p><p className="text-sm text-gray-500">{code === "unmeasured" ? "측정 전" : "조회 불가"}</p></div>)}</div>
  </div>;
}

export function MeasurementNotice({ code = "unmeasured" }: { code?: DashboardFailure }) { return <p role="status" className="text-sm text-gray-500 dark:text-gray-400 mb-4">{messages[code]}</p>; }
