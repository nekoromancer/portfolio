<template>
    <div class="display">
        <h1 class="label-text display__h1">
            Portfolios
        </h1>
        <digit :string="getValue('current')[0]" />
        <digit :string="getValue('current')[1]" />
        <span class="label-text display__label-string">/</span>
        <digit :string="getValue('total')[0]" />
        <digit :string="getValue('total')[1]" />
    </div>
</template>
<script>
    export default {
        name: 'TvControlsDisplay',
        components: {
            Digit: () => import('~/components/Digit'),
        },
        props: {
            power: {
                type: Boolean,
                default: true,
            },
        },
        data () {
            return {
                total: 12,
                current: 1,
            };
        },
        computed: {
            getValue () {
                return target => {
                    if (this.power) {
                        const array = [];

                        if (this[target] < 10) {
                            array.push('0');
                            array.push(this[target].toString());
                        } else {
                            this[target].toString().split('').forEach(each => array.push(each));
                        }

                        return array;
                    } else {
                        return ['blank', 'blank'];
                    }
                };
            },
        },
    };
</script>
<style lang="scss" scoped>
    .display__h1 {
        margin-bottom: 0.25em;
    }

    .display__label-string {
        font-size: 2em;
    }
</style>
