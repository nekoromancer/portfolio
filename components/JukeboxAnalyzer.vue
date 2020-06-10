<template>
    <div class="analyzer">
        <span
            v-for="height in 16"
            :key="height"
            class="analyzer__lamp"
            :class="{
                'analyzer__lamp--on': getFrequency >= height,
            }"
        />
    </div>
</template>
<script>
    export default {
        name: 'JukeboxAnalyzer',
        props: {
            frequency: {
                type: Number,
                default: 128,
            },
        },
        computed: {
            getFrequency () {
                return Math.abs(Math.ceil((this.frequency - 128) / 8));
            },
        },
    };
</script>
<style lang="scss" scoped>
    .analyzer {
        display: inline-flex;
        flex-direction: column-reverse;
        width: 15px;
        padding: 5px 3px;
        background: #000;
        border: 1px solid $woodBorder;
        border-radius: 5px;
    }

    .analyzer__lamp {
        display: block;
        position: relative;
        width: 5px;
        height: 5px;
        margin: 3px auto 0;
        border-radius: 50%;
        background: rgba(#fff, 0.5);
        transition: background 100ms;
        box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.75);

        &:last-child {
            margin-top: 0;
        }
    }

    .analyzer__lamp--on {
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
