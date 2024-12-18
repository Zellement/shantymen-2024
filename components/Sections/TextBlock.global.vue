<template>
    <section class="max-w-screen-sm-md">
        <rich-text :content="content.text" />
    </section>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionTextBlockStoryblok
}

defineProps<Props>()
</script>
