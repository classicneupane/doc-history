import { defineNuxtModule, createResolver, addComponent, addImports } from '@nuxt/kit'

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
      name: 'DocumentHistoryListItem', 
      filePath: resolver.resolve('runtime/components/DocumentHistoryListItem.vue')
    })
  }
})
