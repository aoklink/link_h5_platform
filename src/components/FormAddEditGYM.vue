<template>
    <div class="form-add-edit-gym">
        <el-tabs :value="activeName" :before-leave="onTabBeforeLevel">
            <el-tab-pane label="店铺资料" name="first">
                <div class="form-add-store">
                    <h3>店铺资料</h3>
                    <div class="gym-info">
                        <div class="gym-info-input-item">
                            <label>店铺名称</label>
                            <input v-model="formGYMInfo.name" type="text" placeholder="请输入店铺名称">
                        </div>
                        <div class="gym-info-input-item">
                            <label>联系电话</label>
                            <input v-model="formGYMInfo.phone" type="text" placeholder="联系电话">
                        </div>
                        <div class="gym-info-input-item">
                            <label>所在城市</label>
                            <input v-model="formGYMInfo.city" type="text" placeholder="所在城市">
                        </div>
                        <div class="gym-info-input-item">
                            <label>标签</label>
                            <input v-model="formGYMInfo.label" type="text" placeholder="请输入标签，用空格隔开">
                        </div>
                        <div class="gym-info-input-item gym-info-address">
                            <label>店铺地址</label>
                            <input v-model="formGYMInfo.address" type="text" placeholder="如：浙江省杭州市西湖区xx街道118号">
                        </div>
                        <div class="gym-info-input-item">
                            <label>店铺logo</label>
                        </div>
                        <div class="gym-info-input-item">
                            <label>展示图</label>
                        </div>
                        <div class="gym-info-input-item">
                            <label>小程序二维码</label>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="教练信息" name="second">
                <div class="form-add-coach">
                    <h3>
                        教练信息
                        <button class="form-btn-add" @click="onSubmitCoachInfo">
                            点击添加
                        </button>
                    </h3>
                    <div class="gym-info-input-item">
                        <label>姓名</label>
                        <input v-model="formCoachInfo.name" type="text" placeholder="请输入教练姓名">
                    </div>
                    <div class="gym-info-input-item">
                        <label>标签</label>
                        <input v-model="formCoachInfo.label" type="text" placeholder="请输入标签，用空格隔开">
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="课程活动" name="third">
                <div class="form-add-activity">
                    <div v-if="showAddClassForm">
                        <div>
                            <h3>添加课程活动</h3>
                            <div>
                                <div class="gym-info-input-item">
                                    <label>课程活动名称</label>
                                    <input v-model="formClassInfo.title" type="text" placeholder="请输入课程活动名称">
                                </div>
                                <div class="gym-info-input-item">
                                    <label>价格</label>
                                    <input v-model="formClassInfo.priceInfo" type="text" placeholder="请输入价格，如19.9">
                                </div>
                                <div class="gym-info-input-item form-class-info-content">
                                    <label>课程内容</label>
                                    <textarea v-model="formClassInfo.content" placeholder="请输入课程内容" />
                                </div>
                            </div>
                            <div>
                                <button class="btn-cancel-class" @click="showAddClassForm=false">
                                    取消
                                </button>
                                <button class="btn-add-class" @click="onSubmitAddClassInfo">
                                    添加
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h3>
                            课程活动列表
                            <button class="form-btn-add" @click="onAddClassInfo">
                                点击添加
                            </button>
                        </h3>
                        <div>
                            <el-table
                                :data="classInfoListSelected"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="title"
                                    label="标题"
                                />
                                <el-table-column
                                    prop="priceInfo"
                                    label="价格"
                                />
                                <el-table-column
                                    prop="time"
                                    label="最后更新时间"
                                />
                                <el-table-column align="left" label="操作">
                                    <template slot-scope="scope">
                                        <button class="btn-class-edit">
                                            编辑
                                        </button>
                                        <button class="btn-class-offline" @click="onOfflineClass(scope.row)">
                                            下线
                                        </button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="账号设定" name="fourth">
                <div class="form-add-account">
                    <h3>
                        账号设定
                    </h3>
                    <div class="gym-info-input-item">
                        <label>负责人</label>
                        <input v-model="formAccountInfo.name" type="text" placeholder="请输入负责人名称">
                    </div>
                    <div class="gym-info-input-item">
                        <label>密码</label>
                        <input v-model="formAccountInfo.password" type="password" placeholder="请输入6-18位密码">
                    </div>
                    <div class="gym-info-input-item">
                        <label>手机号</label>
                        <input v-model="formAccountInfo.phone" type="text" placeholder="请输入手机号">
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
import { ADD_GYM, ADD_COASH, ADD_GYM_ADMIN, GET_OSS_SESSION, ADD_CLASS_INFO, GET_GYM_INFO, EDIT_GYM, EDIT_CLASS_INFO, GET_CLASS_INFO_LIST_BY_GYMID } from '../store/action_type';
export default {
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
                logoUrl: '',
                displayImgUrls: '',
                miniProgramCodeUrl: ''
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
            formClassInfo: {
                title: '',
                priceInfo: '',
                content: ''
            },
            gymId: null,
            showAddClassForm: false
        };
    },
    computed: {
        ...mapState(['classInfoListSelected'])
    },
    async created () {
        this.$store.dispatch(GET_OSS_SESSION);
        if (this.isEdit) {
            this.gymId = this.editGymId;
            let result = await this.$store.dispatch(GET_GYM_INFO, {id: this.editGymId});
            if (result.success) {
                this.formGYMInfo = {...result.data};
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
        async onSubmitGYMInfo () {
            let result;
            if (this.isEdit) {
                result = await this.$store.dispatch(EDIT_GYM, {
                    ...this.formGYMInfo,
                    logo_url: this.formGYMInfo.logoUrl,
                    display_img_urls: this.formGYMInfo.displayImgUrls,
                    mini_program_code_url: this.formGYMInfo.miniProgramCodeUrl,
                    id: this.gymId
                });
            } else {
                result = await this.$store.dispatch(ADD_GYM, {...this.formGYMInfo,
                    logo_url: this.formGYMInfo.logoUrl,
                    display_img_urls: this.formGYMInfo.displayImgUrls,
                    mini_program_code_url: this.formGYMInfo.miniProgramCodeUrl
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
                this.activeName = 'fourth';
            } else if (this.activeName == 'fourth') {
                this.onSubmitAddAccount();
            }
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
        async onSubmitAddClassInfo () {
            let result = await this.$store.dispatch(ADD_CLASS_INFO, {
                ...this.formClassInfo,
                gym_id: this.gymId,
                price_info: this.formClassInfo.priceInfo
            });
            if (result.success) {
                this.$notify({
                    title: '添加成功',
                    type: 'success'
                });
                this.showAddClassForm = false;
            } else {
                this.$notify.error({
                    title: '添加失败',
                    message: result.data
                });
            }
        },
        async onAddClassInfo () {
            this.showAddClassForm = true;
        },
        async onOfflineClass (row) {
            let result = await this.$store.dispatch(EDIT_CLASS_INFO, {
                ...row,
                state: 0
            });
            if (result.success) {
                this.$notify({
                    title: '下线成功',
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '下线失败',
                    message: result.data
                });
            }
        },
        async onSubmitAddAccount () {
            let result = await this.$store.dispatch(ADD_GYM_ADMIN, {...this.formAccountInfo, gym_id: this.gymId});
            if (result.success) {
                this.$notify({
                    title: '添加成功',
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
    .gym-info-input-item>*{
        display: block;
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
    .gym-info-input-item{
        display: inline-flex;
        width:12.22rem;
        height:1.94rem;
        border:0.01rem solid rgba(225,227,232,1);
        flex-direction: column;
    }
    .gym-info-input-item label{
        padding-left: 1rem;
        padding-top: .5rem;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        line-height:0.47rem;
    }
    .gym-info-input-item input,
    .gym-info-input-item textarea{
        padding-left: 1rem;
        padding-top:8px;
        width: 100%;
        background: transparent;
        box-sizing: border-box;
        border: none;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.56rem;
    }
    .gym-info-input-item textarea{
        flex: 1;
    }
    .gym-info-input-item.gym-info-address{
        margin: .5rem 0;
        margin-right: 0!important;
        width: 25.44rem;
        box-sizing: border-box;
    }
    .gym-info-input-item textarea::placeholder,
    .gym-info-input-item input::placeholder{
        color:rgba(191,196,209,1);
    }
    .gym-info-input-item textarea:focus,
    .gym-info-input-item input:focus{
        outline: none;
    }
    .form-btn-add{
        width:3.33rem;
        height:0.83rem;
        background:rgba(60,68,86,1);
        border-radius:0.11rem;
        color: white;
        border: none;
        cursor: pointer;
    }
    .form-add-store,.form-add-coach, .form-add-account{
        padding:0 1rem;
    }
    .form-add-coach .gym-info-input-item:nth-of-type(2n-1),
    .form-add-store .gym-info-input-item:nth-of-type(2n-1),
    .form-add-account .gym-info-input-item:nth-of-type(2n-1){
        margin-right: 1rem;
    }
    .form-add-coach .form-btn-add{
        position: absolute;
        right: 1rem;
    }
    .form-add-activity{
        padding: 0 1rem;
    }
    .form-add-activity h3{
        position: relative;
    }
    .form-add-activity .form-btn-add{
        position: absolute;
        right: 0;
    }
    .form-add-activity .btn-cancel-class,
    .form-add-activity .btn-add-class{
        position: relative;
        margin-top: 1rem;
        margin-left: .5rem;
        width:3.33rem;
        line-height:0.83rem;
        border-radius:0.11rem;
        border: 1px solid rgba(192,199,216,1);
        background: none;
    }
    .form-add-activity .btn-add-class{
        background:rgba(60,68,86,1);
        color: #fff;
    }
    .form-add-activity .gym-info-input-item{
        display: flex;
    }
    .form-class-info-content{
        margin-top:.5rem;
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
    .btn-class-edit{
        width:1.67rem;
        height:0.69rem;
        background:rgba(60,68,86,1);
        border-radius:0.06rem;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    .btn-class-offline{
        margin-left: .25rem;
        width:1.67rem;
        height:0.69rem;
        border-radius:0.06rem;
        background: none;
        border:0.03rem solid rgba(60,68,86,1);
        cursor: pointer;
    }
</style>
