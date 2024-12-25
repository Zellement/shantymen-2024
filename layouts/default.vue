<template>
    <div class="layout min-h-screen">
        <site-seo />
        <site-header />
        <div class="page relative flex min-h-screen flex-col">
            <site-hero />
            <div class="relative grid grid-cols-12">
                <div
                    class="sticky top-0 order-last col-span-full flex flex-col text-white xl:order-first xl:col-span-4 xl:col-start-1 xl:pt-[35vh]"
                >
                    <div
                        class="sticky top-0 flex flex-col p-8 text-sm text-blue-400 md:grid md:grid-cols-2 xl:flex xl:flex-col xl:text-right"
                    >
                        <next-gig
                            class="mb-8 flex flex-col gap-1 text-md text-blue-300 md:col-span-full"
                            span-classes="text-white"
                            date-classes="text-[0.8em]"
                            link-classes="text-[0.7em] self-start xl:self-end hover:text-yellow"
                        />
                        <spotify-player />
                        <div class="flex flex-col items-end pt-8 xl:pt-40">
                            <p>
                                The Sheringham Shantymen &copy;
                                {{ thisYear }}
                            </p>
                            <p>
                                Website by
                                <nuxt-link
                                    target="_blank"
                                    to="https://www.zellement.com"
                                    class="transition-colors hover:text-yellow"
                                >
                                    Zellement
                                </nuxt-link>
                            </p>
                        </div>
                    </div>
                </div>

                <main
                    class="col-span-full bg-white p-8 md:-mt-12 md:pt-16 lg:p-14 xl:col-span-8 xl:col-start-5 xl:mt-0 xl:translate-y-[50vh] xl:pr-0"
                >
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const thisYear = new Date().getFullYear()
</script>
