<template>
    <div class="">
        <h3 class="">
            Next Gig: <span :class="h3spanClasses">{{ nextGig?.name }}</span>
        </h3>
        <p v-if="nextGig?.content.date" :class="dateClasses">
            {{ fullDateConverter(new Date(nextGig.content.date)) }}
        </p>
        <single-link
            v-if="!isGigPage"
            to="gigs"
            class="btn"
            :class="linkClasses"
            text="See gig list"
        />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    h3spanClasses?: string
    dateClasses?: string
    linkClasses?: string
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
