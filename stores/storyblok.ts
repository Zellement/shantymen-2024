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
    allGigs: any
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
        dataLoaded: false,
        dataIsLoading: false,
        firstLoad: true,
        postsPerPage: 6,
        allGigs: null
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

        async fetchGigs(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataGig',
                    per_page: 100,
                    sort_by: 'content.date:desc'
                })
                const gigs = response.data?.stories || []
                const today = new Date()
                const allGigs: {
                    future: { year: number; gigs: any[] }[]
                    past: { year: number; gigs: any[] }[]
                } = {
                    future: [],
                    past: []
                }

                const gigsByYear: {
                    future: { [key: number]: any[] }
                    past: { [key: number]: any[] }
                } = {
                    future: {},
                    past: {}
                }

                gigs.forEach((gig: DataGigStoryblok) => {
                    const gigDate = new Date(gig.content.date)
                    const year = gigDate.getFullYear()
                    const category = gigDate >= today ? 'future' : 'past'

                    if (!gigsByYear[category][year]) {
                        gigsByYear[category][year] = []
                    }

                    gigsByYear[category][year].push({
                        name: gig.name,
                        date: new Date(gig.content.date),
                        locationInfo: gig.content.locationInfo,
                        description: gig.content.description,
                        sessions: gig.content.sessions,
                        sessionLength: gig.content.sessionLength,
                        moreInfoLink: gig.content.moreInfoLink,
                        id: gig.id
                    })
                })

                // Convert the gigsByYear object to sorted arrays
                allGigs.future = Object.keys(gigsByYear.future)
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map((year) => ({
                        year: parseInt(year),
                        gigs: gigsByYear.future[parseInt(year)]
                    }))

                allGigs.past = Object.keys(gigsByYear.past)
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map((year) => ({
                        year: parseInt(year),
                        gigs: gigsByYear.past[parseInt(year)]
                    }))

                this.allGigs = allGigs
            } catch (error) {
                throw error
            }
        },
        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
        }
    }
})
