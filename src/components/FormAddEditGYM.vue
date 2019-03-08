<template>
    <div class="form-add-edit-gym">
        <el-tabs v-model="activeName">
            <el-tab-pane label="formGYMInfo" name="first">
                <div>
                    <h1>hello world</h1>
                    <div class="gym-info">
                        <div class="gym-info-input-item">
                            <label>name</label>
                            <input v-model="formGYMInfo.name" type="text" placeholder="name">
                        </div>
                        <div class="gym-info-input-item">
                            <label>city</label>
                            <input v-model="formGYMInfo.city" type="text" placeholder="city">
                        </div>
                        <div class="gym-info-input-item">
                            <label>address</label>
                            <input v-model="formGYMInfo.address" type="text" placeholder="address">
                        </div>
                        <div class="gym-info-input-item">
                            <label>phone</label>
                            <input v-model="formGYMInfo.phone" type="text" placeholder="phone">
                        </div>
                        <div class="gym-info-input-item">
                            <label>logoUrl</label>
                            <input v-model="formGYMInfo.logoUrl" type="text" placeholder="logoUrl">
                        </div>
                        <div class="gym-info-input-item">
                            <label>displayImgUrls</label>
                            <input v-model="formGYMInfo.displayImgUrls" type="text" placeholder="displayImgUrls">
                        </div>
                        <div class="gym-info-input-item">
                            <label>miniProgramCodeUrl</label>
                            <input v-model="formGYMInfo.miniProgramCodeUrl" type="text" placeholder="miniProgramCodeUrl">
                        </div>
                    </div>
                    <button @click="onSubmitGYMInfo">
                        submit
                    </button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="formCoachInfo" name="second">
                <div>
                    <h3>coash</h3>
                    <button @click="onSubmitCoachInfo">
                        add
                    </button>
                    <div class="gym-info-input-item">
                        <label>name</label>
                        <input v-model="formCoachInfo.name" type="text" placeholder="name">
                    </div>
                    <div class="gym-info-input-item">
                        <label>label</label>
                        <input v-model="formCoachInfo.label" type="text" placeholder="label">
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">
                角色管理
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">
                定时任务补偿
            </el-tab-pane>
        </el-tabs>
        <button class="btn-close-dialog-form-add-edit-gym" @click="onClose">
            close
        </button>
    </div>
</template>

<script>
import { ADD_GYM, ADD_COASH } from '../store/action_type';
export default {
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
            }
        };
    },
    methods: {
        onClose () {
            this.$emit('close');
        },
        async onSubmitGYMInfo () {
            let result = await this.$store.dispatch(ADD_GYM, {...this.formGYMInfo,
                logo_url: this.formGYMInfo.logoUrl,
                display_img_urls: this.formGYMInfo.displayImgUrls,
                mini_program_code_url: this.formGYMInfo.miniProgramCodeUrl
            });
            if (result.success) {
                this.$notify({
                    title: '添加成功',
                    type: 'success'
                });
            } else {
                this.$message.error(result.data);
            }
        },
        async onSubmitCoachInfo () {
            let result = await this.$store.dispatch(ADD_COASH, {...this.formCoachInfo});
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

<style>
    .form-add-edit-gym{
        position: relative;
    }
    .gym-info-input-item>*{
        display: block;
    }

    .btn-close-dialog-form-add-edit-gym{
        position: absolute;
        top:0;
        right: 0;
    }

</style>
