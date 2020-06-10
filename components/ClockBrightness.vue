<template>
    <div class="brightness">
        <p class="label-text brightness__label">
            Brightness
        </p>
        <div class="brightness__control">
            <button
                ref="button"
                class="metal-button brightness__button"
                :style="{
                    transform: `translate3D(${getButtonX}px, -50%, 0)`,
                }"
                aria-label="밝기 조절용 슬라이드 버튼"
                @mousedown="onMouseDown"
            />
            <div class="brightness__guide" />
        </div>
        <div class="brightness__max-min">
            <span class="label-text">Min</span>
            <span class="label-text">|</span>
            <span class="label-text">Max</span>
        </div>
    </div>
</template>
<script>
    const minX = 0;
    const maxX = 275;
    const minBrightness = 0.6;

    export default {
        name: 'ClockBrightness',
        props: {
            brightness: {
                type: Number,
                default: 1,
            },
        },
        data () {
            const buttonX = Math.ceil((this.brightness - minBrightness) / (1 - minBrightness) * maxX);

            return {
                buttonX,
                startX: 0,
                oldX: 0,
            };
        },
        computed: {
            getButtonX () {
                return this.buttonX;
            },
        },
        methods: {
            onMouseDown (event) {
                this.startX = event.clientX;
                this.oldX = this.buttonX;
                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseup', this.onMouseUp);
            },
            onMouseMove (event) {
                const moveX = event.clientX - this.startX;
                const destinationX = this.oldX + moveX;

                if (destinationX > minX && destinationX <= maxX) {
                    this.buttonX = destinationX;
                } else if (destinationX <= minX) {
                    this.buttonX = minX;
                } else if (destinationX > maxX) {
                    this.buttonX = maxX;
                }

                this.$emit('brightnessChange', (this.buttonX / maxX) * (1 - minBrightness) + minBrightness);
            },
            onMouseUp () {
                window.removeEventListener('mousemove', this.onMouseMove);
                window.removeEventListener('mouseup', this.onMouseUp);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .brightness {
        width: 300px;
    }

    .brightness__label {
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    .brightness__control {
        position: relative;
    }

    .brightness__button {
        position: absolute;
        top: 50%;
        z-index: 999;
        box-shadow:
            0 0 2px 3px rgba(0, 0, 0, 0.5),
            0 8px 2px 2px rgba(0, 0, 0, 0.5),
            0 16px 2px 2px rgba(0, 0, 0, 0.4);
    }

    .brightness__guide {
        position: relative;
        width: 300px;
        height: 10px;
        border-radius: 5px;
        border: 1px solid #6e5a21;
        background: #2b2b2b;
        box-shadow: inset 1px 1px 2px 1px #000;

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: calc(300px - 1em);
            height: 2px;
            background: #000000;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            border-radius: 1px;
        }
    }

    .brightness__max-min {
        display: flex;
        justify-content: space-between;
        padding-top: 1em;
    }
</style>
