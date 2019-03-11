<template>
    <div class="upload-img">
        <el-upload
            :action="OSSsession.host"
            list-type="picture-card"
            :on-error="handleError"
            :on-success="handleSuccess"
            :data="formData"
            :multiple="false"
            :before-upload="handleBeforeUpload"
            :show-file-list="false"
        >
            <img v-if="oneImage&&imgSrc" :src="imgSrc">
            <i v-else class="el-icon-plus" />
        </el-upload>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    props: {
        oneImage: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            imgSrc: ''
        };
    },
    computed: {
        ...mapState(['OSSsession']),
        formData: function () {
            return {
                policy: this.OSSsession.policy,
                signature: this.OSSsession.signature,
                key: `${this.OSSsession.dir}${Date.now()}.jpg`,
                name: `${Date.now()}.jpg`,
                OSSAccessKeyId: this.OSSsession.accessid,
                success_action_status: 200,
                callback: this.OSSsession.callback
            };
        }
    },
    methods: {
        handleSuccess (response, file, fileList) {
            console.log(222, response, file, fileList);
            this.$$emit('url', '');
        },
        handleError (err, file, fileList) {
            console.log(111, err, file, fileList);
            console.log(33, err);
            this.$emit('error', err);
        },
        handleChange (file, fileList) {

        },
        handleBeforeUpload (file) {
            if (!/\.(png|jpg|jpeg|gif)$/.test(file.name)) {
                this.$message.error('只能上传图片');
                return false;
            }
            return true;
        }
    }
};
</script>

<style>
    .upload-img .el-upload--picture-card{
        width: 2.22rem;
        height: 2.22rem;
        line-height: 2.4rem;
    }

</style>
