/**
 * RUM (Real User Monitoring) Data Collection
 * Web Vitals 데이터 수집 엔드포인트
 */

import { NextRequest, NextResponse } from 'next/server';

interface RUMData {
  name: 'CLS' | 'FID' | 'LCP' | 'INP' | 'FCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  timestamp: number;
  navigationType?: string;
  deviceType?: string;
  connectionType?: string;
}

/**
 * POST /api/seo/rum
 * Web Vitals 데이터 수집
 */
export async function POST(request: NextRequest) {
  try {
    const data: RUMData = await request.json();
    
    // 데이터 검증
    if (!data.name || !data.value || !data.url) {
      return NextResponse.json(
        { error: 'Missing required fields: name, value, url' },
        { status: 400 }
      );
    }
    
    // 메트릭 이름 검증
    const validMetrics = ['CLS', 'FID', 'LCP', 'INP', 'FCP', 'TTFB'];
    if (!validMetrics.includes(data.name)) {
      return NextResponse.json(
        { error: `Invalid metric name: ${data.name}` },
        { status: 400 }
      );
    }
    
    // TODO: 데이터베이스에 저장
    // 권장: TimescaleDB, InfluxDB, 또는 Google Analytics Data API
    
    // 예시: 콘솔 로깅 (실제로는 DB 저장)
    console.log('[RUM]', {
      metric: data.name,
      value: data.value,
      rating: data.rating,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString()
    });
    
    // TODO: 임계값 초과 시 알림
    if (data.rating === 'poor') {
      console.warn(`[RUM Alert] ${data.name} is poor on ${data.url}: ${data.value}`);
      // Slack/Discord/Email 알림 전송
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'RUM data collected'
    });
    
  } catch (error) {
    console.error('[RUM Error]', error);
    return NextResponse.json(
      { error: 'Failed to collect RUM data' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/seo/rum
 * RUM 데이터 조회 (대시보드용)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const metric = searchParams.get('metric');
  const url = searchParams.get('url');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  
  try {
    // TODO: 데이터베이스에서 조회
    
    // Mock 데이터
    const mockData = {
      metric: metric || 'all',
      url: url || 'all',
      period: {
        start: startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: endDate || new Date().toISOString()
      },
      samples: 15420,
      metrics: {
        LCP: {
          p50: 1200,
          p75: 1650,
          p90: 2100,
          p95: 2500,
          good: 12340,
          needs_improvement: 2580,
          poor: 500
        },
        CLS: {
          p50: 0.03,
          p75: 0.06,
          p90: 0.12,
          p95: 0.18,
          good: 13200,
          needs_improvement: 1820,
          poor: 400
        },
        INP: {
          p50: 120,
          p75: 180,
          p90: 250,
          p95: 320,
          good: 13800,
          needs_improvement: 1320,
          poor: 300
        }
      }
    };
    
    return NextResponse.json(mockData);
    
  } catch (error) {
    console.error('[RUM Query Error]', error);
    return NextResponse.json(
      { error: 'Failed to query RUM data' },
      { status: 500 }
    );
  }
}
