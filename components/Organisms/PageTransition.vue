<template>
    <div
        class="panel-base !fixed left-0 !z-[9999] grid place-items-center bg-blue-500 text-black"
        :class="uiStore.pageIsLoading ? 'top-0' : 'top-full delay-200'"
    >
        <div
            class="panel-base bg-blue-700"
            :class="uiStore.pageIsLoading ? 'top-0 delay-200' : 'top-full'"
        />
        <div
            class="z-50 transition-opacity"
            :class="
                uiStore.pageIsLoading
                    ? 'opacity-100 delay-200'
                    : 'opacity-0 delay-200'
            "
        >
            <div class="w-32">
                <nuxt-img
                    src="/images/sheringham-shantymen-logo.webp"
                    alt="Sheringham Shantymen logo"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
</script>

<style scoped lang="scss">
.panel-base {
    @apply absolute bottom-0 z-0 w-screen transition-[top] duration-500 ease-in-out;
}
</style>
