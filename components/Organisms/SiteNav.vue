<template>
    <nav v-if="navItems" class="">
        <ul class="" :class="ulClasses">
            <li>
                <nuxt-link to="/" @click="uiStore.showMobileNav = false">
                    Home
                </nuxt-link>
            </li>
            <li v-for="navItem in navItems" :key="navItem.uuid">
                <nuxt-link
                    :to="getUrl(navItem.full_slug)"
                    @click="uiStore.showMobileNav = false"
                >
                    {{ navItem.name }}
                </nuxt-link>
            </li>
            <li class="mt-8 lg:mt-0">
                <nuxt-link
                    to="https://www.facebook.com/thesheringhamshantymenofficial/"
                    target="_blank"
                    @click="uiStore.showMobileNav = false"
                >
                    <Icon name="fe:facebook" class="mt-auto size-5" />
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
