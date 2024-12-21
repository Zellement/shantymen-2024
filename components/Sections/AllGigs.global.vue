<template>
    <section v-if="storyblokStore?.allGigs" class="flex flex-col gap-16">
        <div
            v-if="
                storyblokStore?.allGigs?.future &&
                storyblokStore?.allGigs?.future.length > 0
            "
        >
            <div class="sticky top-0 z-20 mb-6 bg-white">
                <h2 class="mb-4 text-xl">Upcoming Gigs</h2>
            </div>
            <div
                v-for="yearGroup in storyblokStore.allGigs.future"
                :key="yearGroup.year"
            >
                <div class="sticky top-10 z-10 bg-white/90">
                    <h3 class="pb-2 text-lg">
                        {{ yearGroup.year }}
                    </h3>
                </div>
                <ul class="mb-8 flex flex-col gap-4">
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
            <div class="sticky top-0 z-20 mb-6 bg-white">
                <h2 class="mb-4 text-xl">Past Gigs</h2>
            </div>
            <div
                v-for="yearGroup in storyblokStore.allGigs.past"
                :key="yearGroup.year"
            >
                <div class="sticky top-10 z-10 bg-white/90">
                    <h3 class="pb-2 text-lg">
                        {{ yearGroup.year }}
                    </h3>
                </div>
                <ul class="mb-8 flex flex-col gap-4">
                    <single-gig
                        v-for="gig in yearGroup.gigs"
                        :key="gig.id"
                        is-past
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
