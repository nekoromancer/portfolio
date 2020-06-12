<template>
    <div class="spinner">
        <div class="spinner__element" />
    </div>
</template>
<script>
    export default {
        name: 'Spinner',
    };
</script>
<style lang="scss" scoped>
    .spinner {
        position: fixed;
        z-index: 99999;
        width: 150px;
        height: 150px;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        transition: transform 500ms ease-in;
        transition-delay: 1000ms;
        background: url('~assets/image/wood.png'), #000;
        border-radius: 1em;
    }

    .spinner__element {
        position: relative;
        width: 100%;
        height: 100%;
        animation: rotate 2500ms infinite linear;

        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 25px;
            height: 25px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            border-radius: 50%;
        }

        &:before {
            background: #000;
            box-shadow: 0 0 0 30px #a2a2a2;
        }

        &:after {
            box-shadow:
                2.5em 0 0 -6px #000,
                1.78em 1.78em 0 -6px #000,
                0 2.5em 0 -6px #000,
                -1.78em 1.78em 0 -6px #000,
                -2.5em 0 0 -6px #000,
                -1.78em -1.78em 0 -6px #000,
                0 -2.5em 0 -6px #000,
                1.78em -1.78em 0 -6px #000,

                2.5em 0 0 0 #a2a2a2,
                1.78em 1.78em 0 0 #a2a2a2,
                0 2.5em 0 0 #a2a2a2,
                -1.78em 1.78em 0 0 #a2a2a2,
                -2.5em 0 0 0 #a2a2a2,
                -1.78em -1.78em 0 0 #a2a2a2,
                0 -2.5em 0 0 #a2a2a2,
                1.78em -1.78em #a2a2a2;
        }
    }

    @keyframes rotate {
        to {
            transform: rotate(0);
        }

        from {
            transform: rotate(360deg);
        }
    }
</style>
