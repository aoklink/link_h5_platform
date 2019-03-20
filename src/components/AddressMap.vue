<template>
    <iframe :src="src" class="address-map" />
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: ''
        },
        region: {
            type: String,
            default: ''
        }
    },
    computed: {
        src () {
            const key = `ZSOBZ-LEACW-QNMR5-OIA35-BTQ6O-53F2J`;
            return `https://apis.map.qq.com/tools/locpicker?search=0&type=1&key=${key}&referer=linke&mapdraggable=1`;
        }
    },
    destroyed () {
        window.removeEventListener('message', this.getMessage);
    },
    mounted () {
        window.addEventListener('message', this.getMessage, false);
    },
    methods: {
        getMessage (e) {
            const loc = event.data;
            if (loc && loc.module == 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                console.log('location', loc);
            }
        }
    }
};
</script>

<style scope>
    .address-map{
        border: none;
        width: 25.28rem;
        height: 5.11rem;
    }
</style>
