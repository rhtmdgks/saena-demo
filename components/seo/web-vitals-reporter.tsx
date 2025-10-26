'use client';

/**
 * Web Vitals Reporter
 * 클라이언트 사이드 RUM 데이터 수집
 */

import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onINP, onFCP, onTTFB } from 'web-vitals';

interface WebVitalsReporterProps {
  /**
   * 디버그 모드 (콘솔 로깅)
   */
  debug?: boolean;
  
  /**
   * 샘플링 비율 (0.0 ~ 1.0)
   * 예: 0.1 = 10%의 사용자만 데이터 전송
   */
  samplingRate?: number;
}

export function WebVitalsReporter({ 
  debug = false, 
  samplingRate = 1.0 
}: WebVitalsReporterProps) {
  useEffect(() => {
    // 샘플링 체크
    if (Math.random() > samplingRate) {
      if (debug) console.log('[Web Vitals] Skipped due to sampling');
      return;
    }
    
    function sendToAnalytics(metric: any) {
      const body = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
        navigationType: metric.navigationType,
        // 추가 컨텍스트
        deviceType: getDeviceType(),
        connectionType: getConnectionType()
      };
      
      if (debug) {
        console.log('[Web Vitals]', body);
      }
      
      // Beacon API 사용 (페이지 이탈 시에도 전송 보장)
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        navigator.sendBeacon('/api/seo/rum', blob);
      } else {
        // Fallback: fetch
        fetch('/api/seo/rum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          keepalive: true
        }).catch(err => {
          if (debug) console.error('[Web Vitals] Send failed:', err);
        });
      }
    }
    
    // Web Vitals 수집
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    
  }, [debug, samplingRate]);
  
  return null;
}

/**
 * 디바이스 타입 감지
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  
  return 'desktop';
}

/**
 * 연결 타입 감지
 */
function getConnectionType(): string {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return 'unknown';
  
  return connection.effectiveType || connection.type || 'unknown';
}
