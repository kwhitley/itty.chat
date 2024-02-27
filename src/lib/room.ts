import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { get, writable } from 'svelte/store'
import { WS_PATH } from '../constants'
import { alias, roomID, selfID, unreadMessages } from './stores'

export const isConnected = writable(false)
export const isConnecting = writable(false)
export const messages = writable([])

class Room {
  ws: WebSocket
  roomID: string | undefined
  selfID: string | undefined

  get isConnected() {
    return Boolean(this.ws) && this.ws?.readyState === this.ws?.OPEN
  }

  async connect(id?: string) {
    window.room = this
    // short circuit if already connected
    if (id && id === this.roomID) return false

    isConnecting.set(true)
    const pageRoomID = get(page).params?.roomID
    messages.set([])
    this.roomID = id
    let useAlias = get(alias)
    let url = [`${WS_PATH}/rooms/connect`, id].filter(v => v).join('/') + `?echo=true`

    if (useAlias) url += '&alias=' + useAlias
    console.log(`connecting to ${url}`)
    const ws = this.ws = new WebSocket(url)

    ws.addEventListener('message', (e) => {
      if (!document.hasFocus()) {
        unreadMessages.update(v => v + 1)
      } else {
        unreadMessages.set(0)
      }

      console.log('received message', e.data)
      const data = JSON.parse(e.data)

      let rID = data?.roomID

      if (rID) {
        console.log('connected to room', rID)

        if (!pageRoomID) {
          goto(`/room/${rID}`, { replaceState: false })
        } else if (pageRoomID !== rID) {
          goto(`/room/${rID}`, { replaceState: true })
        }
        messages.update(m => [`connected to room ${rID}`])
        this.roomID = rID
        this.selfID = data?.id
        selfID.set(data?.id)
        roomID.set(rID)
      } else {
        if (typeof data === 'object') {
          data.details = {
            date: Date.now(),
            fromSelf: data?.from?.id === this.selfID,
          }
        }
        console.log('processing message', data)
        messages.update(m => [...m, data])
      }
    })

    ws.addEventListener('open', () => {
      isConnected.set(true)
      isConnecting.set(false)
    })
    ws.addEventListener('close', () => this.disconnect(true))
  }

  disconnect(force = false) {
    console.log('running room.disconnect() force=', force)
    if (this.isConnected) {
      try {
        this.ws.close()
      } catch (err) {
        console.log('already disconnected.')
      }
    }

    console.log('closing room', this.roomID)
    messages.update(m => [...m, `disconnected from room ${this.roomID}`])

    isConnected.set(false)
    isConnecting.set(false)
    this.roomID = undefined
    this.selfID = undefined
    roomID.set(undefined)
    selfID.set(undefined)
    !force && goto('/')
    // goto('/')
  }

  send(message: any) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }

    if (!this.isConnected) {
      console.warn('cannot send a message... not connected')
      return false
    }

    console.log('sending ws message', message)
    this.ws.send(message)
  }
}

export const room = new Room()
