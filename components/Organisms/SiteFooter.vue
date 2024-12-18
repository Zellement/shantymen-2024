<template>
    <div
        class="site-footer mt-32 flex border-t-[20px] border-blue-500 bg-stone-700 text-white"
    >
        <footer
            role="contentinfo"
            class="relative z-10 w-full transition-transform duration-500"
        >
            &copy; {{ date }}
        </footer>
    </div>
</template>

<script lang="ts" setup>
// const storyblokStore = useStoryblokStore()

const date: ComputedRef<number> = computed(() => {
    return new Date().getFullYear()
})
</script>
