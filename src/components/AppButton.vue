<template>
    <button :class="className" @click="onClick">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'mini',
            validator: (value) => ['medium', 'small', 'mini'].includes(value)
        },
        theme: {
            type: String,
            default: 'plain',
            validator (value) {
                return ['plain', 'yellow', 'grey'].includes(value);
            }
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        className () {
            return ['base', this.size, this.theme, this.customClass].join(' ');
        }
    },
    methods: {
        onClick (...args) {
            this.$emit('click', ...args);
        }
    }
};

</script>

<style scoped>
    .base {
        border-radius: 0.11rem;
        border: none;
        background: none;
        cursor: pointer;
        color: #3C4456;
        font-family:PingFangSC-Medium;
        font-weight:500;
        font-size: 14px;
    }
    .base:focus{
        outline: none;
    }
    .base:not(:last-of-type){
        margin-right: .25rem;;
    }

    .mini{
        width:1.67rem;
        height:0.69rem;
        line-height: .69rem;
    }
    .medium{
        width:3.33rem;
        height:0.97rem;
    }

    .yellow{
        background:rgba(255,192,1,1);
    }
    .plain {
        border:1px solid rgba(60,68,86,1);

    }
    .grey{
        background:rgba(60,68,86,1);
        color: #fff;
    }

</style>
