<template>
    <div class="container">
        <clock
            :sound="sound"
            class="container__clock"
        />
        <jukebox
            ref="jukebox"
            @sound="onSound"
        />
    </div>
</template>
<script>
    export default {
        components: {
            Clock: () => import('~/components/Clock'),
            Jukebox: () => import('~/components/Jukebox'),
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
        height: 100%;
        background: #000;
        text-align: center;
        padding: 50px 0;
    }

    .container__clock {
        margin-bottom: 1em;
    }
</style>
