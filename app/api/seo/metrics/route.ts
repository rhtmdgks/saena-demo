/**
 * SEO Metrics API
 * CTR/Position/Impression/CWV/RUM 집계
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/seo/metrics
 * 쿼리 파라미터:
 * - metric: ctr | position | impression | cwv | rum
 * - start_date: YYYY-MM-DD
 * - end_date: YYYY-MM-DD
 * - url: 특정 URL 필터 (선택)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const metric = searchParams.get('metric') || 'all';
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const url = searchParams.get('url');
  
  try {
    // TODO: 실제 데이터베이스/GSC API에서 데이터 가져오기
    
    const mockData = {
      ctr: {
        average: 0.045,
        trend: '+12%',
        by_query: [
          { query: 'saena ai', ctr: 0.082, impressions: 1250, clicks: 103 },
          { query: 'ai platform', ctr: 0.034, impressions: 3400, clicks: 116 },
        ]
      },
      position: {
        average: 8.5,
        trend: '-2.3',
        by_query: [
          { query: 'saena ai', position: 3.2 },
          { query: 'ai platform', position: 12.8 },
        ]
      },
      cwv: {
        lcp_p75: 1650,
        cls_p75: 0.06,
        inp_p75: 180,
        passing_urls: 42,
        total_urls: 50
      },
      rum: {
        samples: 15420,
        period: '7d',
        metrics: {
          lcp: { p50: 1200, p75: 1650, p90: 2100 },
          cls: { p50: 0.03, p75: 0.06, p90: 0.12 },
          inp: { p50: 120, p75: 180, p90: 250 }
        }
      }
    };
    
    if (metric === 'all') {
      return NextResponse.json(mockData);
    }
    
    return NextResponse.json(mockData[metric as keyof typeof mockData] || {});
    
  } catch (error) {
    console.error('SEO metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seo/metrics/rum
 * RUM 데이터 수집 엔드포인트
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 데이터 검증
    if (!data.name || !data.value || !data.url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // TODO: 데이터베이스에 저장
    // - 시계열 데이터베이스 (InfluxDB, TimescaleDB)
    // - 또는 Google Analytics Data API
    
    console.log('RUM data received:', {
      metric: data.name,
      value: data.value,
      url: data.url,
      timestamp: data.timestamp
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('RUM collection error:', error);
    return NextResponse.json(
      { error: 'Failed to collect RUM data' },
      { status: 500 }
    );
  }
}
