<template>
    <section
        v-if="storyblokStore?.futureGigs"
        class="flex flex-col gap-16 xl:pr-16"
    >
        <div
            v-if="
                storyblokStore?.futureGigs &&
                storyblokStore?.futureGigs.length > 0
            "
        >
            <div class="sticky top-0 z-20 mb-6 bg-white xl:static">
                <h2 class="mb-4 text-xl">Upcoming Gigs</h2>
            </div>
            <div
                v-for="yearGroup in storyblokStore.futureGigs"
                :key="yearGroup.year"
            >
                <div class="sticky top-10 z-10 bg-white/90 xl:static">
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
                storyblokStore?.pastGigs && storyblokStore?.pastGigs.length > 0
            "
            class="relative"
        >
            <div
                class="absolute bottom-0 left-0 right-0 z-20 h-[700px] w-full bg-gradient-to-t from-white to-transparent"
            />
            <div class="sticky top-0 z-20 mb-6 bg-white xl:static">
                <h2 class="mb-4 text-xl">Past Gigs</h2>
            </div>
            <div
                v-for="yearGroup in storyblokStore.pastGigs"
                :key="yearGroup.year"
            >
                <div class="sticky top-10 z-10 bg-white/90 xl:static">
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
    await storyblokStore.fetchPastGigs()
})
</script>
