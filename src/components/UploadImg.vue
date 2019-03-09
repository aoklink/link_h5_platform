<template>
    <div>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-error="handleError"
            :on-success="handleSuccess"
            :headers="{}"
        >
            <i class="el-icon-plus" />
        </el-upload>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed: {
        ...mapState(['OSSsession'])
    },
    methods: {
        handleSuccess (response, file, fileList) {
            console.log(response, file, fileList);
        },
        handleError (err, file, fileList) {
            console.log(err, file, fileList);
        }
    }
};
</script>
