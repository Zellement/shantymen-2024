<template>
    <nuxt-link to="/gigs" class="group transition-colors">
        <h3 class="">
            Next Gig: <span :class="spanClasses">{{ nextGig?.name }}</span>
        </h3>
        <p v-if="nextGig?.content.date" class="text-[0.8em]">
            {{ fullDateConverter(new Date(nextGig.content.date)) }}
        </p>
        <p v-if="!isGigPage" class="text-[0.7em] underline underline-offset-4">
            See gig list
        </p>
    </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
    spanClasses?: string
}

const route = useRoute()

const isGigPage: ComputedRef<boolean> = computed(() => {
    return route.path === '/gigs'
})

defineProps<Props>()

const storyblokStore = useStoryblokStore()

const nextGig: ComputedRef<DataGigStoryblok | undefined> = computed(() => {
    return storyblokStore.nextGig || undefined
})

const { fullDateConverter } = useDateUtils()
</script>
