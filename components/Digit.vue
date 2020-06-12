<template>
    <div class="digit">
        <span
            v-for="(_, index) in 35"
            :key="index"
            class="digit__lamp"
            :class="{
                'digit__lamp--on': getStringCode[index] === 1,
            }"
        />
    </div>
</template>
<script>
    export default {
        name: 'Digit',
        props: {
            string: {
                type: String,
                default: null,
                validator (value) {
                    return /^([A-Za-z0-9+-.])$/.test(value) || value === 'blank';
                },
            },
        },
        data () {
            return Object.freeze({
                ...this.$store.state.digitMetric,
            });
        },
        computed: {
            getStringCode () {
                return this[this.string];
            },
        },
    };
</script>
<style lang="scss" scoped>
    $lampSize: 5px;
    $lampMargin: 4px;

    .digit {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: ($lampSize + $lampMargin) * 7 - $lampMargin;
        box-sizing: border-box;
        background: #000;
        padding: 5px 5px 1px 5px;
        font-size: 0;
        border: 1px solid $woodBorder;
        border-radius: 5px;
    }

    .digit__lamp {
        position: relative;
        display: inline-block;
        width: $lampSize;
        height: $lampSize;
        background: rgba(#fff, 0.5);
        border-radius: 50%;
        margin-right: $lampMargin;
        margin-bottom: $lampMargin;
        box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.75);

        &:nth-child(5n) {
            margin-right: 0;
        }
    }

    .digit__lamp--on {
        background: $orange;
        box-shadow:
            0 0 2px 3px rgba($orange, 0.25),
            inset -1px -1px 2px 0 rgba(0, 0, 0, 0.25);

        &:after {
            content: '';
            position: absolute;
            display: block;
            width: 1px;
            height: 1px;
            background: #fff;
            left: 1px;
            top: 1px;
        }
    }
</style>
