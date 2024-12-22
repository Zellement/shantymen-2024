import { defineStore } from 'pinia'
import type { RuntimeConfig } from 'nuxt/schema'

// TS Interfaces & Types

interface State {
    currentStory: AllTypes | null
    globalOptions: DataGlobalOptionsStoryblok | null
    locations: TemplateLocationStoryblok[] | null
    newsStories: TemplateNewsStoryblok[] | null
    recentNewsStories: TemplateNewsStoryblok[] | null
    totalNewsStories: number | null
    postsPerPage: number
    futureGigs: any
    pastGigs: any
    nextGig: DataGigStoryblok | null
    allDiscography: DataAlbumStoryblok[] | null
    // Booleans
    dataLoaded: boolean
    dataIsLoading: boolean
    firstLoad: boolean
}

// Define a minimal type for $storyblokClient
interface StoryblokClient {
    get: (path: string, params?: any) => Promise<any>
}

interface NuxtApp {
    $storyblokClient: StoryblokClient
}

// Consts

export const useStoryblokStore = defineStore('storyblok', {
    state: (): State => ({
        currentStory: null,
        globalOptions: null,
        locations: null,
        newsStories: null,
        recentNewsStories: null,
        totalNewsStories: null,
        postsPerPage: 6,
        futureGigs: null,
        pastGigs: null,
        nextGig: null,
        allDiscography: null,
        dataLoaded: false,
        dataIsLoading: false,
        firstLoad: true
    }),
    getters: {
        getTotalNewsPages(state): number {
            return Math.ceil(
                state.totalNewsStories
                    ? state.totalNewsStories / state.postsPerPage
                    : 0
            )
        },
        getCurrentStory(state): AllTypes | null {
            return state.currentStory
        },
        getCurrentStorySeoMetaTags(state): MetaTags | null {
            return {
                title:
                    state.currentStory?.content?.metaTitle ||
                    state.currentStory?.name,
                description: state.currentStory?.content?.metaDescription || '',
                og_title: state.currentStory?.content?.metaTitle || '',
                og_description:
                    state.currentStory?.content?.metaDescription || '',
                og_image: state.currentStory?.content?.image || ''
            }
        }
    },
    actions: {
        async fetchStoryblokData(
            fullPath: string,
            options?: any
        ): Promise<any> {
            const nuxtApp: NuxtApp = useNuxtApp() as unknown as NuxtApp
            const $storyblokClient: StoryblokClient = nuxtApp.$storyblokClient
            const { $preview } = useNuxtApp()
            const version = $preview ? 'draft' : 'published'
            try {
                const response = await $storyblokClient.get(fullPath, {
                    version: version,
                    ...options
                })
                if (!response.data) {
                    throw new Error('No data')
                }
                return response
            } catch (error: any) {
                console.log(error)
                throw new Error('Story not found')
            }
        },
        async fetchStory(queryParam: string): Promise<void> {
            this.dataIsLoading = true
            this.dataLoaded = false
            const config = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${queryParam}`,
                    {
                        resolve_links: 'story',
                        cv: config.public.STORYBLOK_CV_DISABLED
                            ? +new Date()
                            : null
                    }
                )

                this.currentStory = response.data?.story
                this.dataLoaded = true
                this.dataIsLoading = false
                this.firstLoad = false
            } catch (error) {
                console.log(error)
                throw new Error('Story not found')
            }
        },

        async fetchGlobalOptions(): Promise<void> {
            const config: RuntimeConfig = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${config.public.STORYBLOK_GLOBAL_OPTIONS_ID}`,
                    {
                        resolve_relations: ['dataGlobalOptions.navigation']
                    }
                )
                this.globalOptions = response.data?.story
            } catch (error) {
                throw error
            }
        },

        async fetchFutureGigs(): Promise<void> {
            try {
                const today = new Date()
                const formattedToday = today
                    .toISOString()
                    .slice(0, 16)
                    .replace('T', ' ')

                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataGig',
                    per_page: 100,
                    sort_by: 'content.date:asc',
                    filter_query: {
                        date: {
                            gt_date: formattedToday
                        }
                    }
                })
                // Sort array by date
                const futureGigsArray = response.data?.stories.sort
                    ? response.data?.stories.sort(
                          (a: DataGigStoryblok, b: DataGigStoryblok) =>
                              new Date(a.content.date).getTime() -
                              new Date(b.content.date).getTime()
                      )
                    : []
                this.nextGig = futureGigsArray[0]
                const gigs = response.data?.stories || []
                const gigsByYear: { [key: number]: any[] } = {}

                gigs.forEach((gig: DataGigStoryblok) => {
                    const gigDate = new Date(gig.content.date)
                    const year = gigDate.getFullYear()

                    if (!gigsByYear[year]) {
                        gigsByYear[year] = []
                    }

                    gigsByYear[year].push({
                        name: gig.name,
                        date: gigDate,
                        locationInfo: gig.content.locationInfo,
                        description: gig.content.description,
                        sessions: gig.content.sessions,
                        sessionLength: gig.content.sessionLength,
                        moreInfoLink: gig.content.moreInfoLink,
                        hideTime: gig.content.hideTime,
                        id: gig.id
                    })
                })

                // Sort the gigs within each year group
                Object.keys(gigsByYear).forEach((year) => {
                    gigsByYear[parseInt(year)].sort(
                        (a, b) => a.date.getTime() - b.date.getTime()
                    )
                })

                // Convert the gigsByYear object to sorted arrays
                const futureGigs = Object.keys(gigsByYear)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map((year) => ({
                        year: parseInt(year),
                        gigs: gigsByYear[parseInt(year)]
                    }))

                this.futureGigs = futureGigs
            } catch (error) {
                throw error
            }
        },

        async fetchPastGigs(): Promise<void> {
            try {
                const today = new Date()
                const formattedToday = today
                    .toISOString()
                    .slice(0, 16)
                    .replace('T', ' ')

                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataGig',
                    per_page: 100,
                    sort_by: 'content.date:asc',
                    filter_query: {
                        date: {
                            lt_date: formattedToday
                        }
                    }
                })

                const gigs = response.data?.stories || []
                const gigsByYear: { [key: number]: any[] } = {}

                gigs.forEach((gig: DataGigStoryblok) => {
                    const gigDate = new Date(gig.content.date)
                    const year = gigDate.getFullYear()

                    if (!gigsByYear[year]) {
                        gigsByYear[year] = []
                    }

                    gigsByYear[year].push({
                        name: gig.name,
                        date: gigDate,
                        locationInfo: gig.content.locationInfo,
                        description: gig.content.description,
                        sessions: gig.content.sessions,
                        sessionLength: gig.content.sessionLength,
                        moreInfoLink: gig.content.moreInfoLink,
                        hideTime: gig.content.hideTime,
                        id: gig.id
                    })
                })

                // Sort the gigs within each year group
                Object.keys(gigsByYear).forEach((year) => {
                    gigsByYear[parseInt(year)].sort(
                        (a, b) => b.date.getTime() - a.date.getTime()
                    )
                })

                // Convert the gigsByYear object to sorted arrays
                const pastGigs = Object.keys(gigsByYear)
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map((year) => ({
                        year: parseInt(year),
                        gigs: gigsByYear[parseInt(year)]
                    }))

                this.pastGigs = pastGigs
            } catch (error) {
                throw error
            }
        },

        async fetchAllDiscography(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataAlbum',
                    per_page: 100,
                    sort_by: 'content.year:desc'
                })
                this.allDiscography = response.data?.stories
            } catch (error) {
                throw error
            }
        },

        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
            await this.fetchFutureGigs()
        }
    }
})
