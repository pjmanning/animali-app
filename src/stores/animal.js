import { defineStore } from 'pinia'

export const useAnimalStore = defineStore('AnimalStore', {
  state: () => ({
    animals: [],
  }),
  getters: {},
  actions: {},
})
