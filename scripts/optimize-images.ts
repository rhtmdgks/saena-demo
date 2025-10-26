#!/usr/bin/env tsx
/**
 * Image Optimization Script
 * CWV Autotuner - 이미지 자동 최적화
 */

import sharp from 'sharp';
import { writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import seoPolicy from '../configs/seo.policy.json';

const MAX_PIXELS = seoPolicy.cwv.hero_image_max_pixels;
const QUALITY = 80;
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

interface OptimizationResult {
  original: string;
  optimized: string[];
  originalSize: number;
  optimizedSizes: Record<string, number>;
  originalDimensions: { width: number; height: number };
  optimizedDimensions: { width: number; height: number };
  pixelReduction: number;
}

/**
 * 이미지 최적화
 */
async function optimizeImage(filePath: string): Promise<OptimizationResult | null> {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.warn(`⚠️  Skipping ${filePath}: No dimensions`);
      return null;
    }
    
    const pixels = metadata.width * metadata.height;
    const originalSize = (await image.toBuffer()).length;
    
    const result: OptimizationResult = {
      original: filePath,
      optimized: [],
      originalSize,
      optimizedSizes: {},
      originalDimensions: { width: metadata.width, height: metadata.height },
      optimizedDimensions: { width: metadata.width, height: metadata.height },
      pixelReduction: 0
    };
    
    // 픽셀 수가 임계값을 초과하면 리사이즈
    let targetWidth = metadata.width;
    let targetHeight = metadata.height;
    
    if (pixels > MAX_PIXELS) {
      const scale = Math.sqrt(MAX_PIXELS / pixels);
      targetWidth = Math.round(metadata.width * scale);
      targetHeight = Math.round(metadata.height * scale);
      
      result.optimizedDimensions = { width: targetWidth, height: targetHeight };
      result.pixelReduction = ((pixels - (targetWidth * targetHeight)) / pixels) * 100;
      
      console.log(`📐 Resizing ${basename(filePath)}: ${metadata.width}x${metadata.height} → ${targetWidth}x${targetHeight}`);
    }
    
    const dir = dirname(filePath);
    const name = basename(filePath, extname(filePath));
    
    // AVIF 생성
    const avifPath = join(dir, `${name}.avif`);
    await image
      .resize(targetWidth, targetHeight)
      .avif({ quality: QUALITY })
      .toFile(avifPath);
    
    const avifSize = (await sharp(avifPath).toBuffer()).length;
    result.optimized.push(avifPath);
    result.optimizedSizes['avif'] = avifSize;
    
    // WebP 생성
    const webpPath = join(dir, `${name}.webp`);
    await image
      .resize(targetWidth, targetHeight)
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    
    const webpSize = (await sharp(webpPath).toBuffer()).length;
    result.optimized.push(webpPath);
    result.optimizedSizes['webp'] = webpSize;
    
    return result;
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error);
    return null;
  }
}

/**
 * 최적화 리포트 생성
 */
function generateReport(results: OptimizationResult[]): string {
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimizedSize = results.reduce((sum, r) => {
    return sum + Math.min(...Object.values(r.optimizedSizes));
  }, 0);
  
  const savings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = (savings / totalOriginalSize) * 100;
  
  let report = '\n' + '='.repeat(60) + '\n';
  report += '📊 Image Optimization Report\n';
  report += '='.repeat(60) + '\n\n';
  
  report += `Total Images: ${results.length}\n`;
  report += `Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB\n`;
  report += `Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB\n`;
  report += `Savings: ${(savings / 1024 / 1024).toFixed(2)} MB (${savingsPercent.toFixed(1)}%)\n\n`;
  
  report += 'Details:\n';
  report += '-'.repeat(60) + '\n';
  
  for (const result of results) {
    const bestFormat = Object.entries(result.optimizedSizes)
      .sort((a, b) => a[1] - b[1])[0];
    
    const sizeSavings = result.originalSize - bestFormat[1];
    const sizeSavingsPercent = (sizeSavings / result.originalSize) * 100;
    
    report += `\n${basename(result.original)}\n`;
    report += `  Original: ${(result.originalSize / 1024).toFixed(1)} KB (${result.originalDimensions.width}x${result.originalDimensions.height})\n`;
    report += `  Best: ${bestFormat[0].toUpperCase()} ${(bestFormat[1] / 1024).toFixed(1)} KB (${result.optimizedDimensions.width}x${result.optimizedDimensions.height})\n`;
    report += `  Savings: ${(sizeSavings / 1024).toFixed(1)} KB (${sizeSavingsPercent.toFixed(1)}%)\n`;
    
    if (result.pixelReduction > 0) {
      report += `  Pixel Reduction: ${result.pixelReduction.toFixed(1)}%\n`;
    }
  }
  
  report += '\n' + '='.repeat(60) + '\n';
  
  return report;
}

/**
 * 재귀적으로 디렉토리에서 이미지 찾기
 */
function findImages(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  
  try {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);
      
      if (stat.isDirectory()) {
        results.push(...findImages(filePath, extensions));
      } else {
        const ext = extname(file).toLowerCase();
        if (extensions.includes(ext) && !file.endsWith('.avif') && !file.endsWith('.webp')) {
          results.push(filePath);
        }
      }
    }
  } catch (error) {
    // 디렉토리가 없으면 무시
  }
  
  return results;
}

/**
 * 메인 실행
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`Max pixels: ${MAX_PIXELS.toLocaleString()}`);
  console.log(`Quality: ${QUALITY}\n`);
  
  // public 디렉토리의 이미지 찾기
  const allImages = findImages('public', SUPPORTED_FORMATS);
  
  console.log(`Found ${allImages.length} images to optimize\n`);
  
  if (allImages.length === 0) {
    console.log('✅ No images to optimize');
    return;
  }
  
  // 병렬 처리 (10개씩 배치)
  const BATCH_SIZE = 10;
  const results: OptimizationResult[] = [];
  
  for (let i = 0; i < allImages.length; i += BATCH_SIZE) {
    const batch = allImages.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (image) => {
        const result = await optimizeImage(image);
        if (result) {
          console.log(`✅ Optimized ${basename(image)}`);
        }
        return result;
      })
    );
    
    results.push(...batchResults.filter((r): r is OptimizationResult => r !== null));
  }
  
  // 리포트 생성 및 출력
  const report = generateReport(results);
  console.log(report);
  
  // 리포트 파일 저장
  const reportPath = 'optimization-report.txt';
  writeFileSync(reportPath, report);
  console.log(`📄 Report saved to ${reportPath}`);
}

// CLI 실행
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✨ Image optimization complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Optimization failed:', error);
      process.exit(1);
    });
}

export { optimizeImage, generateReport };
