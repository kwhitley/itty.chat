import { error } from '@sveltejs/kit'
import { roomID } from '../../../store'

export function load({ params }) {
  roomID.set(params.roomID)
  console.log('setting roomID to', params.roomID)

  return {
		roomID: params.roomID
	}
}
