<template>
    <header
        role="banner"
        :class="[headerClasses, headerBgClasses]"
        class="fixed left-0 right-0 top-0 z-50 w-full py-4 transition-[background-color,transform] lg:py-6"
    >
        <div class="grid-layout container container-px">
            <div
                class="relative col-span-4 col-start-1 flex w-full items-center justify-between"
            >
                <site-brand class="relative z-40 mr-auto h-16" />
            </div>
            <div
                class="col-span-3 col-start-10 row-start-1 flex items-center justify-center"
            >
                <button
                    class="relative z-50 ml-auto flex h-8 w-full text-right"
                    aria-label="Open navigation"
                    @click="uiStore.toggleBoolean('showMobileNav')"
                >
                    <Transition name="slide-up">
                        <span
                            v-if="!uiStore.showMobileNav"
                            class="absolute right-0 top-0 flex items-center gap-2"
                        >
                            <span class="transition-colors hover:text-green"
                                >Menu</span
                            >

                            <Icon
                                class="ml-auto mt-0.5 size-6"
                                name="ic:baseline-menu"
                            />
                        </span>
                        <span
                            v-else-if="uiStore.showMobileNav"
                            class="absolute right-0 top-0 flex items-center gap-2"
                        >
                            <span class="transition-colors hover:text-green"
                                >Close</span
                            >

                            <Icon
                                class="ml-auto mt-0.5 size-6"
                                name="material-symbols-light:cancel-outline"
                            />
                        </span>
                    </Transition>
                </button>
            </div>
        </div>

        <Transition name="slide-up">
            <div
                v-if="uiStore.showMobileNav"
                class="fixed inset-0 z-10 h-screen w-full overflow-y-scroll bg-blue-800/90 py-4 transition-transform duration-300"
            >
                <div class="container container-px pt-24 xl:pb-20">
                    <site-nav
                        class="col-span-full"
                        ul-classes="flex gap-2 flex-col "
                    />
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
/* --------------------------
// Interfaces and types
-------------------------- */
interface State {
    showHeader: boolean
    lastScrollPosition: number
    scrollOffset: number
}

/* --------------------------
// States, stores and props
-------------------------- */
const uiStore = useUiStore()

const state: State = reactive({
    showHeader: true,
    lastScrollPosition: 0,
    scrollOffset: 40
})

/* --------------------------
// Computed
-------------------------- */

const headerClasses: ComputedRef<string> = computed(() => {
    return state.showHeader ? 'translate-y-0' : '-translate-y-full'
})
const headerBgClasses: ComputedRef<string> = computed(() => {
    return uiStore.showMobileNav ? 'bg-blue text-white' : ' text-white'
})

/* --------------------------
// Methods
-------------------------- */
const onScroll = (): void => {
    if (window.scrollY < 0) {
        return
    }
    if (
        Math.abs(window.scrollY - state.lastScrollPosition) < state.scrollOffset
    ) {
        return
    }
    state.showHeader = window.scrollY < state.lastScrollPosition
    state.lastScrollPosition = window.scrollY
}

/* --------------------------
// Hooks and composables
-------------------------- */
onMounted((): void => {
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', onScroll)
})
</script>
