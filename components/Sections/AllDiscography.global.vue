<template>
    <section
        v-if="storyblokStore?.allDiscography"
        class="flex w-full flex-col gap-16 xl:pr-16"
    >
        <div
            v-for="album in storyblokStore.allDiscography"
            :key="album.content._uid"
        >
            <div class="mb-8 flex flex-col">
                <h2 class="text-xl">{{ album.name }}</h2>
                <p class="text-base">({{ album.content.year }})</p>
            </div>
            <div class="flex w-full flex-col gap-8 lg:flex-row">
                <div class="flex flex-col gap-4">
                    <nuxt-img
                        :src="album.content.cover.filename ?? ''"
                        provider="storyblok"
                        :alt="album.name"
                        class="mx-auto aspect-square w-40"
                    />
                    <single-button
                        v-if="album.content.spotifySrc"
                        class="btn btn--yellow-800 self-start"
                        text="Listen on Spotify"
                        @click.prevent="
                            uiStore.spotifySrc = album.content.spotifySrc
                        "
                    />
                </div>
                <div class="max-w-[800px] flex-grow columns-2">
                    <rich-text :content="album.content.text" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()
const uiStore = useUiStore()

onMounted(async () => {
    await storyblokStore.fetchAllDiscography()
})
</script>
