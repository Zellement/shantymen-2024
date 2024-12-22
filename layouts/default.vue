<template>
    <div class="layout min-h-screen">
        <site-seo />
        <site-header />
        <div class="page flex min-h-screen flex-col">
            <site-hero />
            <div class="relative grid grid-cols-12">
                <div
                    class="sticky top-0 order-last col-span-full flex flex-col text-white xl:order-first xl:col-span-4 xl:col-start-1 xl:pt-[25vh]"
                >
                    <div
                        class="sticky top-0 p-8 text-right text-sm text-blue-400"
                    >
                        <next-gig
                            class="mb-8 flex flex-col gap-1 text-md text-blue-300 hover:text-yellow"
                            span-classes="text-white transition-colors group-hover:text-yellow-300"
                            date-classes="text-[0.8em]"
                            fake-link-classes="text-[0.7em] underline underline-offset-4"
                            fake-link-icon-classes="size-6"
                        />
                        <spotify-player />
                    </div>
                </div>

                <main
                    class="col-span-full bg-white p-8 lg:p-14 xl:col-span-8 xl:col-start-5 xl:translate-y-25vh xl:pr-0"
                >
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
