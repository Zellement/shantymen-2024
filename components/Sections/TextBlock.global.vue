<template>
    <section class="mx-auto max-w-screen-sm-md xl:m-0">
        <rich-text :content="content.text" />
    </section>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionTextBlockStoryblok
}

defineProps<Props>()
</script>
