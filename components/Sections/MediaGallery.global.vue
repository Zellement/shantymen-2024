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
            :show-thumbs="showThumbs"
            :show-captions="content.showCaptions"
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
                    <div
                        v-if="content.showCaptions && slide.title"
                        class="absolute left-0 top-0 z-10 bg-white px-2 py-1 text-sm"
                    >
                        {{ slide.title }}
                    </div>
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
const props = defineProps<{
    content: SectionMediaGalleryStoryblok
}>()

const id = useId()
/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const showThumbs: ComputedRef<boolean> = computed(() => {
    return props.content.media.length > 2 && props.content.showThumbnails
})
</script>
