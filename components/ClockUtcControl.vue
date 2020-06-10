<template>
    <div class="control">
        <button
            class="metal-button control__button"
            aria-label="디지털 표시값 올리기"
            @click="$emit('clickUp')"
        >
            <font-awesome-icon
                :icon="faChevronUp"
                class="control__button__icon"
            />
        </button>
        <digit
            class="control__digit"
            :string="string"
        />
        <button
            class="metal-button control__button"
            aria-label="디지털 표시값 내리기"
            @click="$emit('clickDown')"
        >
            <font-awesome-icon
                :icon="faChevronDown"
                class="control__button__icon"
            />
        </button>
    </div>
</template>
<script>
    import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'ClockUtcControl',
        components: {
            Digit: () => import('~/components/Digit'),
        },
        props: {
            string: {
                type: String,
                required: true,
            },
        },
        computed: {
            faChevronUp () {
                return faChevronUp;
            },
            faChevronDown () {
                return faChevronDown;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .control {
        display: inline-block;
        text-align: center;
    }

    .control__button {
        margin: 0.4em auto;
        box-shadow: 1px 1px 2px 2px #000000;

        &:active {
            box-shadow: -1px -1px 1px 1px #000000;
        }
    }

    .control__button__icon {
        color: #ffffff;
    }
</style>
