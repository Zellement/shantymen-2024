<template>
    <nuxt-link to="/gigs" class="group transition-colors">
        <h3 class="">
            Next Gig: <span :class="h3spanClasses">{{ nextGig?.name }}</span>
        </h3>
        <p v-if="nextGig?.content.date" :class="dateClasses">
            {{ fullDateConverter(new Date(nextGig.content.date)) }}
        </p>
        <p v-if="!isGigPage" :class="fakeLinkClasses">
            See gig list
            <Icon
                name="ic:baseline-chevron-right"
                :class="fakeLinkIconClasses"
            />
        </p>
    </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
    h3spanClasses?: string
    dateClasses?: string
    fakeLinkClasses?: string
    fakeLinkIconClasses?: string
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
