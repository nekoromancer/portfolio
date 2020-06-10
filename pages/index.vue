<template>
    <div class="container">
        <clock
            :sound="sound"
            class="container__clock container__component"
        />
        <jukebox
            ref="jukebox"
            class="container__jukebox container__component"
            @sound="onSound"
        />
        <tv
            class="container__tv container__component"
        />
    </div>
</template>
<script>
    export default {
        components: {
            Clock: () => import('~/components/Clock'),
            Jukebox: () => import('~/components/Jukebox'),
            Tv: () => import('~/components/Tv'),
        },
        data () {
            return {
                sound: 0,
            };
        },
        methods: {
            onSound (event) {
                this.sound = Math.abs(Math.ceil((event - 128) / 128));
            },
        },
    };
</script>
<style lang="scss" scoped>
    .container {
        min-height: 100%;
        background: #000;
        text-align: center;
        padding: 50px 0;
    }

    .container__component {
        margin: 0 auto 1em;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
