<template>
    <div class="management">
        <div class="management-top">
            <h3>helloworl</h3>
            <button class="btn-add-store" @click="onAdd">
                add
            </button>
        </div>
        <div>
            <el-table :data="gymInfoList" style="width: 100%">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="gymAdminUserName" prop="gymAdminUserName" />
                <el-table-column label="gymAdminUserPhone" prop="gymAdminUserPhone" />
                <el-table-column label="city" prop="city" />
                <el-table-column label="memberCount" prop="memberCount" />
                <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                        <button class="btn-management-view-detail" @click="handleViewDetail(scope.row)">
                            查看
                        </button>
                        <button class="btn-management-edit" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :key="dialogAddEditKey" :visible.sync="dialogAddEdit"
                   :show-close="false"
                   custom-class="dialog-add-edit-gym"
        >
            <form-add-edit-g-y-m @close="onClosedialogAddEdit" />
        </el-dialog>
    </div>
</template>

<script>
import FormAddEditGYM from './FormAddEditGYM.vue';
import {GET_ALL_GYM_INFO, GET_GYM_INFO} from '../store/action_type.js';
import {ADD_GYM_INFO_LIST_SELECTED} from '../store/mutation_type.js';
import {mapState} from 'vuex';

export default {
    components: {
        FormAddEditGYM
    },
    data () {
        return {
            dialogAddEdit: false,
            dialogAddEditKey: 1
        };
    },
    computed: {
        ...mapState(['gymInfoList', 'gymInfoListSelected'])
    },
    created () {
        this.$store.dispatch(GET_ALL_GYM_INFO);
    },
    methods: {
        onClosedialogAddEdit () {
            this.dialogAddEdit = false;
            this.dialogAddEditKey++;
        },
        async handleViewDetail (row) {
            if (this.gymInfoListSelected.find(item => item.id == row.id)) {
                this.$emit('addTab', row.id);
                return;
            }
            let result = await this.$store.dispatch(GET_GYM_INFO, {id: row.id});
            if (result.success) {
                let gymInfo = result.data;
                this.$store.commit(ADD_GYM_INFO_LIST_SELECTED, gymInfo);
                this.$emit('addTab', gymInfo.id);
            } else {
                this.$message.error(result.data);
            }
        },
        handleEdit (row) {

        },
        onAdd () {
            this.dialogAddEdit = true;
        }
    }
};

</script>

<style>
    .management{
        display: flex;
        flex-direction: column;
    }
    .management-top{
        position: relative;
        display: flex;
        flex-direction: row;
    }
    .management-top{
        margin: 0;
        padding: 0;
    }
    .btn-add-store{
        position: absolute;
        right: 0;
        font-size: 14px;
        border: none;
        width:3.33rem;
        height:0.97rem;
        background:rgba(60,68,86,1);
        border-radius:0.06rem;
        cursor: pointer;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .dialog-add-edit-gym{
        width:27.78rem !important;
        height:24.72rem;
        background:rgba(255,255,255,1);
        border-radius:0.06rem;
    }
    .dialog-add-edit-gym .el-dialog__header,.dialog-add-edit-gym .el-dialog__body{
        padding: 0;
    }

    .btn-management-view-detail{
        width:1.67rem;
        height:0.69rem;
        background:rgba(255,192,1,1);
        border-radius:0.06rem;
        border: none;
        cursor: pointer;
    }
    .btn-management-edit{
        margin-left: .25rem;
        width:1.67rem;
        height:0.69rem;
        border-radius:0.06rem;
        border:0.03rem solid rgba(60,68,86,1);
        cursor: pointer;
    }
</style>
