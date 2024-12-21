import type { RuntimeConfig } from 'nuxt/schema'
import { storyblokInit, apiPlugin } from '@storyblok/js'

export default defineNuxtPlugin((nuxtApp) => {
    const { $preview } = useNuxtApp()
    const config: RuntimeConfig = useRuntimeConfig()

    const { storyblokApi } = storyblokInit({
        accessToken: $preview
            ? (config.public.STORYBLOK_ACCESS_TOKEN_PREVIEW as string)
            : (config.public.STORYBLOK_ACCESS_TOKEN_PROD as string),
        use: [apiPlugin]
    })

    nuxtApp.provide('storyblokClient', storyblokApi)
})
