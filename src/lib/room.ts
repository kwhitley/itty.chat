import { roomID } from '$lib/stores'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { get, writable } from 'svelte/store'

export const isConnected = writable(false)
export const messages = writable([])

class Room {
  ws: WebSocket
  roomID: string | undefined

  get isConnected() {
    return Boolean(this.ws) && this.ws?.readyState === this.ws?.OPEN
  }

  connect(id) {
    if (id && id === this.roomID) {
      console.log('already connected to', roomID)
      return false
    }

    const pageRoomID = get(page).params?.roomID
    console.log('pageRoomID is', pageRoomID)

    console.log('connecting to room', id)
    this.disconnect()
    this.roomID = id
    const url = [`ws://localhost:8787/v0/rooms/connect`, id].filter(v => v).join('/') + '?echo=true'
    console.log(`connecting to ${url}`)
    const ws = this.ws = new WebSocket(url)
    console.log('this.ws is', this.ws)

    ws.addEventListener('message', (e) => {
      console.log('received message', e.data)
      const data = JSON.parse(e.data)
      messages.update(m => [...m, data])

      let rID = data?.details?.roomID

      if (rID) {
        console.log('connected to room', rID)

        if (!pageRoomID) {
          goto(`/room/${rID}`, { replaceState: false })
        }
        this.roomID = rID
        roomID.set(rID)
      } else {
        console.log('processing message', data)
        // messages.update(m => [...m, data])
      }
    })

    ws.addEventListener('open', () => isConnected.set(true))
  }

  disconnect() {
    if (this.isConnected) {
      console.log('closing room', this.roomID)
      this.ws.close()
      isConnected.set(false)
      this.roomID = undefined
      roomID.set(undefined)
      messages.set([])
      goto('/')
    } else {
      console.log('room already closed')
    }
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
