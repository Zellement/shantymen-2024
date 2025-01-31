<template>
    <div class="grid grid-cols-12 xl:fixed xl:inset-0">
        <div
            class="relative col-span-full xl:col-span-8 xl:col-start-5 xl:h-[80vh]"
        >
            <single-picture
                :img-data="{
                    url: currentStory.content.heroMedia.filename,
                    alt: currentStory.content.heroMedia.alt
                }"
                class="xl:h-[50vh aspect-square lg:aspect-landscape xl:aspect-auto xl:w-full xl:object-cover"
                sizes="500px lg:1000px xl:1600px"
            />
        </div>
    </div>
    <div
        class="container container-px relative z-10 -mb-6 w-full xl:translate-y-[40vh]"
    >
        <div
            class="mx-auto flex max-w-screen-sm-md -translate-y-10 flex-col items-start gap-2 bg-blue-800 p-4 text-white xl:mx-0 xl:bg-transparent xl:p-0 xl:text-white"
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
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})
</script>
