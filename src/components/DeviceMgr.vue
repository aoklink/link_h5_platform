<template>
    <div class="content">
        <div class="table ttbox">
            <div class="crumbs">
                <div class="oo">
                    器械管理
                </div>
                <div class="celllist">
                    器械配置
                    <div class="addccb" @click="addDevice">
                        添加器械
                        <svg width="14px" height="14px" class="svgg">
                            <line x1="7" y1="0" x2="7"
                                  y2="14"
                                  style="stroke:#888EA7;stroke-width:1"
                            />
                            <line x1="0" y1="7" x2="14"
                                  y2="7"
                                  style="stroke:#888EA7;stroke-width:1"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="container"> 
                <el-table ref="multipleTable" :data="tableData" border
                          class="table" @selection-change="handleSelectionChange"
                >    <el-table-column prop="id" label="编号"
                                     style="color: red !important"
                    />
                    <el-table-column prop="device_name" label="器械名称"
                                     style="color: red !important"
                    />

                    <el-table-column prop="category" label="器械类型"
                                     style="color: red !important"
                    /> 
                    <el-table-column prop="remark" label="备注">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].remark }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center"
                                     prop="status"
                                     width="200"
                    >
                        <template slot-scope="scope">
                            <div class="cc" type="text" @click="handleEdit(scope.$index,tableData[scope.$index].id)">
                                编辑
                            </div>
                            <div class="ee" type="text" @click="handleDelete(scope.$index, scope.row, tableData[scope.$index].id)">
                                删除
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </div> 
            <!-- 添加器械 -->
            <div v-if="showEdit" class="bindlog">
                <div class="bindbox"> 
                    <div class="bdup">
                         <!-- style="position: relative; float:left; width: 100%; height: 150px; background: #eee; border:1px #000;" -->
                                            <div>
                                                {{ isAdd ? "添加器械" : "编辑器械" }}
                                                <span />
                                                <span @click="showEdit=false">
                                                    <svg width="10px" height="10px" class="svg">
                                                        <line x1="0" y1="0" x2="10"
                                                            y2="10"
                                                            style="stroke:#888EA7;stroke-width:1"
                                                        />
                                                        <line x1="10" y1="0" x2="0"
                                                            y2="10"
                                                            style="stroke:#888EA7;stroke-width:1"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                     </div> 
                <div class="bdmd" style="position: relative; float:left; width: 50%; height: 200px;">
                        <div class="subTitle">通用信息</div>
                        <div class="bdta">
                            <span class="hnha">器械选择</span>
                            <span class=""></span>
                            <div class="xcbox">
                                <el-select v-model="chooseType" placeholder="选择类型" @change="chooseDeviceFunc">
                                    <el-option
                                        v-for="item in diclist"
                                        :key="item.category"
                                        v-model="item.category"
                                        :label="item.category"
                                        :value="item.category"
                                    />
                                </el-select>
                            </div>
                            <div class="ccbox">
                                <el-select v-model="chooseDevice" placeholder="选择器械">
                                    <el-option
                                        v-for="item in devicelist"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    />
                                </el-select>
                            </div>
                        </div>
                        <div class="subTitle">内容信息</div>
                        <div class="subTitle">训练部位</div>
                        <div style="position: relative; width:100%; heigth:100px; float: left;">
                             
                            <input type="checkbox" name="check1" id="myCheck">你喜欢夏天吗?
                        </div>
                       
                        <div class="bdta bdtb">
                            <span class="hnha">备注</span>
                            <input v-model="chooseDevice" class="inuu" type="text"
                                   placeholder="请输入备注"
                            >
                        </div>
                    </div>
                    
                    <div class="bdbt" style="position: relative; float:left; width: 100%; height: 150px;">
                        <span @click="showEdit=false">取消</span>
                        <span @click="saveAdd">确定</span>
                    </div>
                </div>
            </div>  

            <!-- 删除提示框 -->
            <div v-if="showDelete" class="bindlog">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>
                            删除器械
                            <span />
                            <span @click="showDelete=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                    <line x1="10" y1="0" x2="0"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd" :model="form">
                        <span class="dece" />
                        <div class="ubdta">
                            是否确认删除器械
                        </div>
                        <div class="debbp">
                            {{ form.device_name }}
                        </div>
                    </div>
                    <div class="ubdbt" :model="form">
                        <span @click="showDelete=false">取消</span>
                        <span @click="deleteRow(form.student_count,form.uid,1)">删除器械</span>
                    </div>
                </div>
            </div>
            <!-- lll -->
            <div v-if="showDelete" class="bindlog">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>
                            删除器械
                            <span />
                            <span @click="showDelete=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                    <line x1="10" y1="0" x2="0"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd" :model="form">
                        <span class="dece" />
                        <div class="ubdta">
                            确认删除？删除后无法恢复
                        </div>
                        <div class="debbp">
                            {{ form.device_name }}
                        </div>
                    </div>
                    <div class="ubdbt" :model="form">
                        <span @click="showDelete=false">取消</span>
                        <span @click="deleteRow(form.student_count,form.uid,1)">删除器械</span>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import global from '../components/Global';
// this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    name: 'BaseXy',
    data () {
        return {
            localhost: 'http://bg.linkfeeling.cn',
            localhost: 'http://test.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: 'http://bg.linkfeeling.cn/api/platform/bracelet/data',
            tableData: [], 
            cur_page: 1,  
            showEdit: false,  
            showDelete: false,  
            currentItem: {},
            chooseType: '',
            chooseDevice: '',
            diclist: [],
            devicelist: [],
            isAdd: false
        };
    },
    computed: {
    },
    created () { 
        global.gym_name = this.$route.query.gym; 
        this.getDic();
        this.getData(); 
    },
    mounted () {
    },
    updated () {
        console.log(this.del_list);
    },
    methods: { 
        addDevice () { 
            this.devicelist = []; 
            this.isAdd = true;
            this.showEdit = true;
            console.log("aaaaaa")
        },
        chooseDeviceFunc (item) {
            this.chooseType = item;
            this.chooseDevice = '';
            for (var i = 0; i < this.diclist.length; i++) {
                if (this.diclist[i].category == item) {
                    this.devicelist = this.diclist[i].device_name;
                    break;
                }
            }
        },
        // 分页导航
        handleCurrentChange (val) {
            this.cur_page = val;
            this.getData();
        },
        getDic () { 
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/link/coordinate/dic_data', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    if (res.data.code == 200) {
                        this.diclist = res.data.data;
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 获取 easy-mock 的模拟数据
        getData () {
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page_num: this.cur_page,
                page_size: 50
            };
            this.$axios.post(this.localhost + '/api/platform/link/equipment/config/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    var data = res.data.data;
                    console.log(data);
                    data.sort(function (a, b) { return a.id - b.id; });
                    this.tableData = data;
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 添加器械请求接口
        saveAdd () {
            return;
            let that = this;
            console.log(this.form.ax.length);
            if (this.form.ax.length == 0 || this.form.ay.length == 0 || this.form.bx.length == 0 || this.form.by.length == 0 || this.form.cx.length == 0 || this.form.cy.length == 0 || this.form.dx.length == 0 || this.form.dy.length == 0) {
                that.$message.error(`请填写坐标`);
                return;
            }
            if (this.chooseType.length == 0 || this.chooseDevice.length == 0) {
                that.$message.error(`请选择类型或器械`);
                return;
            }
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                one_cdn_x: this.form.ax,
                one_cdn_y: this.form.ay,
                two_cdn_x: this.form.bx,
                two_cdn_y: this.form.by,
                thr_cdn_x: this.form.cx,
                thr_cdn_y: this.form.cy,
                four_cdn_x: this.form.dx,
                four_cdn_y: this.form.dy,
                remark: this.form.txt,
                device_category: this.chooseType,
                device_name: this.chooseDevice,
                page: this.cur_page,
                id: this.idt
            };
             this.$axios.post(this.localhost + '/api/platform/link/equipment/config/update', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.showEdit = false;
                        that.$message.success(`添加器械成功`);
                        that.getData();
                    }
                    if (res.data.code == 500) {
                        that.$message.error(`坐标格式不正确·`);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 编辑器械请求接口
        getedit () {
            console.log(this.idt);
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                one_cdn_x: this.form.ax,
                one_cdn_y: this.form.ay,
                two_cdn_x: this.form.bx,
                two_cdn_y: this.form.by,
                thr_cdn_x: this.form.cx,
                thr_cdn_y: this.form.cy,
                four_cdn_x: this.form.dx,
                four_cdn_y: this.form.dy,
                remark: this.form.txt,
                device_category: this.chooseType,
                device_name: this.chooseDevice,
                bind_time: Date.parse(new Date()),
                page: this.cur_page,
                id: this.idt
            };
            // this.$axios.post(this.localhost + '/api/platform/link/coordinate/save', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
            this.$axios.post(this.localhost + '/api/platform/link/coordinate/update', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisible = false;
                        that.$message.success(`编辑器械成功`);
                        that.getData();
                    }
                    if (res.data.data == false) {
                        that.$message.error(`坐标格式不正确·`);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        handleEdit (index, id) {
            this.isAdd = false
            this.showEdit = true;
            let that = this;
            this.idx = index;
            this.idt = id;
            const item = this.tableData[index]; 
            that.chooseType = item.device_category;
            that.chooseDeviceFunc(that.chooseType);
            that.chooseDevice = item.device_name; 
        },
        tadd () {
            this.taddVisible = true;
        },
        handleDelete (index, row, id) {
            this.idt = id;
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                device_name: item.device_name,
                id: item.id
            };
            this.showDelete = true;
        },
        delAll () {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].bracelet_id + ' ';
            }
            this.$message.error('删除了' + str);
            this.multipleSelection = [];
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        // 确定添加
        saveTadd () {
            this.getadd();
            this.taddVisible = false;
            this.$message.success(`添加第 ${this.idx + 1} 行成功`);
        }, 
        deleteRow () {
            this.getdel();
        }
    }
};

</script>

<style scoped>
    a{
        text-decoration: none;
    }
    .container .el-table thead{
        color: #5A6286;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);

    }
    .el-table th{
        background: #E9EEF6;
        margin-left: 1px;
        height: 35px;
        box-sizing: content-box;
        padding: 0;
    }
    .el-table tr{
        height: 50px;
    }
    .el-table td, .el-table th.is-leaf{
        border:1px solid rgba(198,204,220,1);
        border-left: 0;
        border-top: 0;
    }
    .el-table tr:nth-child(even){
        background: #F9FAFC;
    }
    .el-table--small td, .el-table--small th{
        padding: 5px 0;
        box-sizing: content-box !important;
    }
    .el-table--small td{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table--small th{
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        /* padding-left: 30px; */

        box-sizing: border-box;
    }
    .has-gutter tr{
        background: #E9EEF6;
    }
    .el-table__row .cell{
        position: relative;
        height: 25px;
        padding: 0;
        display: flex;
        justify-content: space-between;
        margin-left: 30px;
    }
    /* tbody tr td:nth-of-type(1) .cell{
        margin-left: 0;
    } */
    .dialog-footer{
        position: inherit;
    }
    .el-dialog__header{
        padding: 20px 30px 20px !important;
        text-align: center;
    }
    .el-dialog__title{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
    }
    .el-dialog__body{
        padding: 40px 30px 30px !important;
        box-shadow: 0px 5px 50px rgba(246,247,248,1) inset;
    }
    .bindlog{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        background: rgba(0,0,0,.2);
    }
    .bindbox{
        width: 850px;
        height: 600px;
        box-sizing: border-box;
        background: #fff;
        margin: 50px auto 0;
        padding: 0 30px 0;
    }
    .unbindbox{
        width: 500px;
        height: 300px;
        box-sizing: border-box;
        background: #fff;
        margin: 50px auto 0;
        padding: 0 30px 0;
    }
    .bdup{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        text-align: left;
        position: relative;
    }
    .ubdup{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        text-align: left;
        position: relative;
    }
    .ubdup div span:nth-of-type(1){
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 30px;
        box-sizing: border-box;
        background: #FF6464;
    }
    .bdup div span:nth-of-type(1){
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 30px;
        box-sizing: border-box;
        background: #FFC001;
    }
    .bdup div span:nth-of-type(2){
        position: absolute;
        right: -22px;
        top: 50%;
        transform: translateY(-50%);
        height: 60px;
        width: 60px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
    }
    .ubdup div span:nth-of-type(2){
        position: absolute;
        right: -22px;
        top: 50%;
        transform: translateY(-50%);
        height: 60px;
        width: 60px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
    }
    .svg{
        margin: 0 auto;
    }
    .bdmd{
        height: 280px;
        width: 100%;
        box-sizing: content-box;
        padding: 20px 0 0px;
        position: relative;
    }
    .ubdmd{
        height: 130px;
        width: 100%;
        box-sizing: content-box;
        padding: 40px 0 0px;
        position: relative;
        border-bottom: 1px solid #E5E7EB;
    }
    .bdbt{
        margin-top: 30px;
        height: 70px;
        width: 350px;
        border-top:1px solid rgba(229,231,235,1);
        position: relative;
    }
    .bdbt span:nth-of-type(1){
        box-sizing: border-box;
        width: 80px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 146px;
        font-weight:500;
        border-radius:2px;
        text-align: center;
        border:1px solid rgba(192,199,216,1);
        cursor: pointer;
    }
    .bdbt span:nth-of-type(2){
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 36px;
        background: rgba(255,192,1,1);
        font-weight:500;
        border-radius:2px;
        text-align: center;

    }
    .ubdbt{
        height: 70px;
        border-top:1px solid rgba(229,231,235,1);
        position: relative;
    }
    .ubdbt span:nth-of-type(1){
        box-sizing: border-box;
        width: 80px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 146px;
        font-weight:500;
        border-radius:2px;
        border:1px solid rgba(192,199,216,1);
        text-align: center;
        cursor: pointer;
    }
    .ubdbt span:nth-of-type(2){
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#fff;
        line-height:40px;
        top: 12px;
        right: 36px;
        background: #FF6464;
        font-weight:500;
        border-radius:2px;
        text-align: center;
        cursor: pointer;
    }
    .bdta .inuu{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        width: 200px;
    }
    .bdtb{
        background: #fff;
    }
    .bdtb input{
        outline: none;
        border: 0;
    }
    .bdtb input::-webkit-input-placeholder{
        color: #BFC4D1;
    }
    .ubdta{
        text-align: left;
        text-indent: 49px;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:22px;
    }
    .ubdtb{
        margin-top: 10px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        line-height:17px;
        text-align: left;
        text-indent: 49px;
    }
    .unce{
        position: absolute;
        top: 40px;
        width: 30px;
        height: 30px;
        background: url('../assets/unce.png') no-repeat center;
        left: 0;
    }
    .dece{
        position: absolute;
        top: 40px;
        width: 30px;
        height: 30px;
        background: url('../assets/dele.png') no-repeat center;
        left: 0;
    }
    .has-gutter tr th{
        background: #E9EEF6;
    }
    .has-gutter tr td:last-child .cell{
        padding: 0 !important;
    }
    tbody tr td:last-child .cell{
        padding: 0 !important;
        height: 25px;
        margin: 0 auto;
        width: 150px;
        box-sizing: content-box;
        padding: 0;
    }
    thead tr th:last-child .cell{
        padding: 0 !important;
    }
    .has-gutter tr th:last-of-type .cell{
        padding: 0 !important;
    }
    .el-table__header{
        width: 100% !important;
    }
    .xcbox .el-input__inner,.ccbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        height: 0.56rem;
        display: inline-block;
    }
    .xcbox .el-input,.xcbox .el-input__inner,.ccbox .el-input,.ccbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        height: 0.56rem;
        display: inline-block;
        padding: 0;
        border: 0;
    }
    .xcbox .el-input__suffix,.ccbox .el-input__suffix{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-bloxk;
        width: 0.6rem;
        height: 100%;
    }
    .xcbox .el-input__suffix-inner,.ccbox .el-input__suffix-inner{
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
    }
    .xcbox .el-icon-arrow-up:before,.ccbox .el-icon-arrow-up:before{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #000;
    }
</style>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .oo{
        width: 240px;
        height: 46px;
        background: #fff;
        text-indent: 22px;
        line-height: 46px;
        border:1px solid rgba(198,204,220,1);
        border-bottom: 0px;
        box-sizing: border-box;
        font-size: 12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
    }
    .el-breadcrumb__inner{
        width: 240px;
        height: 46px;
    }
    .table{
        min-height: 550px;
    }
    .crumbs{
        margin: 0;
    }
    .celllist{
        width: 100%;
        background: #fff;
        height: 60px;
        text-indent: 20px;
        line-height: 60px;
        box-sizing: border-box;
        border:1px solid rgba(198,204,220,1);
        font-size: 14px;
        border-bottom: 0;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        position: relative;
    }
    .container{
        border-radius: 0;
        padding: 0;
    }
    .aa{
        background: #5780FF;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        text-indent: 10px;
        letter-spacing: 2px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    .bb{
        background: #E8EAEE;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(90,98,134,1);
        letter-spacing: 2px;
        font-size: 12px;
        text-indent: 10px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
    }
    .cc{
        background: #FFC001;
        height: 0.694rem;
        width: 1.67rem;
        display: inline-block;
        color: rgba(60,68,86,1);
        font-size: 12px;
        text-align: center;
        line-height: 0.694rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        letter-spacing: 0px;
        border-radius: 0.05rem;
        position: absolute;
        left: .1rem;
    }
    .dd{
        background: #3C4456;
        height: 25px;
        width: 1.67rem;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        font-family:PingFangSC-Medium;
        border-radius: 0.05rem;
    }
    .ee{
        background: #fff;
        border: 1px solid #3C4456;
        height: 0.694rem;
        width: 1.67rem;
        letter-spacing: 2px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 0.694rem;
        font-weight:500;
        color:#3C4456;
        font-family:PingFangSC-Medium;
        position: absolute;
        right: 0.1rem;
        cursor: pointer;
    }
    .content{
        background: #F6F7F8;
        height: 670px;
    }
    .el-table--border th, .el-table__fixed-right-patch{
        background: red !important;
    }
    .has-gutter tr th .cell{
        background: red !important;
    }
    .tbody tr td:last-child .cell{
        margin: 0 auto;
        width: 150px;
        box-sizing: content-box;
        padding: 0;
        height: 26px;
    }
    .has-gutter tr td:last-child .cell{
        padding: 0 !important;
    }
    tbody tr td:last-child .cell{
        padding: 0 !important;
    }
    thead tr th:last-child .cell{
        padding: 0 !important;
    }
    .bdta{
        height: 70px;
        box-sizing: border-box;
        background:#fff;
        position: relative;
        border:1px solid rgba(225,227,232,1);
    }
    .bdta .hnha{
        position: absolute;
        height: 17px;
        line-height: 17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        top: 11px;
        left: 20px;
    }
    .hnhc{
        position: absolute;
        height: 17px;
        line-height: 17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        top: 11px;
        left: 6.28rem;
    }
    .bdta .hnhb{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        border: 0;
        outline: none;
        width: 1.8rem;
    }
    .bdta .hnhd{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 3rem;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        border: 0;
        outline: none;
        width: 1.8rem;
    }
    .bdta .hnhe{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 6.28rem;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        border: 0;
        outline: none;
        width: 1.8rem;
    }
    .bdta .hnhf{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 8.72rem;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        border: 0;
        outline: none;
        width: 1.8rem;
    }
    ::-webkit-input-placeholder {
        color: #BFC4D1;
    }
    .bdta .hnhb:focus {
        border: 0;
    }
    .xcbox{
        width: 5rem;
        height: 0.56rem;
        position: absolute;
        top: 1rem;
        left: 0.58rem;
    }
    .xcbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .xcbox .el-select,.ccbox .el-select{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .xcbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        background: yellow;
        height: 0.56rem;
        display: inline-block;
    }
    .xcbox .el-input{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem !important;
        background: yellow !important;
        height: 0.56rem !important;
        display: inline-block;
    }
    .ccbox{
        width: 5rem;
        height: 0.56rem;
        position: absolute;
        top: 1rem;
        right: 0.36rem;
    }
    .addccb{
    width: 3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #3C4456;
    color: #fff;
    position: absolute;
    right: 0.45rem;
    font-size:0.35rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    top: 0.375rem;
    text-indent: 1.173rem;
    cursor: pointer;
}
.subTitle {
    width: 3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: #3C4456;
    font-size:0.38rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    top: 0.375rem;

}
.svgg{
    position: absolute;
    top: 0.275rem;
    left: 0.475rem;
}
.hyyn{
    width: 10rem;
}
.debbp{
    padding-top: 20px;
    height: 30px;
    text-align: center;
    font-size: 20px;
}
.hnhc{
    position: absolute;
    top:11px;
    left: 225px;
}
</style>
