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
                class="flex max-w-screen-md -translate-y-10 flex-col items-start gap-2 bg-blue-800 p-4 text-white xl:bg-transparent xl:text-white"
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
                class="col-span-full bg-white p-8 xl:col-span-8 xl:col-start-5 xl:translate-y-25vh"
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
</script>
