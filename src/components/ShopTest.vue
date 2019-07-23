<template>
    <div class="content">
        <div class="table ttbox">
            <div class="crumbs">
                <div class="oo">
                    试用管理
                </div>
                <div class="celllist">
                    试用列表
                    <!-- <div @click="yhhy" class="addccb">
                                        添加传感器
                                        <svg width="14px" height="14px" class="svgg">
                                            <line x1="7" y1="0" x2="7" y2="14"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="0" y1="7" x2="14" y2="7"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </div> -->
                </div>
            </div>
            <div class="container senbox">
                <!-- <div class="handle-box">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                    <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                        <el-option key="1" label="广东省" value="广东省"></el-option>
                        <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    </el-select>
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button type="primary" icon="search" @click="tadd">添加手环</el-button>
                </div> -->
                <el-table ref="multipleTable" :data="tableData" border
                        class="table" @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="id" label="编号"
                    width=100
                    />
                    <el-table-column prop="name" label="场馆名称">
                        <!-- <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].id }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="city" label="所在城市"
                                    style="color: red !important"
                    />
                    <el-table-column prop="contact" label="称呼">
                        <!-- <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].transducer_num==''?'-': tableData[scope.$index].transducer_num}}
                            </div>
                        </template> -->
                    </el-table-column>
                    <!-- <el-table-column prop="status" label="状态" width="150">
                        <template slot-scope="scope">
                            <div type="text" :class="tableData[scope.$index].status == 1?'aa':'bb'">
                                {{ tableData[scope.$index].status == 1?'使用中':'空闲' }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="phone" label="手机" width=150>
                        <!-- <template slot-scope="sope">
                            <div type="text"c>
                                {{ tableData[scope.$index].phone==''?'-': tableData[scope.$index].relation_device }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="createDate" label="提交日期" width=200>
                        <template slot-scope="scope">
                            <div type="text">
                                <!-- {{ getDd(parseInt(new Date(tableData[scope.$index].createDate).getTime())) }} -->
                                {{ getDd(new Date(parseInt(new Date(tableData[scope.$index].createDate).getTime()))) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column label="操作" align="center"
                                    prop="status"
                                    width=150
                    >
                        <template slot-scope="scope">
                            <div class="cc" type="text" @click="handleEdit(scope.$index, scope.row, tableData[scope.$index].id)">
                                {{ tableData[scope.$index].status==0?'编辑':'编辑' }}
                            </div>
                            <!-- <div :class="tableData[scope.$index].status == 0?'ee':'ee'" type="text" class="red" @click="handleDelete(scope.$index, scope.row, tableData[scope.$index].id)">删除</div> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div> -->
            </div>
            <!-- 编辑弹出框 -->
            <div class="bindlog" v-if="editVisible">
                <div class="bindbox">
                    <div class="bdup">
                        <div>编辑
                            <span></span>
                            <span @click="editVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                    <line x1="10" y1="0" x2="0" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="bdmd">
                        <div class="bmma">
                            <div class="bdta bdtb">
                                <span class="hnha">场馆名称</span>
                                <input class="inuu" type="text" v-model="form.kta" placeholder="请输入场馆名称">
                            </div>
                            <div class="bdta bdtb">
                                <span class="hnha">所在城市</span>
                                <input class="inuu" type="text" v-model="form.ktb" placeholder="请输入所在城市">
                            </div>
                            <div class="bdta bdtb">
                                <span class="hnha">称呼</span>
                                <input class="inuu" type="text" v-model="form.ktc" placeholder="请输入称呼">
                            </div>
                            <div class="bdta bdtb">
                                <span class="hnha">手机</span>
                                <input class="inuu" type="text" v-model="form.ktd" placeholder="请输入手机">
                            </div>
                            <div class="bdta bdtb">
                                <span class="hnha">状态</span>
                                <div class="ddbox">
                                    <el-select v-model="form.kte" placeholder="选择状态">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bdbt">
                        <span @click="editVisible=false">取消</span>
                        <span @click="saveEdit">确定</span>
                    </div>
                </div>
            </div>
            <!-- 删除提示框 -->
            <div class="bindlog" v-if="delVisiblea">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>删除传感器
                            <span></span>
                            <span @click="delVisiblea=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                    <line x1="10" y1="0" x2="0" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd" :model="form">
                        <span class="dece"></span>
                        <div class="ubdta">是否确认删除删除传感器</div>
                        <div class="debbp">{{ form.transducer_name }}</div>
                    </div>
                    <div class="ubdbt" :model="form">
                        <span @click="delVisiblea=false">取消</span>
                        <span @click="deleteRow(form.student_count,form.uid,1)">删除传感器</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    LIST_GYM_PLAY_COACH
} from '@/store/action_type.js';
import global from '../components/Global'
// this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    name: 'basesensor',
    data () {
        return {
            localhost: 'http://bg.linkfeeling.cn',
            localhost: 'http://test.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: 'http://bg.linkfeeling.cn/api/platform/bracelet/data',
            oka: 0,
            tableData: [],
            yybox: {},
            opu: [],
            activeName: 'first',
            ttbox: [],
            shopname: '',
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisible: false,
            editVisiblep: false,
            delVisiblea: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            form: {
                aindex: '',
                user_name: '',
                date: '',
                address: '',
                id: '',
                phone_num: '',
                status: '',
                bind_time: '',
                uwb_id: '',
                apu: '',
                bpu: '',
                cpu: '',
                dpu: '',
                transducer_name: 'uwb基站',
                transducer_num: ''
            },
            idx: -1,
            actived: 0,
            items: [{
                'tab': 'itemsuwb基站',
                'tabContent': 'content1'
            },{
                'tab': 'tab2',
                'tabContent': 'content2'
            },{
                'tab': 'tab3',
                'tabContent': 'content3'
            },{
                'tab': 'tab4',
                'tabContent': 'content4'
            }],
            options: [{
                value: '待跟进',
                label: '待跟进'
                }, {
                value: '不跟进',
                label: '不跟进'
                },{
                value: '合作沟通',
                label: '合作沟通'
                }, {
                value: '现场部署',
                label: '现场部署'
                },{
                value: '部署完毕',
                label: '部署完毕'
                }
            ],
            value: '',
            olda: '',
            oldb: ''
        };
    },
    computed: {
    },
    created () {
        this.shopname = this.$route.query.inquiry;
        global.gym_name = this.$route.query.gym;
        localStorage.setItem("gym_name",this.$route.query.gym);
        this.getData();
        // this.$store.dispatch(GET_ALL_GYM_INFO);
    },
    mounted () {
    },
    updated () {
        // console.log(this.del_list);
    },
    methods: {
        islec (ok) {
            this.oka = ok
            if(ok == 0){
                this.form.transducer_name = 'uwb基站'
            }
            if(ok == 1){
                this.form.transducer_name = 'uwb子模块'
            }
            if(ok == 2){
                this.form.transducer_name = '拉力传感器'
            }
            if(ok == 3){
                this.form.transducer_name = 'hank'
            }
        },
        // 分页导航
        handleCurrentChange (val) {
            this.cur_page = val;
            this.getData();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getDd: function (no) {
            var date = no;
            var seperator1 = '-';
            var seperator2 = ':';
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var secs = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            if (hours >= 1 && hours <= 9) {
                hours = '0' + hours;
            }
            if (mins >= 0 && mins <= 9) {
                mins = '0' + mins;
            }
            if (secs >= 0 && secs <= 9) {
                secs = '0' + secs;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + hours + seperator2 + mins +
                        seperator2 + secs;
            return currentdate;
        },
        // 获取 easy-mock 的模拟数据
        // async getData () {
        //     // console.log(this);
        //     // console.log(this.$store.state.userInfo)
        //     let result = await this.$store.dispatch(LIST_GYM_PLAY_COACH, {});

        //     if (result.success) {
        //         console.log(result.data);
        //         this.tableData = result.data;
        //         // global.coaarr = this.tableData;
        //         // localStorage.setItem('coaarr', this.tableData);

        //         // console.log(this.$store.state.userInfo)
        //     } else {
        //         this.$message.error('数据获取失败');
        //     }
        // },
        getData () {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            // if (process.env.NODE_ENV === 'development') {
            //     this.url = '/ms/table/list';
            // };
            let datt = {
                // gym_name: global.gym_name || localStorage.getItem("gym_name"),
                gym_name: 'link_office',
                pageNum: 1,
                pageSize: 100
            };
            console.log(this);
            this.$axios.post(this.localhost+'/api/platform/web/application/info/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
            .then((res) => {
                console.log(res.data.data);
                var xbox = res.data.data;
                console.log(xbox);
                var aDiv = [];
                for (var i = 0; i < xbox.length; i++) {
                    // xbox[i].aindex = i + 1
                    // aDiv.push(xbox[i]);
                    if(xbox[i].status==0){
                        xbox[i].status='待跟进'
                    }
                    if(xbox[i].status==1){
                        xbox[i].status='不跟进'
                    }
                    if(xbox[i].status==2){
                        xbox[i].status='合作沟通'
                    }
                    if(xbox[i].status==3){
                        xbox[i].status='现场部署'
                    }
                    if(xbox[i].status==4){
                        xbox[i].status='部署完毕'
                    }
                }
                // aDiv.sort(function (a, b) { return b.id - a.id; });
                // console.log(aDiv);
                this.tableData = xbox;
            })
            .catch((res) => {
                console.log(res);
            });
        },
        yzy () {
            console.log('yzy');
        },
        // 添加手环请求接口
        // getadd() {
        //     let that =this;
        //     let datt = {
        //         gym_name: 'link_office',
        //         id: this.taddcellnumber,
        //         user_name: '',
        //         phone_num: '',
        //         bind_time: '',
        //         page: this.cur_page
        //         }
        //         console.log("add1")
        //     this.$axios.post('https://ll.linkfeeling.cn/api/platform/bracelet/add',JSON.stringify(datt))
        //     .then((res) => {
        //         console.log(res.data.code)
        //         if(res.data.code == 200){
        //             that.getData();
        //         }else{
        //             console.log(res.data)
        //         }
        //     })
        //     .catch((res) => {
        //         console.log(res)
        //     })
        // },
        // 添加传感器请求接口
        saveadd () {
            let that = this;
            console.log(this.form.transducer_name)
            // if(this.form.bpu.length == 0){
            //     that.$message.error(`请填写编号`);
            //     return;
            // }
            // if(this.form.dpu.length == 0){
            //     that.$message.error(`请填写模块ID`);
            //     return;
            // }
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                transducer_name: this.form.transducer_name,
                transducer_id: this.form.dpu,
                transducer_num: this.form.bpu,
                relation_device: this.value,
                weight: this.form.phone_num,
                remark: this.form.cpu,
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/link/transducer/save', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisiblep = false;
                        that.$message.success(`添加传感器成功`);
                        that.getData();
                    }
                    if (res.data.code == 402) {
                        that.$message.success(`添加传感器成功`);
                        that.$message.error(res.data.message);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        //oppp
        // 绑定传感器请求接口
        getedit () {
            let that = this;
            console.log(that.opu)
            for(var i=0;i<that.opu.length;i++){
                if(that.form.kte == that.opu[i].name){
                    that.form.code = that.opu[i].code
                    break
                }
            }
            var datt = {
                name: this.form.kta,
                province: '',
                city: this.form.ktb,
                area: '',
                contact: this.form.ktc,
                phone: this.form.ktd,
                id: this.form.id,
                status: this.form.code
            };
            this.$axios.post(this.localhost + '/api/platform/web/application/info/update', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisible = false;
                        that.$message.success(`编辑传感器成功`);
                        that.getData();
                    }
                    if (res.data.code == 402) {
                        that.$message.error(res.data.message);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 解绑手环请求接口
        getfalseedit () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                phone_num: this.form.phone_num,
                unbind_time: Date.parse(new Date()),
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/bracelet/unbind', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.unBindVisible = false;
                        that.$message.success(`解绑手环成功`);
                        that.getData();
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 删除手环请求接口
        getdel () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                page: this.cur_page
            };
            console.log('del');
            this.$axios.post(this.localhost+'/api/platform/link/transducer/delete', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    if (res.data.code == 200) {
                        that.$message.success('删除成功');
                        that.tableData.splice(this.idx, 1);
                        that.delVisiblea = false;
                    } else if (res.data.code == 106) {
                        that.$message.success('请先解绑');
                        that.delVisiblea = false;
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        search () {
            this.is_search = true;
        },
        formatter (row, column) {
            return row.address;
        },
        filterTag (value, row) {
            return row.tag === value;
        },
        chickvalue () {
            console.log(this.value)
            console.log(this.valuea)
        },
        yhhy () {
            this.editVisiblep = true
            this.form.apu = ''
            this.form.bpu = ''
            this.form.cpu = ''
            this.form.dpu = ''
            this.value = ''
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page
            };
            this.$axios.post(this.localhost+'/api/web/application/info/status/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    if (res.code == 200) {
                        var opu = []
                        var oko = []
                        opu = res.data.data
                        this.opu = opu
                        console.log(opu)
                        var nim
                        for(var i=0;i<opu.length;i++){
                            nim = {}
                            nim.value = opu[i]
                            nim.label = opu[i]
                            oko.push(nim)
                        }
                        this.options = oko
                        console.log(this.options)
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        handleEdit (index, row, id) {
            let datt = {
                // gym_name: global.gym_name || localStorage.getItem("gym_name"),
                // page: this.cur_page
            };
            this.$axios.post(this.localhost+'/api/web/application/info/status/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        var opu = []
                        var oko = []
                        opu = res.data.data
                        this.opu = opu
                        console.log(opu)
                        var nim
                        for(var i=0;i<opu.length;i++){
                            nim = {}
                            nim.value = opu[i].name
                            nim.label = opu[i].name
                            oko.push(nim)
                        }
                        this.options = oko
                        console.log(this.options)
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
            let that = this;
            this.idx = index;
            this.form.id = id
            console.log(this.tableData[index])
            const item = this.tableData[index];
            this.kta = item.name
            this.ktb = item.city
            this.ktc = item.contact
            this.ktd = item.phone
            this.editVisible = true;
            this.value = item.relation_device;
            that.form = {
                id: item.id,
                name: item.name,
                city: item.city,
                contact: item.contact,
                phone: item.phone,
                createDate: item.createDate,
                status: item.status,
                kta: item.name,
                ktb: item.city,
                ktc: item.contact,
                ktd: item.phone,
                kte: item.status
            };
        },
        tadd () {
            this.taddVisible = true;
        },
        handleDelete (index, row, id) {
            this.form.id = id
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                id: item.id,
                transducer_name: item.transducer_name,
            };
            this.delVisiblea = true;
        },
        delAll () {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].id + ' ';
            }
            this.$message.error('删除了' + str);
            this.multipleSelection = [];
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        // 确定添加
        saveTadd () {
            console.log('点击添加1');
            this.getadd();
            this.taddVisible = false;
            this.$message.success(`添加第 ${this.idx + 1} 行成功`);
        },
        // 确定绑定
        saveEdit () {
            this.getedit();
        },
        // 确定解绑
        saveUn () {
            this.getfalseedit();
        },
        // 确定删除
        delyzy (cc,uid) {
            this.delVisiblea = false;
            this.delVisible = true;
        },
        deleteRow () {
            this.getdel();
        }
    }
};

</script>

<style>
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
        width: 500px;
        height: 512px;
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
    }
    .svg{
        margin: 0 auto;
    }
    .bdmd{
        height: 280px;
        width: 100%;
        box-sizing: content-box;
        padding: 40px 0 0px;
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
    .bdta{
        height: 70px;
        box-sizing: border-box;
        background:rgba(246,247,248,1);
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
    /* .bdta span:nth-of-type(2){
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
    } */
    .bdbt{
        margin-top: 70px;
        height: 70px;
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
        cursor: pointer;
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
    }
    .bdta .iucc{
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
    .ddbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        height: 0.56rem;
        display: inline-block;
    }
    .ddbox .el-input,.ddbox .el-input__inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 11.2rem;
        height: 0.56rem;
        display: inline-block;
        padding: 0;
        border: 0;
    }
    .ddbox .el-input__suffix{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-bloxk;
        width: 0.6rem;
        height: 100%;
    }
    .ddbox .el-input__suffix-inner{
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
    }
    .ddbox .el-icon-arrow-up:before{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #000;
    }
    .senbox tbody{
        overflow: scroll;
        height: 500px;
    }
    .senbox .el-table__body-wrapper, .senbox .el-table__body{
        min-height: 460px;
        width: 100%;
    }
    .bvv .el-select,.bvv .el-input__inner{
        height: 30px;
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
        min-height: 500px;
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
    .addp{
        position: absolute;
        right: 0;
        display: inline-block;
        width:200px;
        height: 20px;
        color: #000;
    }
    .container{
        border-radius: 0;
        padding: 0;
        height: 505px;
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
        left: 50%;
        transform: translateX(-50%);
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
        right: 0.3rem;
        cursor: pointer;
    }
    .content{
        background: #F6F7F8;
        height: 595px;
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
    .clearboth::after{
        content:"";
        display:block;
        clear:both;
    }
    .tab-slider{
        height:auto;
        width:400px;
        margin:50px auto;
    }
    .tab-slider .tab{
        display:flex;
        height:40px;
        line-height:40px;
        background:#ccc;
    }
    .tab-slider .tab span{
        display:block;
        width:100%;
        text-align:center;
        cursor:default;
    }
    .tab-slider .tab .active{
        background:red;
    }
    .tab-slider .tab-content{
        height:300px;
        width:400px;
        overflow:hidden;
    }
    .tab-slider .tab-content .item{
        float:left;
        height:300px;
        width:400px;
        line-height:300px;
        text-align:center;
        font-size:60px;
        background:#eee;
    }
    .tab-slider .wrapbox{
        width:2000px;
        transition: all 1s;
    }
    .bptit{
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        line-height:17px;
        text-indent: 20px;
    }
    .bnbox{
        height: 64px;
        width: 100%;
        padding-top: 11px;
        padding-bottom: 30px;
        position: relative;
    }
    .bnbox .bnca{
        display: inline-block;
        width: 30%;
        height: 20px;
        position: absolute;
        top: 0;
        left: 18px;
        text-indent: 18px;
        line-height: 20px;
    }
    .bnbox .bncb{
        display: inline-block;
        width: 30%;
        height: 20px;
        position: absolute;
        top: 0;
        left: 174px;
        text-indent: 18px;
        line-height: 20px;
    }
    .bnbox .bncc{
        display: inline-block;
        width: 30%;
        height: 20px;
        position: absolute;
        left: 328px;
        text-indent: 18px;
        top: 0;
        line-height: 20px;
    }
    .bnbox .bncd{
        display: inline-block;
        width: 30%;
        height: 20px;
        position: absolute;
        top: 59px;
        left: 18px;
        text-indent: 18px;
        line-height: 20px;
    }
    .svgy{
        position: absolute;
        left: 2px;
        top: 5px;
    }
    .svgz{
        position: absolute;
        left: 0;
        top: 3px
    }
    .addccb{
        width: 3.5rem;
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
    .svgg{
        position: absolute;
        top: 0.275rem;
        left: 0.475rem;
    }
    .ddbox{
        width: 11.2rem;
        height: 0.56rem;
        position: absolute;
        top: 1rem;
        right: 0.36rem;
    }
    .ddbox .el-select{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .debbp{
        padding-top: 20px;
        height: 30px;
        text-align: center;
        font-size: 20px;
    }
    .bvv{
        height: 100%;
        position: absolute;
        width: 100%;
        line-height: 25px;
        left: -17px;
    }
    .bdkk{
        width: 100%;
        height: 100%;
    }
    .ddcx{
        width: 100%;
        height: 100%;
    }
</style>
