<template>
    <iframe
        :key="src"
        style="border-radius: 12px"
        :src="src"
        width="100%"
        height="550"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="w-full max-w-[435px] xl:ml-auto"
    ></iframe>
    <single-button
        v-if="canBeReset"
        class="btn text-xs mt-2 hover:text-yellow xl:ml-auto"
        text="Reset Spotify Player"
        @click.prevent="uiStore.spotifySrc = defaultSpotify"
    />
</template>

<script setup lang="ts">
const uiStore = useUiStore()

const defaultSpotify: ComputedRef<string> = computed(
    () =>
        'https://open.spotify.com/embed/artist/06bi895n8wIOUi35sk65gJ?utm_source=generator'
)

const src: ComputedRef<string> = computed(() => {
    return uiStore.spotifySrc
})

const canBeReset: ComputedRef<boolean> = computed(() => {
    return uiStore.spotifySrc !== defaultSpotify.value
})
</script>
