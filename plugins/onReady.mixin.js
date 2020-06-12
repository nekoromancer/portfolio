import Vue from 'vue';

export default function () {
    Vue.mixin({
        mounted () {
            this.$nextTick(() => {
                this.$emit('ready');
            });
        },
    });
}
