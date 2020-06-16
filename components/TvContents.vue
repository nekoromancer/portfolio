<template>
    <div class="contents">
        <div
            class="contents__wrap"
            :class="{
                'contents__wrap--on': power,
            }"
        >
            <p
                v-for="content in getPortfolio"
                :key="content"
                class="contents__item"
            >
                {{ content }}
            </p>
        </div>
        <div
            class="contents__noise"
            :class="{
                'contents__noise--on': noise,
            }"
            :style="{
                top: `${noisePosition}%`
            }"
        />
    </div>
</template>
<script>
    export default {
        name: 'TvContents',
        props: {
            power: {
                type: Boolean,
                default: true,
            },
        },
        data () {
            return {
                noise: false,
                noisePosition: 0,
                setNoiseTimeout: null,
                offNoiseTimeout: null,
            };
        },
        computed: {
            getPortfolio () {
                return this.$store.getters['portfolio/getPortfolio'];
            },
        },
        watch: {
            power: {
                immediate: true,
                handler (value) {
                    if (value) {
                        this.setNoise();
                    } else {
                        this.onPowerOff();
                    }
                },
            },
        },
        methods: {
            setNoise () {
                const timeout = Math.floor(Math.random() * (3000 - 1000) + 1000);

                this.setNoiseTimeout = setTimeout(() => {
                    this.noise = true;
                    this.noisePosition = Math.floor(Math.random() * (80 - 20) + 20);

                    this.offNoiseTimeout = setTimeout(() => {
                        this.noise = false;
                        clearTimeout(this.offNoiseTimeout);
                    }, 100);

                    clearTimeout(this.setNoiseTimeout);
                    this.setNoise();
                }, timeout);
            },
            onPowerOff () {
                this.noise = false;
                clearTimeout(this.setNoiseTimeout);
                clearTimeout(this.offNoiseTimeout);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .contents {
        width: 552px;
        height: 390px;
        background: #000;
        border: 5px solid #000;
        border-radius: 50% / 40%;
        padding: 3em 4em;
        overflow: hidden;
        font-family: 'DOSGothic', sans-serif;
        color: #00db0b;

        @include media(mobile) {
            width: calc(100% - 3em);
            height: calc(100% - 3em);
        }
    }

    .contents__wrap {
        width: 100%;
        position: absolute;
        padding: 0 1em;
        top: 50%;
        left: 0;
        transform: translate3d(0, -50%, 0) scale3d(1, 0, 1);
        opacity: 0;
        transition: transform 100ms ease-out, opacity 100ms linear, filter 3000ms ease-out;
        background: #fff;
        filter: blur(5px);

        @include media(mobile) {
            height: 100%;
            padding: 3em 3em;
        }
    }

    .contents__wrap--on {
        background: #000;
        transform: translate3d(0, -50%, 0) scale3d(1, 1, 1);
        opacity: 1;
        filter: blur(0);
    }

    .contents__item {
        margin-bottom: 1em;
        word-break: keep-all;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .contents__noise {
        display: none;
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        background: rgba(#fff, 0.25);
    }

    .contents__noise--on {
        display: block;
    }
</style>
