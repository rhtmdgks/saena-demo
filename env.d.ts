/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly NEXT_PUBLIC_SITE_URL?: string;
    readonly NEXT_PUBLIC_GA_ID?: string;
    readonly NEXT_PUBLIC_GTM_ID?: string;
  }
}
