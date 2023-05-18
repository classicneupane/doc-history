import { defineNuxtModule, createResolver, addImports, addComponent } from '@nuxt/kit';

const defaultOptions = {
  collection: "document_history",
  app: "PLUGIN"
};
const module = defineNuxtModule({
  meta: {
    name: "document-history",
    configKey: "documentHistory"
  },
  setup(userOptions, nuxt) {
    const resolver = createResolver(import.meta.url);
    const options = { ...defaultOptions, ...userOptions };
    nuxt.options.appConfig.documentHistory = options;
    addImports({
      name: "useDocumentHistory",
      as: "useDocumentHistory",
      from: resolver.resolve("runtime/composables/useDocumentHistory")
    });
    addComponent({
      name: "DocumentHistoryListItem",
      filePath: resolver.resolve("runtime/components/DocumentHistoryListItem.vue")
    });
  }
});

export { module as default };
