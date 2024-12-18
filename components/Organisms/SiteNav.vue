<template>
    <nav v-if="navItems" class="site-nav">
        <ul class="my-auto lg:mr-4" :class="ulClasses">
            <li>
                <nuxt-link
                    to="/"
                    class="site-nav__item"
                    @click="uiStore.showMobileNav = false"
                >
                    Home
                </nuxt-link>
            </li>
            <li v-for="navItem in navItems" :key="navItem.uuid">
                <nuxt-link
                    :to="getUrl(navItem.full_slug)"
                    class="site-nav__item"
                    @click="uiStore.showMobileNav = false"
                >
                    {{ navItem.name }}
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const { getUrl } = useUrlUtils()

const storyblokStore = useStoryblokStore()
const uiStore = useUiStore()

defineProps<{
    ulClasses?: string
}>()

const navItems: ComputedRef<TemplatePageStoryblok[] | null | undefined> =
    computed(() => {
        return storyblokStore?.globalOptions?.content.navigation
    })
</script>
