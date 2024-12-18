<template>
    <section class="">
        <embla-carousel
            :key="id"
            ref="carouselRef"
            :options="{
                loop: true,
                align: 'start'
            }"
            show-dots
            :show-buttons="content.media.length > 2"
            :media="content.media"
        >
            <template #carousel-items>
                <div
                    v-for="slide in content.media"
                    :key="slide.id"
                    :class="[
                        'embla__slide embla__slide--90 relative',
                        'flex h-full w-full xl:max-h-[70vh]',
                        '2xl:embla__slide--80'
                    ]"
                >
                    <single-picture
                        class="aspect-square md:aspect-landscape"
                        :img-data="{
                            url: slide.filename ?? '',
                            alt: slide.alt ?? ''
                        }"
                        sizes="336px lg:800px"
                    />
                </div>
            </template>
        </embla-carousel>
    </section>
</template>

<script lang="ts" setup>
import type { EmblaCarouselType } from 'embla-carousel'
defineProps<{
    content: SectionMediaGalleryStoryblok
}>()

const id = useId()
/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)
</script>
