import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

const selfDestructDelay = 4000 // milliseconds

const generateKey = () => {
  // timestamp with 8 random characters
  const now = new Date()
  const randomCode = nanoid(8)
  return now.toISOString() + randomCode
}

const createNotificationStore = () => {
  const { subscribe, update } = writable({})

  return {
    subscribe,
    remove: (id) => {
      update((previous) => {
        const { [id]: value, ...withoutThisOne } = previous
        return withoutThisOne
      })
    },
    add: function (message) {
      const id = generateKey()
      update((previous) => ({ ...previous, [id]: message }))
      setTimeout(() => {
        this.remove(id)
      }, selfDestructDelay)
    },
  }
}

export const notifications = createNotificationStore()
