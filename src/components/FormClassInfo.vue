<template>
    <div class="form-add-activity">
        <div v-if="showAddClassForm">
            <div>
                <h3>添加课程活动</h3>
                <div>
                    <div class="app-form-item">
                        <label>课程活动名称</label>
                        <input v-model="formClassInfo.title" autocomplete="false" type="text"
                               placeholder="请输入课程活动名称"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>价格</label>
                        <input v-model="formClassInfo.price_info" autocomplete="false" type="text"
                               placeholder="请输入价格，如19.9"
                        >
                    </div>
                    <div class="app-form-item form-class-info-content">
                        <label>课程内容</label>
                        <textarea v-model="formClassInfo.content" autocomplete="false" placeholder="请输入课程内容" />
                    </div>
                </div>
                <div class="form-activity-btn-group">
                    <app-button theme="plain" size="small" @click="showAddClassForm=false">
                        取消
                    </app-button>
                    <app-button theme="grey" size="small" @click="onSubmitClassInfo">
                        {{ isUpdateClassInfo?'更新':'添加' }}
                    </app-button>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>
                课程活动列表
                <app-button custom-class="form-btn-add" theme="grey" size="medium"
                            @click="onAddClassInfo"
                >
                    点击添加
                </app-button>
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
                        prop="price_info"
                        label="价格"
                    />
                    <el-table-column
                        prop="time"
                        label="最后更新时间"
                    />
                    <el-table-column align="left" label="操作">
                        <template slot-scope="scope">
                            <app-button theme="grey" @click="editClassInfo(scope.row)">
                                编辑
                            </app-button>
                            <app-button theme="plain" @click="onOfflineClass(scope.row)">
                                下线
                            </app-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import AppButton from './AppButton.vue';
import { UPDATE_CLASS_INFO_BY_ID, ADD_CLASS_INFO } from '../store/action_type';

export default {
    components: {
        AppButton
    },
    props: {
        gymId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            formClassInfo: {
                title: '',
                price_info: '',
                content: ''
            },
            showAddClassForm: false,
            currentClassInfoIdSelected: null,
            isUpdateClassInfo: false
        };
    },
    computed: {
        ...mapState(['classInfoListSelected'])
    },
    methods: {
        async onSubmitClassInfo () {
            let result;
            if (this.isUpdateClassInfo) {
                result = await this.$store.dispatch(UPDATE_CLASS_INFO_BY_ID, {...this.formClassInfo,
                    gym_id: this.gymId
                });
            } else {
                result = await this.$store.dispatch(ADD_CLASS_INFO, {
                    ...this.formClassInfo,
                    gym_id: this.gymId
                });
            }
            if (result.success) {
                this.$notify({
                    title: this.isUpdateClassInfo ? '更新成功' : '添加成功',
                    type: 'success'
                });
                this.showAddClassForm = false;
            } else {
                this.$notify.error({
                    title: this.isUpdateClassInfo ? '更新失败' : '添加失败',
                    message: result.data
                });
            }
        },
        async onAddClassInfo () {
            this.formClassInfo = {
                title: '',
                price_info: '',
                content: ''
            };
            this.showAddClassForm = true;
            this.isUpdateClassInfo = false;
        },
        async editClassInfo (row) {
            this.formClassInfo = {...row};
            this.showAddClassForm = true;
            this.isUpdateClassInfo = true;
            this.currentClassInfoIdSelected = row.id;
        },
        async onOfflineClass (row) {
            let result = await this.$store.dispatch(UPDATE_CLASS_INFO_BY_ID, {
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
        }
    }

};
</script>

<style scoped>
    .form-add-activity .form-btn-add{
        position: absolute;
        right: 0;
    }
    .form-add-activity{
        padding: 0 1rem;
    }
    .form-add-activity h3{
        position: relative;
    }
    .form-activity-btn-group{
        margin-top: 1rem;
        text-align: center;
    }
    .form-add-activity .gym-info-input-item{
        display: flex;
    }
    .app-form-item.form-class-info-content{
        margin-top:.5rem;
        margin-right: 0!important;
        width: 25rem;
        height: 5.56rem;
        box-sizing: border-box;
    }
</style>
