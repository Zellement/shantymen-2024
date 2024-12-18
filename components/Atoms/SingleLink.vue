<template>
    <nuxt-link class="btn" :to="getUrl(to)">
        <span>{{ text }}</span>
        <Icon name="ic:baseline-chevron-right" class="size-6" />
    </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
    to: string
    text: string
}

defineProps<Props>()
const { getUrl } = useUrlUtils()
</script>
