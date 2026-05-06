import type { OverwolfGameEvent } from './overwolf/gepAdapter'

declare global {
  interface Window {
    overwolf?: {
      games?: {
        events?: {
          setRequiredFeatures: (
            features: string[],
            callback: (result: { success: boolean; error?: string; supportedFeatures?: string[] }) => void,
          ) => void
          onNewEvents?: {
            addListener: (listener: (event: { events?: OverwolfGameEvent[] }) => void) => void
            removeListener?: (listener: (event: { events?: OverwolfGameEvent[] }) => void) => void
          }
          onInfoUpdates2?: {
            addListener: (listener: (event: { info?: Record<string, unknown> }) => void) => void
            removeListener?: (listener: (event: { info?: Record<string, unknown> }) => void) => void
          }
        }
      }
      windows?: {
        getCurrentWindow: (callback: (result: { window?: { id: string } }) => void) => void
        changePosition?: (windowId: string, left: number, top: number, callback?: () => void) => void
        hide?: (windowId: string, callback?: () => void) => void
        restore?: (windowId: string, callback?: () => void) => void
        obtainDeclaredWindow?: (
          windowName: string,
          callback: (result: { success: boolean; window?: { id: string } }) => void,
        ) => void
      }
      settings?: {
        hotkeys?: {
          onPressed?: {
            addListener: (listener: (event: { name: string }) => void) => void
          }
        }
      }
    }
  }
}

export {}
