<template>
    <div class="form-add-edit-gym">
        <el-tabs :value="activeName" :before-leave="onTabBeforeLevel">
            <el-tab-pane label="店铺资料" name="first">
                <div class="form-add-store">
                    <h3>店铺资料</h3>
                    <div class="gym-info">
                        <div class="app-form-item">
                            <label>店铺名称</label>
                            <input v-model="formGYMInfo.name" type="text" placeholder="请输入店铺名称"
                                   autocomplete="false"
                            >
                        </div>
                        <div class="app-form-item">
                            <label>联系电话</label>
                            <input v-model="formGYMInfo.phone" autocomplete="false" type="text"
                                   placeholder="联系电话"
                            >
                        </div>
                        <div class="app-form-item">
                            <label>所在城市</label>
                            <input v-model="formGYMInfo.city" autocomplete="false" type="text"
                                   placeholder="所在城市"
                            >
                        </div>
                        <div class="app-form-item">
                            <label>标签</label>
                            <input v-model="formGYMInfo.label" autocomplete="false" type="text"
                                   placeholder="请输入标签，用空格隔开"
                            >
                        </div>
                        <div class="app-form-item gym-info-address">
                            <label>店铺地址</label>
                            <input v-model="formGYMInfo.address" autocomplete="false" type="text"
                                   placeholder="如：浙江省杭州市西湖区xx街道118号"
                            >
                        </div>
                        <div class="form-upload-img-item">
                            <label>
                                <h6>店铺logo</h6>
                                <p>请尽量保证图片是正方形， 建议上传尺寸80*80像素， 大小不超过3M。</p>
                            </label>
                            <upload-img v-model="formGYMInfo.logo_url" @error="onUploadImgError" />
                        </div>
                        <div class="form-upload-img-item">
                            <label>
                                <h6>小程序二维码</h6>
                            </label>
                            <upload-img v-model="formGYMInfo.mini_program_code_url" @error="onUploadImgError" />
                        </div>
                        <div class="form-upload-img-item img-show">
                            <label>
                                <h6>展示图</h6>
                                <p>请上传店铺相关图片进行展示，每张图片大小不超过3M</p>
                            </label>
                            <div class="img-show-list">
                                <img-list v-model="formGYMInfo.display_img_urls" />
                                <upload-img :one-image="false" @error="onUploadImgError" @addimg="onAddDisplayImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="教练信息" name="second">
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="课程活动" name="third">
                <form-class-info :gym-id="gymId" />
            </el-tab-pane>
            <el-tab-pane label="账号设定" name="fourth">
                <div v-if="activeName=='fourth'" class="form-add-account">
                    <h3>
                        账号设定
                    </h3>
                    <div class="app-form-item">
                        <label>负责人</label>
                        <input v-model="formAccountInfo.name" autocomplete="false" type="text"
                               placeholder="请输入负责人名称"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>密码</label>
                        <input v-model="formAccountInfo.password" autocomplete="false" type="password"
                               placeholder="请输入6-18位密码"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>手机号</label>
                        <input v-model="formAccountInfo.phone" autocomplete="false" type="text"
                               placeholder="请输入手机号"
                        >
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <button class="btn-close-dialog-form-add-edit-gym" @click="onClose">
            X
        </button>
        <div class="dialog-footer">
            <button class="btn-quit" @click="onClose">
                取消
            </button>
            <button class="btn-next" @click="onNext">
                {{ activeName=='fourth'?'保存':'下一步' }}
            </button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import UploadImg from './UploadImg.vue';
import ImgList from './ImgList.vue';
import AppButton from './AppButton.vue';
import FormClassInfo from './FormClassInfo.vue';
import { ADD_GYM, ADD_COASH, ADD_GYM_ADMIN, GET_OSS_SESSION, GET_GYM_INFO, UPDATE_GYM
    , GET_CLASS_INFO_LIST_BY_GYMID, UPDATE_GYM_ADMIN_USER, GET_GYM_ADMIN_USER_GET_BIND } from
    '../store/action_type';
import { md5 } from '../utils/crypto';
export default {
    components: {
        UploadImg,
        AppButton,
        ImgList,
        FormClassInfo
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        editGymId: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            activeName: 'first',
            formGYMInfo: {
                name: '',
                city: '',
                address: '',
                label: '',
                phone: '',
                logo_url: '',
                display_img_urls: [],
                mini_program_code_url: ''
            },
            formCoachInfo: {
                name: '',
                label: ''
            },
            formAccountInfo: {
                name: '',
                phone: '',
                password: ''
            },
            gymId: null
        };
    },
    computed: {
        ...mapState(['classInfoListSelected', 'gymAdminInfoSelected'])
    },
    async created () {
        this.$store.dispatch(GET_OSS_SESSION);
        if (this.isEdit) {
            this.gymId = this.editGymId;
            let result = await this.$store.dispatch(GET_GYM_INFO, {id: this.editGymId});
            if (result.success) {
                let displayImgUrls = [];
                try {
                    displayImgUrls = JSON.parse(result.data.display_img_urls);
                } catch (error) {

                }
                this.formGYMInfo = {...result.data, display_img_urls: displayImgUrls};
            }
        }
    },
    methods: {
        onTabBeforeLevel (activeName) {
            return activeName == this.activeName;
        },
        onClose () {
            this.$emit('close');
        },
        onAddDisplayImg (url) {
            this.formGYMInfo.display_img_urls = [...this.formGYMInfo.display_img_urls, url];
        },
        async onSubmitGYMInfo () {
            let result;
            if (this.isEdit) {
                result = await this.$store.dispatch(UPDATE_GYM, {
                    ...this.formGYMInfo,
                    id: this.gymId,
                    display_img_urls: JSON.stringify(this.formGYMInfo.display_img_urls)
                });
            } else {
                result = await this.$store.dispatch(ADD_GYM, {...this.formGYMInfo,
                    display_img_urls: JSON.stringify(this.formGYMInfo.display_img_urls)
                });
            }
            if (result.success) {
                this.$notify({
                    title: this.isEdit ? '编辑成功' : '添加成功',
                    type: 'success'
                });
                this.gymId = result.data.id;
            } else {
                this.$message.error(result.data);
            }
            return result;
        },
        async onNext () {
            if (this.activeName == 'first') {
                let result = await this.onSubmitGYMInfo();
                if (result.success) {
                    this.activeName = 'second';
                }
            } else if (this.activeName == 'second') {
                this.$store.dispatch(GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: this.gymId});
                this.activeName = 'third';
            } else if (this.activeName == 'third') {
                if (this.isEdit) {
                    let result = await this.$store.dispatch(GET_GYM_ADMIN_USER_GET_BIND, {gym_id: this.gymId});
                    if (result.success) {
                        this.formAccountInfo.name = result.data.name;
                        this.formAccountInfo.phone = result.data.phone;
                    }
                }
                this.activeName = 'fourth';
            } else if (this.activeName == 'fourth') {
                this.onSubmitAddAccount();
            }
        },
        async onUploadImgError (msg) {
            this.$notify.error({
                title: '图片上传失败',
                message: msg
            });
        },
        async onSubmitCoachInfo () {
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
        },
        async onSubmitAddAccount () {
            let result;
            let payload = {...this.formAccountInfo, gym_id: this.gymId};
            if (payload.password) {
                payload.password = md5(payload.password);
            } else {
                delete payload.password;
            }
            if (this.isEdit) {
                payload.id = this.gymAdminInfoSelected.id;
                result = await this.$store.dispatch(UPDATE_GYM_ADMIN_USER, payload);
            } else {
                result = await this.$store.dispatch(ADD_GYM_ADMIN, payload);
            }

            if (result.success) {
                this.$notify({
                    title: this.isEdit ? '编辑成功' : '添加成功',
                    type: 'success'
                });
                this.onClose();
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

<style>
    .form-add-edit-gym{
        position: relative;
        flex: 1;
    }

    .btn-close-dialog-form-add-edit-gym{
        position: absolute;
        top:.5rem;
        right: .5rem;
        border: none;
        background: none;
        color: #ccc;
        cursor: pointer;
    }
    .app-form-item.gym-info-address{
        margin: .5rem 0;
        margin-right: 0!important;
        width: 25.44rem;
        box-sizing: border-box;
    }
    .form-add-store,.form-add-coach, .form-add-account{
        padding:0 1rem;
    }
    .form-add-coach .form-btn-add{
        position: absolute;
        right: 1rem;
    }
    .app-form-item.form-class-info-content{
        margin-top:.5rem;
        margin-right: 0!important;
        width: 25rem;
        height: 5.56rem;
        box-sizing: border-box;
    }
    .dialog-footer{
        padding: .3rem 1rem;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        text-align: right;
    }
    .dialog-footer >button{
        width:2.78rem;
        height:1.11rem;
        margin-left: .3rem;
        background:rgba(255,192,1,1);
        border-radius:0.06rem;
        border: none;
        cursor: pointer;
    }
    .dialog-footer .btn-quit{
        width:2.22rem;
        height:1.11rem;
        border-radius:0.06rem;
        border:1px solid rgba(192,199,216,1);
        background: #fff;
    }

    .form-upload-img-item{
        display:  inline-flex;
        flex-direction:  row;
        width:12.22rem;
        height:2.94rem;
        padding: .33rem;
        margin-bottom: .33rem;
        box-sizing: border-box;
        border: 1px solid rgba(225, 227, 232, 1);
    }
    .form-upload-img-item   label{
        flex:1;
    }
    .form-upload-img-item:nth-of-type(2n){
        margin-right: .83rem;
    }
    .form-upload-img-item p,.form-upload-img-item h6{
        margin: 0;
        padding: 0;
        color: #5B637E;
    }
    .form-upload-img-item p{
        font-size: 14px;
    }
    .form-upload-img-item h6{
        font-size: 16px;
        margin-bottom: .39rem;
    }
    .form-upload-img-item.img-show{
        width: 25.28rem;
        height: 4rem;
        margin-right: 0;
        display: flex;
        flex-direction: column;
    }
    .form-upload-img-item.img-show label{
        display: flex;
    }
    .form-upload-img-item.img-show h6{
        margin-bottom: 0;
        margin-right: .33rem;
    }
    .img-show-list {
        display: flex;
    }
</style>
