import { defineNuxtModule, addPlugin, createResolver, addComponent, addImports } from '@nuxt/kit'

export interface ModuleOptions {
  collection: string,
  app: string
}

const defaultOptions = {
  collection: "document_history",
  app: "PLUGIN"
} as ModuleOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'document-history',
    configKey: 'documentHistory'
  },

  // defaults: {
  //   collection: "document_history",
  //   app: "PLUGIN"
  // },

  setup (userOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    const options = {...defaultOptions, ...userOptions}

    nuxt.options.appConfig.documentHistory = options

    addImports({
      name: 'useDocumentHistory', 
      as: 'useDocumentHistory', 
      from: resolver.resolve('runtime/composables/useDocumentHistory') 
    })

    addComponent({
      name: 'DocumentHistory', 
      filePath: resolver.resolve('runtime/components/DocumentHistory.vue')
    })
  }
})
