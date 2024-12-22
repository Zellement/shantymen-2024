import { defineStore } from 'pinia'

type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T]

interface State {
    showMobileNav: boolean
    animationsDisabled: boolean
    pageIsLoading: boolean
    pageHasLoaded: boolean
    spotifySrc: string
}

export const useUiStore = defineStore('ui', {
    state: (): State => ({
        showMobileNav: false,
        animationsDisabled: false,
        pageIsLoading: true,
        pageHasLoaded: false,
        spotifySrc:
            'https://open.spotify.com/embed/artist/06bi895n8wIOUi35sk65gJ?utm_source=generator'
    }),
    actions: {
        toggleBoolean(
            propertyName: BooleanKeys<State>,
            visible?: boolean
        ): void {
            visible = visible ?? !this[propertyName]
            this[propertyName] = visible
        }
    }
})
