import { useUiStore } from '@/stores/ui'
import { useStoryblokStore } from '@/stores/storyblok'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

//Stops the middleware from running more than once
let runOnce = false

export default defineNuxtRouteMiddleware((): void => {
    const uiStore = useUiStore()
    const timer1: number = 200
    const timer2: number = 300
    const timer3: number = 900
    const timer4: number = 800

    const storyblokStore = useStoryblokStore()
    const router = useRouter()

    const waitForDataLoaded = (): Promise<void> => {
        return new Promise((resolve) => {
            const checkDataLoaded = () => {
                if (storyblokStore.dataLoaded) {
                    resolve()
                } else {
                    setTimeout(checkDataLoaded, timer1)
                }
            }
            checkDataLoaded()
        })
    }

    if (!runOnce) {
        router.beforeEach(
            (
                to: RouteLocationNormalized,
                from: RouteLocationNormalized,
                next: NavigationGuardNext
            ): void => {
                uiStore.pageIsLoading = true
                uiStore.pageHasLoaded = false

                waitForDataLoaded().then(() => {
                    setTimeout(() => {
                        // Scroll to top of page
                        window.scrollTo(0, 0)
                        next()
                    }, timer2) // Delay to match total page transition time (0.7s)
                })
            }
        )

        runOnce = true
    }

    router.afterEach(async (): Promise<void> => {
        setTimeout(() => {
            uiStore.pageIsLoading = false
            setTimeout(() => {
                uiStore.pageHasLoaded = true
            }, timer3)
        }, timer4) // Delay to allow page to render before removing loading screen
    })
})
