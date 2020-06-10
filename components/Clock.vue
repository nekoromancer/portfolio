<template>
    <div class="clock">
        <div class="clock__nixie-tubes">
            <clock-nixie
                :number="getTimes[0]"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                blink-type="random"
                :number="getTimes[1]"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                mode="colon"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                :number="getTimes[2]"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                :number="getTimes[3]"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                blink-type="random"
                mode="colon"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                :number="getTimes[4]"
                :max-opacity="maxOpacity"
            />
            <clock-nixie
                :number="getTimes[5]"
                :max-opacity="maxOpacity"
            />
        </div>
        <div class="clock__bottom">
            <clock-utc
                class="clock__bottom__utc-offset"
                :offset="utcOffset"
                @offsetChange="onOffsetChange"
            />
            <div
                class="clock__bottom__speaker"
                :class="{
                    'clock__bottom__speaker--on-sound': sound === 1,
                }"
            >
                <div class="clock__bottom__speaker__grill" />
            </div>
            <clock-brightness
                class="clock__bottom__brightness"
                :brightness="getMaxOpacity"
                @brightnessChange="onBrightnessChange"
            />
        </div>
    </div>
</template>
<script>
    import dayjs from 'dayjs';
    import utc from 'dayjs/plugin/utc';

    dayjs.extend(utc);

    export default {
        name: 'Clock',
        components: {
            ClockNixie: () => import('~/components/ClockNixie'),
            ClockUtc: () => import('~/components/ClockUtc'),
            ClockBrightness: () => import('~/components/ClockBrightness'),
        },
        props: {
            sound: {
                type: Number,
                default: 0,
            },
        },
        data () {
            return {
                timeString: '000000',
                utcOffset: -new Date().getTimezoneOffset() / 60,
                maxOpacity: 1,
            };
        },
        computed: {
            getTimes () {
                return this.timeString.split('').map(number => Number(number));
            },
            getMaxOpacity () {
                return this.maxOpacity;
            },
        },
        mounted () {
            this.getCurrentTime();

            setInterval(() => {
                this.getCurrentTime();
            }, 1000);
        },
        methods: {
            getCurrentTime () {
                this.timeString = dayjs()
                    .utcOffset(this.utcOffset)
                    .format('HHmmss');
            },
            onOffsetChange (event) {
                this.utcOffset = event;
                this.getCurrentTime();
            },
            onBrightnessChange (event) {
                this.maxOpacity = event;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .clock {
        display: inline-block;
    }

    .clock__nixie-tubes {
        line-height: 0;
    }

    .clock__bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        width: 1080px;
        height: 250px;
        background-color: #000;
        background-image: url('~assets/image/wood.png');
        border-radius: 25px;
    }

    .clock__bottom__speaker {
        position: relative;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(84, 84, 84, 1) 100%);
        border-radius: 50%;

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 50px;
            height: 50px;
            background: #000;
            border-radius: 50%;
            border: 4px solid #000;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0) scale(1);
            transition: all 200ms cubic-bezier(0.230, 1.000, 0.320, 1.000);
            box-shadow:
                inset 5px 5px 12px 2px rgba(125, 125, 125, 0.75),
                inset -5px -6px 12px 2px rgba(25, 25, 25, 0.75);
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            border-radius: 50%;
            box-shadow: 0 0 10px -2px #000, 0 0 0 10px #808080, 0 0 4px 12px #000;
        }
    }

    .clock__bottom__speaker--on-sound {
        &:after {
            transform: translate3d(-50%, -50%, 0) scale(1.05);
        }
    }

    .clock__bottom__speaker__grill {
        $grill: rgba(68, 68, 68, 0.5);
        $blank: rgba(0, 0, 0, 0.5);
        $pattern: $grill, $blank 1px, $grill, $blank 2px;

        opacity: 0.65;
        width: 100%;
        height: 100%;
        position: relative;
        background:
            repeating-linear-gradient(-45deg, $pattern),
            repeating-linear-gradient(45deg, $pattern),
            #000;
        border-radius: 50%;
        border: 2px solid #000;
        box-shadow: inset 3px 3px 12px 3px rgba(#888, 0.5), inset -3px -4px 12px 3px rgba(#000, 1);
        z-index: 999;
    }
</style>
