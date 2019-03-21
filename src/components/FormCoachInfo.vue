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
        <div>
            <h3>教练列表</h3>
            <el-table :data="coachInfoListSelected" height="400" stripe
                      style="width: 90%"
            >
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="label" label="标签" />
                <el-table-column label="头像">
                    <template v-if="scope.row.img_url" slot-scope="scope">
                        <img :src="scope.row.img_url" class="head-img">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <app-button size="mini" theme="red" @click="onDeleteCoach(scope.row.id)">
                            删除
                        </app-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import UploadImg from './UploadImg.vue';
import AppButton from './AppButton.vue';
import { ADD_COASH, GET_COACH_LIST_BY_GYMID, DELETE_GYM_COACH_BY_ID } from
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
    computed: {
        ...mapState(['coachInfoListSelected'])
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
            }, {
                field: 'img_url',
                label: '教练照片'
            }]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return;
            }
            let result = await this.$store.dispatch(ADD_COASH, {...this.formCoachInfo, gym_id: this.gymId});
            if (result.success) {
                this.$store.dispatch(GET_COACH_LIST_BY_GYMID, {gym_id: this.gymId});
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
        },
        async onDeleteCoach (id) {
            let result = await this.$store.dispatch(DELETE_GYM_COACH_BY_ID, {
                id
            });
            if (result.success) {
                this.$store.dispatch(GET_COACH_LIST_BY_GYMID, {gym_id: this.gymId});
                this.$notify({
                    title: '删除成功',
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '删除失败',
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
    .head-img{
        width: 2.22rem;
        height: 2.22rem;
    }
</style>
