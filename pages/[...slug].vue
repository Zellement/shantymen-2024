<template>
    <div>
        <block-loop
            :key="`${id}__${currentStory?.uid}`"
            :blocks="currentStory?.content.body"
        />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const id = useId()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})
</script>
