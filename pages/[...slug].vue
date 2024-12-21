<template>
    <div class="page flex min-h-screen flex-col">
        <div class="grid grid-cols-12 xl:fixed xl:inset-0">
            <div
                class="relative col-span-full xl:col-span-8 xl:col-start-5 xl:h-[60vh]"
            >
                <single-picture
                    :img-data="{
                        url: currentStory.content.heroMedia.filename,
                        alt: currentStory.content.heroMedia.alt
                    }"
                    class="xl:h-[50vh aspect-square lg:aspect-landscape xl:aspect-auto xl:w-full xl:object-cover"
                    sizes="500px lg:1200px xl:1600px"
                />
            </div>
        </div>
        <div
            class="container container-px relative -mb-6 w-full xl:translate-y-25vh"
        >
            <div
                class="flex max-w-screen-sm-md -translate-y-10 flex-col items-start gap-2 bg-blue-800 p-4 text-white xl:bg-transparent xl:p-0 xl:text-white"
            >
                <h1 class="text-3xl xl:bg-blue-800 xl:px-3 xl:py-2">
                    {{ currentStory.content.heroPrimary }}
                </h1>
                <h2
                    v-if="currentStory.content.heroSecondary"
                    class="max-w-screen-xs text-lg text-yellow-400 xl:bg-blue-800 xl:px-3 xl:py-2"
                >
                    {{ currentStory.content.heroSecondary }}
                </h2>
            </div>
        </div>
        <div class="relative grid grid-cols-12">
            <div
                class="sticky top-0 order-last col-span-full flex flex-col text-white xl:order-first xl:col-span-4 xl:col-start-1 xl:pt-[25vh]"
            >
                <div class="sticky top-0 p-8 text-right text-sm text-blue-400">
                    <!-- <ul class="mb-8">
                        <li>
                            <span class="font-serif text-base"
                                >Last updated:</span
                            ><br />
                            {{ lastUpdated }}
                        </li>
                    </ul> -->

                    <iframe
                        style="border-radius: 12px"
                        src="https://open.spotify.com/embed/artist/06bi895n8wIOUi35sk65gJ?utm_source=generator"
                        width="100%"
                        height="550"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        class="ml-auto w-full max-w-[435px]"
                    ></iframe>
                </div>
            </div>
            <div
                class="col-span-full bg-white p-8 lg:p-14 xl:col-span-8 xl:col-start-5 xl:translate-y-25vh xl:pr-0"
            >
                <block-loop
                    :key="`${id}__${currentStory?.id}`"
                    :blocks="currentStory?.content.body"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const id = useId()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

// const lastUpdated: ComputedRef<string> = computed(() => {
//     return new Date(currentStory.value.updated_at).toLocaleDateString('en-GB', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     })
// })
</script>
