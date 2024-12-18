<template>
    <li class="flex flex-row items-center justify-start gap-16">
        <span class="col-span-2 grid w-28 grid-cols-2">
            <span
                :class="[
                    'col-span-full text-center',
                    'font-serif text-[14px] uppercase tracking-widest'
                ]"
            >
                {{ getWeekDay(gig.date) }}
            </span>
            <span
                :class="[
                    'col-span-1 row-span-1 row-start-2',
                    'text-center',
                    'bg-slate-700 text-white'
                ]"
            >
                {{ getDay(gig.date) }}
            </span>
            <span
                :class="[
                    'col-span-1 row-span-1 row-start-2',
                    'w-full text-center',
                    'flex bg-yellow-500 text-base'
                ]"
            >
                <span class="m-auto">{{ getMonth(gig.date) }}</span>
            </span>
            <span
                :class="[
                    'col-span-full text-center',
                    'flex w-full items-center justify-center gap-1 text-sm uppercase'
                ]"
            >
                <Icon name="material-symbols:alarm" class="size-4 opacity-50" />
                {{ getTime(gig.date) }}
            </span>
        </span>
        <span class="flex flex-col">
            <h4>{{ gig.name }}</h4>
            <p v-if="gig.locationInfo">{{ gig.locationInfo }}</p>
            <p v-if="gig.description">{{ gig.description }}</p>
            <p class="flex gap-2">
                <span v-if="gig.sessions">{{ gig.sessions }} x sessions</span>
                <span v-if="gig.sessionLength"
                    >{{ gig.sessionLength }} mins</span
                >
            </p>
        </span>
        <nuxt-link
            v-if="gig.moreInfoLink"
            class="btn"
            :to="gig.moreInfoLink.cached_url ?? gig.moreInfoLink.url"
        >
            Learn more
        </nuxt-link>
    </li>
</template>

<script lang="ts" setup>
interface Props {
    gig: any
}

defineProps<Props>()

const getDay = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
        day: 'numeric'
    })
}

const getTime = (date: Date): string => {
    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getMonth = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
        month: 'short'
    })
}

const getWeekDay = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
        weekday: 'long'
    })
}
</script>
