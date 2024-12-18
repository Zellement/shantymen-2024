<template>
    <div class="page">
        <div class="grid grid-cols-12 xl:fixed xl:inset-0">
            <div class="col-span-full xl:col-span-8 xl:col-start-5 xl:h-full">
                <single-picture
                    :img-data="{
                        url: currentStory.content.heroMedia.filename,
                        alt: currentStory.content.heroMedia.alt
                    }"
                    class="aspect-square xl:aspect-square xl:h-full xl:w-full xl:object-cover"
                    sizes="500px lg:1200px xl:1600px"
                />
            </div>
        </div>

        <div class="container container-px relative text-white">
            <div class="-translate-y-10 bg-blue-800 p-4">
                <h1 class="text-3xl">The Sheringham Shantymen</h1>
                <h2 class="text-xl">
                    {{ currentStory.content.heroSecondary }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

console.log(currentStory.value)

definePageMeta({
    title: 'Consulting Civil, Structural and Highway Engineers'
})
</script>
