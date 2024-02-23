export const LOGGING = import.meta.env.VITE_LOGGING === 'true'
export const VERSION = __VERSION__
export const DEV = import.meta.env.DEV

console.info('client version', VERSION)
console.info('dev mode', DEV)
