import { defineStore } from 'pinia'
import { db } from '@main/db'
import { ProviderProps } from '@/types'

export interface ProviderStore {
  items: ProviderProps[]
}

export const useProviderStore = defineStore('provider', {
  state: (): ProviderStore => {
    return {
      items: [],
    }
  },
  actions: {
    async fetchProviders() {
      const items = await db.providers.toArray()
      this.items = items
    },
    async addProvider(provider: ProviderProps) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...rest } = provider
      const id = await db.providers.add(rest as unknown as ProviderProps)
      this.items.push({ ...provider, id })
      return id
    },
    async updateProvider(provider: ProviderProps) {
      await db.providers.put(provider)
      const index = this.items.findIndex(item => item.id === provider.id)
      if (index !== -1) {
        this.items[index] = provider
      }
    },
    async deleteProvider(id: number) {
      await db.providers.delete(id)
      this.items = this.items.filter(item => item.id !== id)
    },
  },
  getters: {
    getProviderById: state => (id: number) => {
      return state.items.find(item => item.id === id)
    },
  },
})
