<template>
    <button class="btn">
        <span>{{ text }}</span>
        <Icon name="material-symbols:magic-button" class="size-5" />
    </button>
</template>

<script lang="ts" setup>
interface Props {
    text: string
}

defineProps<Props>()
</script>
