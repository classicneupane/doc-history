import { firestore  } from '../firebase'
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('firestore', firestore)
})