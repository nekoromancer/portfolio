<template>
    <div class="utc-offset">
        <span class="label-text utc-offset__label">
            UTC
        </span>
        <clock-utc-control
            :string="getOffsetArray[0]"
            class="utc-offset__control"
            @clickUp="onDigitChange(0, 'up')"
            @clickDown="onDigitChange(0, 'down')"
        />
        <clock-utc-control
            :string="getOffsetArray[1]"
            class="utc-offset__control"
            @clickUp="onDigitChange(1, 'up')"
            @clickDown="onDigitChange(1, 'down')"
        />
        <clock-utc-control
            :string="getOffsetArray[2]"
            class="utc-offset__control"
            @clickUp="onDigitChange(2, 'up')"
            @clickDown="onDigitChange(2, 'down')"
        />
        <span class="label-text utc-offset__dot">.</span>
        <clock-utc-control
            :string="getOffsetArray[3]"
            class="utc-offset__control"
            @clickUp="onDigitChange(3, 'up')"
            @clickDown="onDigitChange(3, 'down')"
        />
    </div>
</template>
<script>
    import cloneDeep from 'lodash/cloneDeep';

    export default {
        name: 'UtcOffset',
        components: {
            ClockUtcControl: () => import('~/components/ClockUtcControl'),
        },
        props: {
            offset: {
                type: Number,
                required: true,
            },
        },
        computed: {
            getOffsetArray () {
                const offsetArray = [];

                if (this.offset >= 0) {
                    offsetArray.push('+');
                } else {
                    offsetArray.push('-');
                }

                if (this.offset >= 10) {
                    offsetArray.push('1');
                } else {
                    offsetArray.push('0');
                }

                if (this.offset % 1 === 0) {
                    offsetArray.push((Math.abs(this.offset % 10)).toString());
                    offsetArray.push('0');
                } else {
                    offsetArray.push((parseInt(this.offset, 10) % 10).toString());
                    offsetArray.push('5');
                }

                return offsetArray;
            },
        },
        methods: {
            onDigitChange (index, direction) {
                const offsetArray = cloneDeep(this.getOffsetArray);
                offsetArray[3] = `.${offsetArray[3]}`;

                switch (index) {
                case 0:
                    offsetArray[0] = this.offset >= 0 ? '-' : '+';
                    break;
                case 1:
                    offsetArray[1] = this.offset >= 10 ? '0' : '1';
                    break;
                case 2:
                    if (direction === 'up') {
                        if (this.offset >= 10) {
                            offsetArray[2] = offsetArray[2] === '2'
                                ? '0'
                                : (Number(offsetArray[2]) + 1).toString();
                        } else {
                            offsetArray[2] = offsetArray[2] === '9'
                                ? '0'
                                : (Number(offsetArray[2]) + 1).toString();
                        }
                    } else if (direction === 'down') {
                        if (this.offset >= 10) {
                            offsetArray[2] = offsetArray[2] === '0'
                                ? '2'
                                : (Number(offsetArray[2]) - 1).toString();
                        } else {
                            offsetArray[2] = offsetArray[2] === '0'
                                ? '9'
                                : (Number(offsetArray[2]) - 1).toString();
                        }
                    }
                    break;
                case 3:
                    if (this.offset !== 12 && this.offset !== 0) {
                        offsetArray[3] = offsetArray[3] === '.0' ? '.5' : '.0';
                    }
                    break;
                }

                this.$emit('offsetChange', Number(offsetArray.join('')));
            },
        },
    };
</script>
<style lang="scss" scoped>
    .utc-offset__label,
    .utc-offset__dot {
        font-size: 40px;
        vertical-align: middle;
    }

    .utc-offset__control {
        vertical-align: middle;
    }
</style>
