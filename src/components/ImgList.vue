<template>
    <ul class="img-list">
        <li v-for="(src,index) in value" :key="src">
            <img :src="src">
            <i class="el-icon-error btn-delete" @click="onDelete(index)" />
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    methods: {
        onDelete (index) {
            this.$emit('input', [...this.value.slice(0, index), ...this.value.slice(index + 1, this.value.length)]);
        }
    }
};
</script>

<style scoped>
    .img-list{
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex: 1;
        list-style: none;
    }
    .img-list li{
        position: relative;
        padding: 0;
        margin: 0;
        margin-right: 10px;
    }

    .img-list img{
        max-height: 2.22rem;
        max-width: 2.22rem;
    }
    .btn-delete{
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%,-50%);
        color: red;
        border: 1px solid #fff;
        border-radius: 50% 50%;
        z-index: 2;
        cursor: pointer;;
    }
</style>
