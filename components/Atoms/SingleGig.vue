<template>
    <li
        class="flex flex-col justify-start border lg:flex-row lg:gap-16"
        :class="
            isPast
                ? 'bg-stone-100 px-4 py-2 text-sm lg:items-center'
                : 'p-4 lg:items-start'
        "
    >
        <span
            class="grid w-full flex-shrink-0 grid-cols-4 gap-2 lg:w-28 lg:grid-cols-2 lg:gap-0"
        >
            <span
                :class="[
                    'bg-stone-100 font-serif text-[11px] uppercase tracking-widest 2xl:text-[14px]',
                    'text-center lg:col-span-full'
                ]"
            >
                {{ getWeekDay(gig.date) }}
            </span>
            <span
                :class="[
                    'col-span-1 lg:row-span-1 lg:row-start-2',
                    'text-center',
                    'bg-slate-700 text-white'
                ]"
            >
                {{ getDay(gig.date) }}
            </span>
            <span
                :class="[
                    'col-span-1 lg:row-span-1 lg:row-start-2',
                    'w-full text-center',
                    'flex bg-yellow-500 text-base'
                ]"
            >
                <span class="m-auto">{{ getMonth(gig.date) }}</span>
            </span>
            <span
                v-if="!gig.hideTime"
                :class="[
                    'bg-stone-100 text-center lg:col-span-full',
                    'flex w-full items-center justify-center gap-1 text-sm uppercase'
                ]"
            >
                <Icon
                    name="ic:round-access-time-filled"
                    class="size-4 opacity-50"
                />
                {{ getTime(gig.date) }}
            </span>
        </span>
        <span class="mt-2 flex flex-col gap-2 text-stone-600">
            <h4
                :class="isPast ? 'text-md' : 'text-lg'"
                class="mb-2 leading-none text-blue"
            >
                {{ gig.name }}
            </h4>
            <template v-if="!isPast">
                <p v-if="gig.locationInfo">{{ gig.locationInfo }}</p>
                <p v-if="gig.description">{{ gig.description }}</p>
                <p class="mt-4 flex gap-1">
                    <span v-if="gig.sessions">{{ gig.sessions }} x</span>
                    <span v-if="gig.sessionLength"
                        >{{ gig.sessionLength }} min sessions</span
                    >
                </p>
            </template>
        </span>
        <single-link
            v-if="
                (gig.moreInfoLink?.cached_url ?? gig.moreInfoLink?.url) &&
                !isPast
            "
            class="btn flex-shrink-0 self-end lg:ml-auto"
            text="Learn more"
            target="_blank"
            :to="gig.moreInfoLink?.cached_url ?? gig.moreInfoLink?.url"
        />
    </li>
</template>

<script lang="ts" setup>
interface Props {
    gig: any
    isPast?: boolean
}

defineProps<Props>()

const viewport = useViewport()

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
        weekday: viewport.isLessThan('md') ? 'short' : 'long'
    })
}
</script>
