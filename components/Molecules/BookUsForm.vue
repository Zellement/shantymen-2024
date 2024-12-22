<template>
    <form class="form" action="https://formspree.io/f/xwppkeyz" method="POST">
        <label>
            <span>Your name *</span>
            <input required type="text" name="name" />
        </label>
        <label>
            <span>Your email *</span>
            <input required type="email" name="email" />
        </label>
        <label>
            <span>Your telephone *</span>
            <input required type="tel" name="telephone" />
        </label>

        <label>
            <span>Venue *</span>
            <input required type="text" name="venue" />
        </label>
        <label>
            <span>Date & time requested *</span>
            <input required type="datetime-local" name="date_time" />
        </label>
        <label>
            <span>Details *</span>
            <textarea required class="h-40" name="details"></textarea>
        </label>
        <button class="btn cursor-pointer self-start" type="submit">
            Submit booking request
        </button>
    </form>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.form {
    @apply flex flex-col;

    label {
        @apply flex flex-col;
        margin-bottom: 1rem;

        span {
            @apply mb-1 font-serif;
        }

        input,
        textarea {
            @apply border-stone-300 bg-stone-100 p-2 text-black;
        }
    }
}
</style>
