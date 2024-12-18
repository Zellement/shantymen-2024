<template>
    <section v-if="storyblokStore?.allGigs" class="flex flex-col gap-32">
        <div
            v-if="
                storyblokStore?.allGigs?.future &&
                storyblokStore?.allGigs?.future.length > 0
            "
        >
            <h2 class="text-2xl">Future Gigs</h2>
            <div
                v-for="yearGroup in storyblokStore.allGigs.future"
                :key="yearGroup.year"
            >
                <h3 class="text-xl">{{ yearGroup.year }}</h3>
                <ul class="flex flex-col gap-12">
                    <single-gig
                        v-for="gig in yearGroup.gigs"
                        :key="gig.id"
                        :gig="gig"
                    />
                </ul>
            </div>
        </div>
        <div
            v-if="
                storyblokStore?.allGigs?.past &&
                storyblokStore?.allGigs?.past.length > 0
            "
        >
            <h2 class="text-xl">Past Gigs</h2>
            <div
                v-for="yearGroup in storyblokStore.allGigs.past"
                :key="yearGroup.year"
            >
                <h3 class="text-lg">{{ yearGroup.year }}</h3>
                <ul class="flex flex-col gap-12">
                    <single-gig
                        v-for="gig in yearGroup.gigs"
                        :key="gig.id"
                        :gig="gig"
                    />
                </ul>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

onMounted(async () => {
    await storyblokStore.fetchGigs()
})
</script>
