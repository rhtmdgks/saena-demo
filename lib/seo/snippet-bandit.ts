/**
 * Snippet Optimizer (CTR 밴딧)
 * Thompson Sampling으로 타이틀/디스크립션 최적화
 */

import type { SnippetVariant, BanditState, SnippetBanditConfig } from './types';

/**
 * 베타 분포에서 샘플링 (개선된 버전)
 * α=β=1일 때 Uniform(0,1) 보장
 * shape < 1 무한재귀 방지
 */
function betaSample(alpha: number, beta: number): number {
  // 파라미터 보정: 최소값 1e-3으로 제한하여 수치 안정성 확보
  const a = Math.max(alpha, 1e-3);
  const b = Math.max(beta, 1e-3);
  
  // 간단한 Beta 근사 (α, β가 작을 때 안정적)
  // 정확한 샘플링이 필요하면 jstat.beta.sample(α, β) 사용 권장
  if (a === 1 && b === 1) {
    // Uniform(0,1) 특수 케이스
    return Math.random();
  }
  
  // Gamma ratio method with numerical stability
  const gammaA = gammaRandom(a, 1);
  const gammaB = gammaRandom(b, 1);
  
  // 0-division 방지
  const sum = gammaA + gammaB;
  return sum > 0 ? gammaA / sum : 0.5;
}

/**
 * 감마 분포 랜덤 샘플 (개선된 Marsaglia and Tsang)
 * shape < 1 무한재귀 방지
 */
function gammaRandom(shape: number, scale: number): number {
  // shape가 너무 작으면 1로 보정 (무한재귀 방지)
  if (shape < 1e-3) {
    shape = 1.0;
  }
  
  // shape < 1인 경우 변환 사용
  if (shape < 1) {
    const u = Math.random();
    return gammaRandom(shape + 1, scale) * Math.pow(u, 1 / shape);
  }
  
  // Marsaglia and Tsang method (shape >= 1)
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  
  let maxIterations = 1000; // 무한루프 방지
  while (maxIterations-- > 0) {
    let x, v;
    do {
      x = normalRandom();
      v = 1 + c * x;
    } while (v <= 0);
    
    v = v * v * v;
    const u = Math.random();
    
    if (u < 1 - 0.0331 * x * x * x * x) {
      return d * v * scale;
    }
    
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return d * v * scale;
    }
  }
  
  // Fallback: 최대 반복 초과 시 평균값 반환
  return shape * scale;
}

/**
 * 정규 분포 랜덤 샘플 (Box-Muller)
 */
function normalRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * Thompson Sampling으로 arm 선택
 */
export function selectVariant(variants: SnippetVariant[]): SnippetVariant {
  let maxSample = -1;
  let selectedVariant = variants[0];
  
  for (const variant of variants) {
    const sample = betaSample(variant.alpha, variant.beta);
    if (sample > maxSample) {
      maxSample = sample;
      selectedVariant = variant;
    }
  }
  
  return selectedVariant;
}

/**
 * 밴딧 상태 업데이트 (GSC 데이터 기반)
 */
export function updateBanditState(
  state: BanditState,
  gscData: { variant_id: string; impressions: number; clicks: number }[],
  config: SnippetBanditConfig
): BanditState {
  const updatedVariants = state.variants.map(variant => {
    const data = gscData.find(d => d.variant_id === variant.id);
    
    if (!data) return variant;
    
    const newImpressions = variant.impressions + data.impressions;
    const newClicks = variant.clicks + data.clicks;
    const newCTR = newImpressions > 0 ? newClicks / newImpressions : 0;
    
    // 베타 분포 파라미터 업데이트
    const newAlpha = variant.alpha + data.clicks;
    const newBeta = variant.beta + (data.impressions - data.clicks);
    
    return {
      ...variant,
      impressions: newImpressions,
      clicks: newClicks,
      ctr: newCTR,
      alpha: newAlpha,
      beta: newBeta
    };
  });
  
  // 하위 arm prune (충분한 샘플 후)
  const totalImpressions = updatedVariants.reduce((sum, v) => sum + v.impressions, 0);
  
  let finalVariants = updatedVariants;
  if (totalImpressions >= config.min_impressions * updatedVariants.length) {
    const sortedByCTR = [...updatedVariants].sort((a, b) => b.ctr - a.ctr);
    
    // 상위 (1 - prune_threshold)% 유지
    // 예: prune_threshold=0.3 → 상위 70% 유지
    const keepCount = Math.max(
      1, // 최소 1개는 유지
      Math.ceil(updatedVariants.length * (1 - config.prune_threshold))
    );
    
    finalVariants = sortedByCTR.slice(0, keepCount);
  }
  
  return {
    ...state,
    variants: finalVariants,
    last_updated: new Date().toISOString(),
    total_impressions: totalImpressions
  };
}

/**
 * 클릭베이트 검증
 */
export function validateSnippet(
  title: string,
  description: string,
  config: SnippetBanditConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const combinedText = `${title} ${description}`.toLowerCase();
  
  // 금지어 체크
  for (const forbidden of config.clickbait_forbidden) {
    if (combinedText.includes(forbidden.toLowerCase())) {
      errors.push(`Clickbait 금지어 포함: "${forbidden}"`);
    }
  }
  
  // 과도한 대문자 체크
  const upperCaseRatio = (title.match(/[A-Z]/g) || []).length / title.length;
  if (upperCaseRatio > 0.5) {
    errors.push('과도한 대문자 사용');
  }
  
  // 과도한 특수문자 체크
  const specialCharCount = (title.match(/[!?]{2,}/g) || []).length;
  if (specialCharCount > 0) {
    errors.push('과도한 특수문자 사용');
  }
  
  // 길이 체크
  if (title.length > 60) {
    errors.push('타이틀 길이 초과 (권장: 60자 이하)');
  }
  
  if (description.length > 160) {
    errors.push('디스크립션 길이 초과 (권장: 160자 이하)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 스니펫 변형안 생성
 */
export function generateVariants(
  baseTitle: string,
  baseDescription: string,
  keyword: string,
  config: SnippetBanditConfig
): SnippetVariant[] {
  const variants: SnippetVariant[] = [];
  
  // 베이스 변형
  variants.push({
    id: 'v1-base',
    title: baseTitle,
    description: baseDescription,
    alpha: config.alpha_init,
    beta: config.beta_init,
    impressions: 0,
    clicks: 0,
    ctr: 0
  });
  
  // 키워드 앞배치 변형
  variants.push({
    id: 'v2-keyword-front',
    title: `${keyword}: ${baseTitle}`,
    description: baseDescription,
    alpha: config.alpha_init,
    beta: config.beta_init,
    impressions: 0,
    clicks: 0,
    ctr: 0
  });
  
  // 숫자/리스트 변형
  variants.push({
    id: 'v3-numbered',
    title: `${baseTitle} - 5가지 핵심 포인트`,
    description: `${keyword}에 대한 완벽 가이드. ${baseDescription}`,
    alpha: config.alpha_init,
    beta: config.beta_init,
    impressions: 0,
    clicks: 0,
    ctr: 0
  });
  
  // 연도 변형
  const currentYear = new Date().getFullYear();
  variants.push({
    id: 'v4-year',
    title: `${baseTitle} (${currentYear})`,
    description: `최신 업데이트: ${baseDescription}`,
    alpha: config.alpha_init,
    beta: config.beta_init,
    impressions: 0,
    clicks: 0,
    ctr: 0
  });
  
  // 검증 및 필터링
  const validVariants = variants.filter(v => {
    const validation = validateSnippet(v.title, v.description, config);
    return validation.valid;
  });
  
  return validVariants.slice(0, config.max_variants);
}
