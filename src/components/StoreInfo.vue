<template>
    <div>
        info
        {{ storeData.content }}
    </div>
</template>

<script>
export default {
    props: {
        storeData: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    created () {
        console.log(this.data);
    }
};
</script>

<style>

</style>
