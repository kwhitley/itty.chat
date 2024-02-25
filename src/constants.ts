export const LOGGING = import.meta.env.VITE_LOGGING === 'true'
export const VERSION = __VERSION__
export const DEV = import.meta.env.DEV

console.info('client version', VERSION, DEV ? '(dev)' : '')

export const WS_PATH = DEV
                      ? 'ws://localhost:8787'
                      : 'wss://v0.ittysockets.io'
