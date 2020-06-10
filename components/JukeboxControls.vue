<template>
    <div class="controls">
        <div class="controls__display">
            <digit
                v-for="(_, index) in 5"
                :key="index"
                :string="display[index]"
                class="controls__display__digit"
            />
        </div>
        <div class="controls__buttons">
            <button
                class="metal-button controls__buttons__button"
                aria-label="오디오 플레이"
                @click="play"
            >
                <font-awesome-icon
                    :icon="faPlay"
                />
            </button>
            <button
                class="metal-button controls__buttons__button"
                aria-label="오디오 일시정지"
                @click="pause"
            >
                <font-awesome-icon
                    :icon="faPause"
                />
            </button>
            <button
                class="metal-button controls__buttons__button"
                aria-label="오디오 멈춤"
                @click="stop"
            >
                <font-awesome-icon
                    :icon="faStop"
                />
            </button>
        </div>
    </div>
</template>
<script>
    import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'JukeboxControls',
        components: {
            Digit: () => import('~/components/Digit'),
        },
        data () {
            return {
                display: ['s', 't', 'o', 'p', '.'],
            };
        },
        computed: {
            faPlay () {
                return faPlay;
            },
            faStop () {
                return faStop;
            },
            faPause () {
                return faPause;
            },
        },
        methods: {
            play () {
                this.$emit('play');
                this.changeDisplay('play.');
            },
            stop () {
                this.$emit('stop');
                this.changeDisplay('stop.');
            },
            pause () {
                this.$emit('pause');
                this.changeDisplay('pause');
            },
            changeDisplay (string) {
                string.split('').forEach((char, index) => this.display.splice(index, 1, char));
            },
        },
    };
</script>
<style lang="scss" scoped>
    .controls__display {
        margin-bottom: 1em;
    }

    .controls__display__digit {
        margin-right: 4px;

        &:last-child {
            margin-right: 0;
        }
    }

    .controls__buttons__button {
        display: inline-block;
        box-shadow: 1px 1px 2px 2px #000000;
        margin-right: 1.5em;

        &:active {
            box-shadow: -1px -1px 1px 1px #000000;
        }

        &:last-child {
            margin-right: 0;
        }
    }
</style>
