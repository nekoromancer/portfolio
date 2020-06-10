<template>
    <div class="volume">
        <h1 class="label-text volume__h1">
            Volume
        </h1>
        <span class="label-text volume__label volume__label-min">
            Min
        </span>
        <span class="label-text volume__label volume__label-max">
            Max
        </span>
        <button
            class="metal-button volume__button"
            :style="{
                transform: `rotate(${getDeg}deg`,
            }"
            aria-label="볼륨 조절 다이얼"
            @mousedown="onMouseDown"
        />
    </div>
</template>
<script>
    const maxVolume = 2;
    const maxDeg = 270;
    const minDeg = 0;

    export default {
        name: 'JukeboxVolume',
        props: {
            volume: {
                type: Number,
                default: 1,
            },
        },
        data () {
            const deg = (this.volume / maxVolume) * (maxDeg - minDeg);

            return {
                deg,
                posX: 0,
                posY: 0,
            };
        },
        computed: {
            getDeg () {
                return this.deg;
            },
        },
        methods: {
            onMouseDown (event) {
                const bounding = event.target.getBoundingClientRect();
                this.posX = Math.ceil(bounding.x) + bounding.width / 2;
                this.posY = Math.ceil(bounding.y) + bounding.height / 2;

                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseup', this.onMouseUp);
            },
            onMouseMove (event) {
                const x = this.posX - event.clientX;
                const y = this.posY - event.clientY;
                let deg = Math.ceil(Math.atan2(y, x) * 180 / Math.PI);
                deg = deg < 0 ? deg + 360 : deg;

                if (deg < maxDeg) {
                    this.deg = Math.round(deg / 10) * 10;
                } else {
                    this.onMouseUp();
                }

                this.$emit('volumeChange', this.deg / (maxDeg - minDeg) * maxVolume);
            },
            onMouseUp () {
                window.removeEventListener('mousemove', this.onMouseMove);
                window.removeEventListener('mouseup', this.onMouseUp);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .volume {
        position: relative;
    }

    .volume__h1 {
        position: absolute;
        top: -1.5em;
        left: 50%;
        transform: translate3D(-50%, 0, 0);
        font-size: 1.5em;
    }

    .volume__button {
        position: relative;
        width: 80px;
        height: 80px;
        box-shadow: 0 0 3px 2px #000;

        &:after {
            content: '';
            display: block;
            position: absolute;
            left: 0.5em;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 5px;
            height: 5px;
            background: #ff4500;
            border-radius: 50%;
            box-shadow: inset 1px 1px 1px 0 rgba(#000, 0.5);
        }
    }

    .volume__label {
        position: absolute;
    }

    .volume__label-min {
        top: 50%;
        left: -60%;
        transform: translate3d(0, -50%, 0);

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 5px;
            height: 5px;
            right: -50%;
            top: 50%;
            transform: translate3d(-50%, 0, 0);
            border-radius: 50%;
            background: #b7b7b7;
            box-shadow: inset 1px 1px 0 0 rgba(#000, 0.5);
        }
    }

    .volume__label-max {
        bottom: -40%;
        left: 50%;
        transform: translate3d(-50%, 0, 0);

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 5px;
            height: 5px;
            left: 50%;
            top: -50%;
            transform: translate3d(0, 50%, 0);
            border-radius: 50%;
            background: #b7b7b7;
            box-shadow: inset 1px 1px 0 0 rgba(#000, 0.5);
        }
    }
</style>
