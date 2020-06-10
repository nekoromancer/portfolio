<template>
    <div class="contents">
        <div
            class="contents__wrap"
            :class="{
                'contents__wrap--on': power,
            }"
        >
            <p class="contents__item">
                Name: 2016 Kia Sportage Digital Campaign
            </p>
            <p class="contents__item">
                Description: 2016 Kia All new Sportage 글로벌 프로모션 페이지. 다국어 지원은 Angular 모듈로 구현했다.
            </p>
            <p class="contents__item">
                Terms: 2015. 12 ~ 2016. 1
            </p>
            <p class="contents__item">
                My Roles: Back-end, Front-end 전체 개발(100%)
            </p>
            <p class="contents__item">
                Skill Set: PHP(Slim Framework), Angluar, MySql
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
    }

    .contents__wrap--on {
        background: #000;
        transform: translate3d(0, -50%, 0) scale3d(1, 1, 1);
        opacity: 1;
        filter: blur(0);
    }

    .contents__item {
        margin-bottom: 1em;

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
