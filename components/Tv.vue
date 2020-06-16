<template>
    <div class="tv">
        <tv-body
            class="tv__body"
            :power="power"
            @power="togglePower"
        />
        <tv-controls
            class="tv__controls"
            :power="power"
        />
    </div>
</template>
<script>
    export default {
        name: 'Tv',
        components: {
            TvBody: () => import('~/components/TvBody'),
            TvControls: () => import('~/components/TvControls'),
        },
        data () {
            return {
                power: true,
            };
        },
        methods: {
            togglePower (event) {
                this.power = event;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .tv {
        display: flex;
        justify-content: space-between;
        position: relative;
        width: 1080px;
        height: 486px;

        @include media(mobile) {
            width: 100%;
            height: auto;
            flex-direction: column;
        }
    }

    .tv__body {
        margin-bottom: 0.5em;
    }
</style>
