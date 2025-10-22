/**
 * Type definitions for ldrs (Loading Animations)
 */

declare module 'ldrs' {
  export interface LoaderConfig {
    register: () => void
  }

  export const bouncy: LoaderConfig
  export const ring: LoaderConfig
  export const dotSpinner: LoaderConfig
  export const spiral: LoaderConfig
  export const square: LoaderConfig
  export const tailspin: LoaderConfig
  export const trefoil: LoaderConfig
  export const waveform: LoaderConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'l-bouncy': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-ring': {
        size?: string | number
        speed?: string | number
        color?: string
        stroke?: string | number
      }
      'l-dot-spinner': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-spiral': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-square': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-tailspin': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-trefoil': {
        size?: string | number
        speed?: string | number
        color?: string
      }
      'l-waveform': {
        size?: string | number
        speed?: string | number
        color?: string
      }
    }
  }
}

export {}
