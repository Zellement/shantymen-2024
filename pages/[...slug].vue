<template>
    <div class="">
        <block-loop
            :key="`${id}__${currentStory?.id}`"
            :blocks="currentStory?.content.body"
        />

        <div v-if="isGuestbookPage" class="xl:pr-16">
            <DisqusComments identifier="5b78e557-bc58-575b-92be-8d935f27253e" />
        </div>
        <div
            v-if="isBookUsPage"
            class="mx-auto mt-8 max-w-screen-sm-md xl:ml-0 xl:pr-16"
        >
            <book-us-form />
        </div>
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const id = useId()
const route = useRoute()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const isGuestbookPage: ComputedRef<boolean> = computed(() => {
    return route.path === '/guestbook'
})
const isBookUsPage: ComputedRef<boolean> = computed(() => {
    return route.path === '/book-us'
})
</script>
