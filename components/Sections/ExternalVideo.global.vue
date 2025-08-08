<template>
    <section class="flex max-w-screen-lg flex-col pr-8">
        <iframe
            v-if="content.type === 'youtube'"
            class="aspect-video w-full"
            :src="`https://www.youtube.com/embed/${content.videoId}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>

        <iframe
            v-else-if="content.type === 'vimeo'"
            :src="`https://player.vimeo.com/video/${content.videoId}`"
            frameborder="0"
            class="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
    </section>
</template>

<script lang="ts" setup>
import type { SectionExternalVideoStoryblok } from '~/types/storyblok-component-types'

defineProps<{
    content: SectionExternalVideoStoryblok
}>()
</script>
