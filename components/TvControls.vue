<template>
    <div class="controls">
        <tv-controls-display
            class="controls__display"
            :power="power"
        />
        <div class="controls__dial__wrapper">
            <p class="controls__labels">
                <span
                    class="label-text controls__labels__label controls__labels__prev"
                    :class="{
                        'controls__labels__label--lamp-on': prevLampOn,
                    }"
                >
                    Previous
                </span>
                <span
                    class="label-text controls__labels__label controls__labels__next"
                    :class="{
                        'controls__labels__label--lamp-on': nextLampOn,
                    }"
                >
                    Next
                </span>
            </p>
            <button
                class="metal-button controls__dial"
                :class="{
                    'controls__dial--release': release,
                }"
                :style="{
                    transform: `rotate(${getDeg}deg`,
                }"
                aria-label="항목 선택 다이얼"
                @mousedown="onMouseDown"
                @touchstart.prevent="onMouseDown"
            />
        </div>

        <div class="controls__links">
            <button
                class="metal-button controls__links__link"
                :class="{
                    'controls__links__link--on': power && getCurrentLink,
                }"
                aria-label="링크로 이동하기"
                @click="moveToLink"
            >
                <font-awesome-icon
                    :icon="faLink"
                />
            </button>
            <a
                href="https://www.github.com/nekoromancer"
                target="_blank"
                rel="noreferrer"
                class="metal-button controls__links__link controls__links__link--on"
                aria-label="깃허브로 이동하기"
            >
                <font-awesome-icon
                    :icon="faGithub"
                />
            </a>
            <a
                href="mailto:nekonitrate@gmail.com"
                class="metal-button controls__links__link controls__links__link--on"
                aria-label="이메일 보내기"
            >
                <font-awesome-icon
                    :icon="faEnvelope"
                />
            </a>
        </div>
    </div>
</template>
<script>
    import { faLink, faEnvelope } from '@fortawesome/free-solid-svg-icons';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';

    const maxDeg = 135;
    const minDeg = 45;

    export default {
        name: 'TvControls',
        components: {
            TvControlsDisplay: () => import('~/components/TvControlsDisplay'),
        },
        props: {
            power: {
                type: Boolean,
                default: true,
            },
        },
        data () {
            return {
                deg: 90,
                posX: 0,
                posY: 0,
                release: false,
                prevLampOn: false,
                nextLampOn: false,
                lampTimeout: null,
                faLink,
                faGithub,
                faEnvelope,
            };
        },
        computed: {
            getDeg () {
                return this.deg;
            },
            getCurrentLink () {
                return this.$store.state.portfolio.currentLink;
            },
        },
        methods: {
            onMouseDown (event) {
                const bounding = event.target.getBoundingClientRect();
                this.posX = Math.ceil(bounding.x) + bounding.width / 2;
                this.posY = Math.ceil(bounding.y) + bounding.height / 2;

                this.release = false;

                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseup', this.onMouseUp);
                window.addEventListener('touchmove', this.onMouseMove);
                window.addEventListener('touchend', this.onMouseUp);
            },
            onMouseMove (event) {
                const x = this.posX - (event.clientX || event.touches[0].clientX);
                const y = this.posY - (event.clientY || event.touches[0].clientY);
                let deg = Math.ceil(Math.atan2(y, x) * 180 / Math.PI);
                deg = deg < 0 ? deg + 360 : deg;

                if (deg <= maxDeg && deg >= minDeg) {
                    this.deg = deg;
                } else {
                    this.onMouseUp();

                    if (deg < 90) {
                        this.blinkLamp('prev');
                        this.$store.dispatch('portfolio/prevItem');
                    } else {
                        this.blinkLamp('next');
                        this.$store.dispatch('portfolio/nextItem');
                    }
                }
            },
            onMouseUp () {
                this.deg = 90;
                this.release = true;
                window.removeEventListener('mousemove', this.onMouseMove);
                window.removeEventListener('mouseup', this.onMouseUp);
                window.removeEventListener('touchmove', this.onMouseMove);
                window.removeEventListener('touchend', this.onMouseUp);
            },
            blinkLamp (target) {
                if (this.power) {
                    this[`${target}LampOn`] = true;

                    this.lampTimeout = setTimeout(() => {
                        this[`${target}LampOn`] = false;
                        clearTimeout(this.lampTimeout);
                    }, 1000);
                }
            },
            moveToLink () {
                if (this.getCurrentLink) {
                    window.open(this.getCurrentLink);
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    .controls {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 420px;
        height: 100%;
        background: url('~assets/image/wood.png');
        border-radius: 25px;

        @include media(mobile) {
            width: 100%;
            border-radius: 10px;
            padding: 4em 0 1em;
        }
    }

    .controls__display {
        @include media(mobile) {
            display: none;
        }
    }

    .controls__dial__wrapper {
        display: inline-block;
        position: relative;

        @include media(mobile) {
            margin-bottom: 1.5em;
        }
    }

    .controls__labels__label {
        position: absolute;
        top: -1.5em;

        &:after {
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #fff;
            bottom: -100%;
        }

        &:before {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            top: -1em;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            background: rgba(#fff, 0.5);
            border: 1px solid $woodBorder;
            border-radius: 50%;
            box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.75);
            transition: all 200ms ease-out;
        }
    }

    .controls__labels__label--lamp-on {
        &:before {
            background: $orange;
            box-shadow:
                inset -1px -1px 2px 0 rgba(0, 0, 0, 0.75),
                0 0 5px 2px $orange;
        }
    }

    .controls__labels__prev {
        left: -50%;

        &:after {
            right: 0.5em;
        }
    }

    .controls__labels__next {
        right: -35%;

        &:after {
            left: 0.5em;
        }
    }

    .controls__dial {
        width: 10em;
        height: 10em;
        box-shadow: 0 0 5px 3px rgba(#000, 0.75);

        &:after {
            content: '';
            position: absolute;
            display: block;
            width: 0.5em;
            height: 0.5em;
            background: #ff4500;
            border-radius: 50%;
            top: 50%;
            left: 1em;
            transform: translate3D(0, -50%, 0);
            box-shadow: inset 2px -1px 2px 0 rgba(#000, 0.5);
        }
    }

    .controls__dial--release {
        transition: transform 250ms ease-in;
    }

    .controls__links {
        text-align: center;
    }

    .controls__links__link {
        display: inline-block;
        width: 2.25em;
        height: 2.25em;
        margin-right: 1em;
        box-shadow: 1px 1px 2px 2px #000000;
        font-size: 1.25em;
        transition: all 500ms ease-in;

        &:active {
            box-shadow: -1px -1px 1px 1px #000000;
        }

        &:last-child {
            margin-right: 0;
        }
    }

    a.controls__links__link {
        display: inline-flex;
        vertical-align: middle;
        justify-content: center;
        align-items: center;;
    }

    .controls__links__link--on {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 1);
        color: $orange;
        filter: drop-shadow(0 0 2px $orange);
        border: 1px solid $orange;
    }
</style>
