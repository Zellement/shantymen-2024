<template>
    <div class="page flex min-h-screen flex-col">
        <div class="grid grid-cols-12 xl:fixed xl:inset-0">
            <div
                class="relative col-span-full xl:col-span-8 xl:col-start-5 xl:h-full"
            >
                <single-picture
                    :img-data="{
                        url: currentStory.content.heroMedia.filename,
                        alt: currentStory.content.heroMedia.alt
                    }"
                    class="aspect-square lg:aspect-landscape xl:aspect-auto xl:h-full xl:w-full xl:object-cover"
                    sizes="500px lg:1200px xl:1600px"
                />
            </div>
        </div>

        <div class="container container-px relative w-full xl:mt-auto">
            <div
                class="flex -translate-y-10 flex-col items-start gap-2 bg-blue-800 p-4 text-white xl:bg-transparent xl:text-white"
            >
                <h1 class="text-3xl xl:bg-blue-800 xl:px-3 xl:py-2">
                    The Sheringham Shantymen
                </h1>
                <h2
                    v-if="currentStory.content.heroSecondary"
                    class="text-xl text-yellow-400 xl:bg-blue-800 xl:px-3 xl:py-2"
                >
                    {{ currentStory.content.heroSecondary }}
                </h2>
                <next-gig
                    class="my-4 mt-4 flex flex-col gap-4 border-t border-blue-500 pt-4 text-md leading-none text-blue-300 xl:bg-blue-800 xl:px-3 xl:py-2"
                    span-classes="text-white"
                    date-classes="text-[0.8em]"
                    link-classes="text-[0.7em] self-start  hover:text-yellow"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

definePageMeta({
    title: 'Supporters of the RNLI and other charities.',
    layout: 'home'
})
</script>
