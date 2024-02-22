import { writable } from 'svelte/store'
import { persistable } from './persistable'

export const roomID = writable('')
export const alias = persistable('settings:alias', '')
