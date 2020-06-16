<template>
    <div
        class="container"
        :class="{
            'container--ready': componentsReady,
            'container--spinner-disabled': spinnerDisabled,
        }"
    >
        <spinner
            v-if="!spinnerDisabled"
            class="container__spinner"
        />
        <clock
            :sound="sound"
            class="container__clock container__component"
            @ready="onReady"
        />
        <jukebox
            ref="jukebox"
            class="container__jukebox container__component"
            @sound="onSound"
            @ready="onReady"
        />
        <tv
            class="container__tv container__component"
            @ready="onReady"
        />
    </div>
</template>
<script>
    import Spinner from '~/components/Spinner';

    export default {
        components: {
            Spinner,
            Clock: () => import('~/components/Clock'),
            Jukebox: () => import('~/components/Jukebox'),
            Tv: () => import('~/components/Tv'),
        },
        data () {
            return {
                sound: 0,
                readyStatus: 0,
                componentsReady: false,
                spinnerDisabled: false,
            };
        },
        mounted () {
            this.$store.commit('portfolio/setLink');
        },
        methods: {
            onSound (event) {
                this.sound = Math.abs(Math.ceil((event - 128) / 128));
            },
            onReady () {
                this.readyStatus++;

                if (this.readyStatus === 3) {
                    this.componentsReady = true;

                    setTimeout(() => {
                        this.spinnerDisabled = true;
                    }, 1500);
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        min-height: 100%;
        background: #000;
        text-align: center;
        padding: 50px 0;

        @include media(mobile) {
            padding: 0;
        }

        &:before,
        &:after {
            content: '';
            position: fixed;
            display: block;
            top: 0;
            width: 50%;
            height: 100%;
            background: #000;
            z-index: 9999;
            transition: transform 300ms ease-in;
            transition-delay: 1000ms;
        }

        &:before {
            left: 0;
        }

        &:after {
            right: 0;
        }
    }

    .container--ready {
        &:before {
            transform: translate3d(-100%, 0, 0);
        }

        &:after {
            transform: translate3d(100%, 0, 0);
        }

        .container__spinner {
            transform: translate3d(-50%, -500%, 0);
        }
    }

    .container--spinner-disabled {
        &:after,
        &:before {
            display: none;
        }
    }

    .container__component {
        margin: 0 auto 1em;

        @include media(mobile) {
            margin: 0 auto 0.25em;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
