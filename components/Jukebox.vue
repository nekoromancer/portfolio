<template>
    <div class="jukebox">
        <audio
            ref="audio"
            preload="none"
            loop
        >
            <source
                :src="getSource"
                type="audio/mp3"
            >
        </audio>
        <jukebox-controls
            class="jukebox__controls"
            @play="playAudio"
            @stop="stopAudio"
            @pause="pauseAudio"
        />
        <div class="jukebox__analyzer">
            <jukebox-analyzer
                v-for="(data, index) in getDataArray"
                :key="index"
                :frequency="data"
                class="jukebox__analyzer__bar"
            />
        </div>
        <jukebox-volume
            class="jukebox__volume"
            @volumeChange="volumeChange"
        />
    </div>
</template>
<script>
    const source = require('~/assets/sound/romantic.mp3');

    export default {
        name: 'Jukebox',
        components: {
            JukeboxControls: () => import('~/components/JukeboxControls'),
            JukeboxAnalyzer: () => import('~/components/JukeboxAnalyzer'),
            JukeboxVolume: () => import('~/components/JukeboxVolume'),
        },
        data () {
            return {
                audioContext: null,
                analyzer: null,
                gainNode: null,
                source: null,
                dataArray: new Array(16),
                analyzerInterval: null,
            };
        },
        computed: {
            getSource () {
                return source;
            },
            getDataArray () {
                return this.dataArray;
            },
            audio () {
                return this.$refs.audio;
            },
        },
        methods: {
            createAudioContext () {
                this.audioContext = new AudioContext();
                this.analyzer = this.audioContext.createAnalyser();
                this.source = this.audioContext.createMediaElementSource(this.audio);
                this.gainNode = this.audioContext.createGain();

                this.source.connect(this.analyzer);
                this.analyzer.connect(this.audioContext.destination);
                this.analyzer.fftSize = 32;

                this.source.connect(this.gainNode);
                this.gainNode.connect(this.audioContext.destination);
            },
            initAnalyzer () {
                new Array(16).fill(128).forEach((data, index) => this.dataArray.splice(index, 1, data));
            },
            playAudio () {
                this.audio.play();

                if (!this.audioContext) {
                    this.createAudioContext();
                }

                this.analyzerInterval = setInterval(() => {
                    const bufferLength = this.analyzer.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    this.analyzer.getByteTimeDomainData(dataArray);
                    dataArray.forEach((data, index) => this.dataArray.splice(index, 1, data));

                    this.$emit('sound', this.dataArray[0]);
                }, 100);
            },
            pauseAudio () {
                this.audio.pause();
                clearInterval(this.analyzerInterval);
            },
            stopAudio () {
                this.pauseAudio();
                this.audio.currentTime = 0;
                this.initAnalyzer();
            },
            volumeChange (event) {
                if (!this.audioContext) {
                    this.createAudioContext();
                }

                this.gainNode.gain.value = event;
            },
        },
    };
</script>
<style lang="scss">
    .jukebox {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        width: 1080px;
        height: 200px;
        border-radius: 25px;
        z-index: 999;
        overflow: hidden;

        @include media(mobile) {
            width: 100%;
            height: auto;
            border-radius: 10px;
            padding: 1em 0;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 200px;
            height: 1080px;
            top: 0;
            left: 0;
            transform: rotate(-90deg) translateX(-100%);
            transform-origin: top left;
            background-color: #000;
            background-image: url('~assets/image/wood.png');
            z-index: -1;
        }
    }

    .jukebox__analyzer {
        @include media(mobile) {
            display: none;
        }
    }

    .jukebox__analyzer__bar {
        margin-right: 3px;

        &:last-child {
            margin-right: 0;
        }
    }

    .jukebox__volume {
        @include media(mobile) {
            display: none;
        }
    }
</style>
