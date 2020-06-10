<template>
    <div class="nixie">
        <div class="nixie__grill" />
        <div
            v-if="mode === 'number'"
            class="nixie__numbers numbers"
            :style="{ opacity: getOpacity }"
        >
            <div
                v-for="(_, index) in 10"
                :key="index"
                class="numbers__number"
                :class="{
                    'numbers__number--current': index === getNumber,
                    'numbers__number--off': !power,
                }"
            >
                {{ index }}
            </div>
        </div>
        <div
            v-else
            class="nixie__numbers colon"
        >
            <div
                class="colon__text"
                :class="{
                    'colon__text--off': !power,
                }"
                :style="{ opacity: getOpacity }"
            >
                :
            </div>
        </div>
        <div class="nixie__tube" />
        <div
            class="nixie__bottom"
            :style="{
                'background-position': patternPosition,
            }"
        >
            <button
                class="nixie__bottom__power-button"
                :class="{
                    'nixie__bottom__power-button--on': power,
                }"
                :aria-label="`닉시관 전원 ${power ? '끄기' : '켜기'}`"
                @click="togglePower"
            >
                <font-awesome-icon
                    class="nixie__bottom__power-button__icon"
                    :icon="faPowerOff"
                />
            </button>
        </div>
    </div>
</template>
<script>
    import { faPowerOff } from '@fortawesome/free-solid-svg-icons/';

    export default {
        name: 'ClockNixie',
        props: {
            mode: {
                type: String,
                default: 'number',
                validate (value) {
                    return ['number', 'colon'].includes(value);
                },
            },
            number: {
                type: Number,
                default: 0,
            },
            blink: {
                type: Boolean,
                default: true,
            },
            blinkType: {
                type: String,
                default: 'regular',
                validate (value) {
                    return ['regular', 'random'].includes(value);
                },
            },
            maxOpacity: {
                type: Number,
                default: 1,
            },
        },
        data () {
            return {
                timer: null,
                blinkOpacity: 1,
                interval: null,
                power: true,
                patternPosition: `${Math.floor(Math.random() * 203)}px ${Math.floor(Math.random() * 317)}px`,
            };
        },
        computed: {
            getNumber () {
                return this.number;
            },
            getOpacity () {
                return this.power ? this.blinkOpacity : 0.5;
            },
            faPowerOff () {
                return faPowerOff;
            },
        },
        watch: {
            power: {
                immediate: true,
                handler (value) {
                    if (value && this.blink) {
                        this.startBlink();
                    } else if (!value && this.interval) {
                        this.stopBlink();
                    }
                },
            },
            maxOpacity () {
                this.stopBlink();
                this.startBlink();
            },
        },
        methods: {
            startBlink () {
                if (this.blinkType === 'regular') {
                    this.interval = setInterval(() => {
                        this.blinkOpacity = this.blinkOpacity === this.maxOpacity
                            ? this.maxOpacity - 0.2
                            : this.maxOpacity;
                    }, 72);
                } else {
                    const timeout = Math.floor(Math.random() * (300 - 100) + 100);

                    this.interval = setInterval(() => {
                        this.blinkOpacity = Math.random() * (this.maxOpacity - 0.4) + 0.4;
                    }, timeout);
                }
            },
            stopBlink () {
                clearInterval(this.interval);
            },
            togglePower () {
                this.power = !this.power;

                if (this.power) {
                    this.startBlink();
                } else {
                    this.stopBlink();
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    .nixie {
        display: inline-block;
        position: relative;
        width: 100px;
        height: 180px;
        margin: auto;
    }

    .nixie__tube {
        $white: rgba(255, 255, 255, 1);
        $transparent: rgba(0, 0, 0, 0);
        position: relative;
        width: 80px;
        height: 130px;
        margin: auto;
        background: linear-gradient(90deg, $white 0%,  $transparent 40%,  $transparent 60%, $white 100%);
        opacity: 0.3;
        border-radius: 5% 5% 0 0;
        border: 2px solid #fff;
    }

    .nixie__grill {
        $grill: rgba(68, 68, 68, 0.1);
        $blank: rgba(0, 0, 0, 0);
        $pattern: $grill, $blank 4px, $grill, $blank 16px;
        width: 72px;
        height: 120px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        background:
            repeating-linear-gradient(-45deg, $pattern),
            repeating-linear-gradient(45deg, $pattern),
            repeating-linear-gradient(90deg, $pattern),
            repeating-linear-gradient($pattern);
    }

    .numbers,
    .colon {
        width: 72px;
        height: 100px;
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        transition: opacity 300ms;
    }

    .numbers__number,
    .colon__text {
        position: absolute;
        width: 100%;
        height: 100%;
        font-family: 'Montserrat', sans-serif;
        font-weight: 100;
        font-size: 7em;
        color: #999;
        opacity: 0.5;
        transition: all 200ms;
        line-height: 90%;
        text-align: center;

        &:after {
            content: '';
            display: block;
            position: absolute;
            left: -3px;
            top : -20px;
            width: 80px;
            height: 130px;
            border-radius: 5% 5% 0 0;
            transition: all 200ms;
            box-shadow: 0 0 10px 5px $orange;
            opacity: 0;
        }
    }

    .numbers__number--current,
    .colon__text {
        z-index: 999;
        color: $orange;
        text-shadow: 1px 0 10px $orange, -1px 0 10px $orange, 0 2px 10px $orange, 0 -2px 10px $orange;
        opacity: 1;

        &:after {
            opacity: 0.3;
        }
    }

    .colon__text {
        line-height: 70%;
    }

    .numbers__number--off,
    .colon__text--off {
        color: #999;
        text-shadow: none;
        opacity: 0.5;
    }

    .nixie__bottom {
        $black: rgba(0, 0, 0, 0.5);
        $gray: rgba(102, 102, 102, 0.5);
        position: relative;
        width: 100%;
        height: 50px;
        background:
            linear-gradient(90deg, $black 0%,  $gray 40%,  $gray 60%,  $black 100%),
            url('~assets/image/wood.png');
        border: 1px solid #222;
    }

    .nixie__bottom__power-button {
        position: absolute;
        display: inline-block;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translate3d(-50%, -50%, 0);
        transition: all 100ms;
        cursor: pointer;
        padding: 0.15em;
        border: 1px solid #000000;
        border-radius: 50%;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        color: #afafaf;
        outline: none;

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #000000;
            background-image: url('~assets/image/wood.png');
            transform: rotate(90deg);
        }
    }

    .nixie__bottom__power-button--on {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 1);
        color: $orange;
        filter: drop-shadow(0 0 2px $orange);
        border: 1px solid $orange;
    }

    .nixie__bottom__power-button__icon {
        position: relative;
        z-index: 99;
    }
</style>
