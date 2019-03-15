<template>
    <div class="form-add-coach">
        <h3>
            教练信息
            <app-button theme="grey" size="medium" custom-class="form-btn-add"
                        @click="onSubmitCoachInfo"
            >
                点击添加
            </app-button>
        </h3>
        <div class="app-form-item">
            <label>姓名</label>
            <input v-model="formCoachInfo.name" autocomplete="false" type="text"
                   placeholder="请输入教练姓名"
            >
        </div>
        <div class="app-form-item">
            <label>标签</label>
            <input v-model="formCoachInfo.label" autocomplete="false" type="text"
                   placeholder="请输入标签，用空格隔开"
            >
        </div>
        <div class="form-upload-img-item">
            <label>
                <h6>教练照片</h6>
            </label>
            <upload-img v-model="formCoachInfo.img_url" @error="onUploadImgError" />
        </div>
    </div>
</template>
<script>
import UploadImg from './UploadImg.vue';
import AppButton from './AppButton.vue';
import { ADD_COASH } from
    '../store/action_type';
import {verifyEmptyHelper} from '../utils/index.js';
export default {
    components: {
        AppButton,
        UploadImg
    },
    props: {
        gymId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            formCoachInfo: {
                name: '',
                label: '',
                img_url: ''
            }
        };
    },
    methods: {
        async onUploadImgError (msg) {
            this.$notify.error({
                title: '图片上传失败',
                message: msg
            });
        },
        async onSubmitCoachInfo () {
            let validResult = verifyEmptyHelper(this.formCoachInfo, [{
                field: 'name',
                label: '姓名'
            }]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return;
            }
            let result = await this.$store.dispatch(ADD_COASH, {...this.formCoachInfo, gym_id: this.gymId});
            if (result.success) {
                this.$notify({
                    title: '添加成功',
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '添加失败',
                    message: result.data
                });
            }
        }
    }
};
</script>

<style scoped>
    .form-add-coach .app-form-item{
        margin-bottom: .39rem;
    }
</style>
