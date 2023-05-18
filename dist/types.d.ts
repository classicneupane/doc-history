
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['documentHistory']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['documentHistory']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['documentHistory']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['documentHistory']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
