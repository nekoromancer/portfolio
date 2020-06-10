<template>
    <div class="tv-body">
        <tv-contents
            class="tv-body__contents"
            :power="power"
        />
        <div
            class="tv-body__tube"
            :class="{
                'tv-body__tube--on': power,
            }"
        />
        <button
            class="metal-button tv-body__power-button"
            :class="{
                'tv-body__power-button--on': power,
            }"
            :aria-label="`TV 전원 ${power ? '끄기' : '켜기'}`"
            @click="togglePower"
        >
            <font-awesome-icon
                class="tv-body__power-button__icon"
                :icon="faPowerOff"
            />
        </button>
    </div>
</template>
<script>
    import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'TvBody',
        components: {
            TvContents: () => import('~/components/TvContents'),
        },
        props: {
            power: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            faPowerOff () {
                return faPowerOff;
            },
        },
        methods: {
            togglePower () {
                this.$emit('power', !this.power);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .tv-body {
        position: relative;
        width: 648px;
        height: 100%;
        padding: 3em;
        border-radius: 3em;
        background: url('~assets/image/wood.png');
    }

    .tv-body__tube {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(#222, 0.5);
        border: 5px solid #000;
        border-radius: 50% / 40%;
        box-shadow:
            inset 13px 11px 90px 10px,
            inset -13px -11px 90px 10px,
            inset 100px 100px 50px -40px rgba(255, 255, 255, 0.25);
        opacity: 1;
        overflow: hidden;
        transition: background 250ms, opacity 250ms ease-out;

        &:before {
            content: '';
            display: block;
            position: absolute;
            width: 1em;
            height: 1em;
            background: #fff;
            top: 6em;
            left: 5em;
            border-radius: 50%;
            box-shadow: 0 0 10px 8px #fff;
            opacity: 0.5;
        }

        &:after {
            content: '';
            display: none;
            position: absolute;
            width: 100%;
            height: 12.5%;
            background: linear-gradient(rgba(#fff, 0.5) 0%, rgba(#000, 0) 100%);
            left: 0;
            top: 0;
        }
    }

    .tv-body__tube--on {
        background: repeating-linear-gradient(rgba(#fff, 0.5) 4px, rgba(#000, 0) 8px);
        opacity: 0.5;
        animation: blink 100ms infinite linear;

        &:after {
            display: block;
            animation: noise 5s infinite linear;
        }
    }

    .tv-body__contents {
        position: absolute;
        top: 3em;
        bottom: 3em;
        left: 3em;
        right: 3em;
    }

    .tv-body__power-button {
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        right: 1.75em;
        bottom: 1.75em;
        transition: all 100ms;
        cursor: pointer;
        padding: 0.15em;
        border-radius: 50%;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        color: #afafaf;
        outline: none;
        font-size: 1.5em;
    }

    .tv-body__power-button--on {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 1);
        color: $orange;
        filter: drop-shadow(0 0 2px $orange);
        border: 1px solid $orange;
    }

    .tv-body__power-button__icon {
        position: relative;
        z-index: 99;
    }

    @keyframes noise {
        from {
            transform: translate3d(0, -100%, 0);
        }

        to {
            transform: translate3d(0, 900%, 0);
        }
    }

    @keyframes blink {
        from {
            opacity: 0.5;
        }

        to {
            opacity: 0.6;
        }
    }
</style>
