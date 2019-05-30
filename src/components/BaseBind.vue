<template>
    <div class="content">
        <div class="table ttbox">
            <div class="crumbs">
                <div class="oo">
                    {{shopname}}手环管理
                </div>
                <div class="celllist">
                    {{shopname}}手环列表
                    <div @click="yhhy" class="addccb">
                                        添加手环
                                        <svg width="14px" height="14px" class="svgg">
                                            <line x1="7" y1="0" x2="7" y2="14"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="0" y1="7" x2="14" y2="7"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </div>
                </div>
            </div>
            <div class="container">
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
                <el-table ref="multipleTable" :data="data" border
                        class="table" @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="id" label="手环编号" 
                                    style="color: red !important"
                    />
                    <el-table-column prop="bracelet_id" label="手环ID"
                                    style="color: red !important"
                    />
                    <el-table-column prop="uwb_id" label="uwb子模块ID"
                                    style="color: red !important"
                    />
                    <el-table-column prop="electric" label="电量">
                        <template slot-scope="scope">
                            <div type="text" >
                                {{ tableData[scope.$index].electric }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" padding="0"
                                    prop="status"
                    >
                        <template slot-scope="scope">
                            <div class="cc" type="text" @click="handleEdit(scope.$index, scope.row)">
                                {{ tableData[scope.$index].status==0?'编辑':'编辑' }}
                            </div>
                            <div :class="tableData[scope.$index].status == 0?'ee':'ee'" type="text" class="red" @click="handleDelete(scope.$index, scope.row)">删除</div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div> -->
            </div>

            <!-- 解绑弹出框 -->
            <!-- <el-dialog title="解除绑定" :visible.sync="unBindVisible" width="500px"> -->
                <!-- <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <div v-model="form.bracelet_id">
                            {{ form.bracelet_id }}
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="unBindVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUn">确 定</el-button>
                </span>
            </el-dialog> -->
            <div class="bindlog" v-if="unBindVisible">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>解除绑定
                            <span></span>
                            <span @click="unBindVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                    <line x1="10" y1="0" x2="0" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd">
                        <span class="unce"></span>
                        <div class="ubdta">是否确认解除手环绑定？</div>
                        <div class="ubdtb">手环解除绑定后，将结束本次运动并生成运动报告</div>
                    </div>
                    <div class="ubdbt">
                        <span @click="unBindVisible=false">取消</span>
                        <span @click="saveUn">解除绑定</span>
                    </div>
                </div>
            </div>

            <!-- 编辑弹出框 -->
            <div class="bindlog" v-if="editVisible">
                <div class="bindbox">
                    <div class="bdup">
                        <div>手环编辑
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
                        <div class="bdta bdtb">
                            <span class="icuu">手环ID</span>
                            <input type="text" v-model="form.bracelet_id" placeholder="请输入手环编号">
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">Uwb子模块ID</span>
                            <input type="text" v-model="form.uwb_id" placeholder="请输入会员手机号">
                        </div>
                    </div>
                    <div class="bdbt">
                        <span @click="editVisible=false">取消</span>
                        <span @click="saveEdit">确定</span>
                    </div>
                </div>
            </div>
            <!-- 添加手环 -->
            <div class="bindlog" v-if="editVisiblep">
                <div class="bindbox">
                    <div class="bdup">
                        <div>手环添加
                            <span></span>
                            <span @click="editVisiblep=false">
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
                        <div class="bdta bdtb">
                            <span class="icuu">手环ID</span>
                            <input type="text" v-model="form.bbid" placeholder="请输入手环ID">
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">Uwb子模块编号</span>
                            <input type="text" v-model="form.uwb_id" placeholder="请输入编号">
                        </div>
                    </div>
                    <div class="bdbt">
                        <span @click="editVisiblep=false">取消</span>
                        <span @click="saveAdd">确定</span>
                    </div>
                </div>
            </div>
            <!-- 删除提示框 -->
            <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px"
                    center
            >
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <div v-model="form.bracelet_id">
                            {{ form.bracelet_id }}
                        </div>
                    </el-form-item>
                </el-form>
                <div class="del-dialog-cnt">
                    删除不可恢复，是否确定删除？
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow">确 定</el-button>
                </span>
            </el-dialog> -->
            <div class="bindlog" v-if="delVisiblea">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>删除手环
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
                        <div class="ubdta">是否确认删除手环</div>
                        <div class="debbp">{{ form.bracelet_id }}</div>
                    </div>
                    <div class="ubdbt" :model="form">
                        <span @click="delVisiblea=false">取消</span>
                        <span @click="deleteRow(form.student_count,form.uid,1)">删除手环</span>
                    </div>
                </div>
            </div>
            <!-- lll -->
            <div class="bindlog" v-if="delVisible">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>删除手环
                            <span></span>
                            <span @click="delVisible=false">
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
                        <div class="ubdta">确认删除？删除后无法恢复</div>
                        <div class="debbp">{{ form.bracelet_id }}</div>
                    </div>
                    <div class="ubdbt" :model="form">
                        <span @click="delVisible=false">取消</span>
                        <span @click="deleteRow(form.student_count,form.uid,1)">删除手环</span>
                    </div>
                </div>
            </div>
            <!-- <div class="bindlog" v-if="delVisible">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>删除手环
                            <span></span>
                            <span @click="delVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                    <line x1="10" y1="0" x2="0" y2="10"
            style="stroke:#888EA7;stroke-width:1"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd">
                        <span class="dece"></span>
                        <div class="ubdta">是否确认删除手环</div>
                    </div>
                    <div class="ubdbt">
                        <span @click="delVisible=false">取消</span>
                        <span @click="deleteRow">删除手环</span>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import global from '../components/Global'
// this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    name: 'Basebind',
    data () {
        return {
            // localhost: 'http://bg.linkfeeling.cn',
            localhost: 'http://test.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: 'http://ll.linkfeeling.cn/api/platform/bracelet/data',
            tableData: [],
            yybox: {},
            ttbox: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisible: false,
            editVisiblep: false,
            unBindVisible: false,
            taddVisible: false,
            delVisiblea: false,
            delVisible: false,
            taddcellnumber: '',
            old_bracelet_id: '',
            old_id: '',
            form: {
                user_name: '',
                date: '',
                address: '',
                bracelet_id: '',
                phone_num: '',
                status: '',
                bind_time: '',
                id: '',
                uwb_id: '',
                bbid: ''
            },
            idx: -1
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.bracelet_id === this.del_list[i].bracelet_id) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    console.log(d);
                    if (d.bracelet_id.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.shopname = this.$route.query.inquiry;
        global.gym_name = this.$route.query.gym;
        localStorage.setItem("gym_name",this.$route.query.gym);
        this.getData();
    },
    mounted () {

    },
    updated () {
        console.log(this.del_list);
    },
    methods: {
        // 分页导航
        handleCurrentChange (val) {
            this.cur_page = val;
            this.getData();
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
        getData () {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            // if (process.env.NODE_ENV === 'development') {
            //     this.url = '/ms/table/list';
            // };
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page,
                page_size: 50
            };
            console.log(this);
            this.$axios.post(this.localhost+'/api/platform/link/gym_bracelet/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    console.log(res.data.data);
                    var xbox = res.data.data;
                    console.log(xbox);
                    var aDiv = [];
                    for (var i = 0; i < xbox.length; i++) {
                        aDiv.push(xbox[i]);
                    }
                    aDiv.sort(function (a, b) { return a.id - b.id; });
                    console.log(aDiv);
                    this.tableData = aDiv;
                    console.log(this.tableData.filter((d) => {
                        let is_del = false;
                        for (let i = 0; i < this.del_list.length; i++) {
                            if (d.bracelet_id === this.del_list[i].bracelet_id) {
                                is_del = true;
                                break;
                            }
                        }
                        if (!is_del) {
                            console.log(d);
                            if (d.bracelet_id.indexOf(this.select_cate) > -1) {
                                return d;
                            }
                        }
                    }));
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
        //         bracelet_id: this.taddcellnumber,
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
        // 添加手环请求接口
        saveAdd () {
            let that = this;
            if(this.form.bbid.length == 0){
                that.$message.error(`手环ID不能为空`);
                return;
            }
            if(this.form.uwb_id.length == 0){
                that.$message.error(`uwb编号不能为空`);
                return;
            }
            console.log(that.tableData)
            // for(var i=0;i<that.tableData.length;i++){
            //     if(that.form.phone_num == that.tableData[i].phone_num){
            //         that.$message.error(`该手机号已绑定手环,请先解绑`);
            //         return
            //     }
            // }
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                bracelet_id: this.form.bbid,
                uwb_id: this.form.uwb_id,
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/bracelet/add', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisiblep = false;
                        that.$message.success(`添加手环成功`);
                        that.getData();
                    }
                    if (res.data.code == 101) {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 绑定手环请求接口
        getedit () {
            let that = this;
            if(this.form.bracelet_id.length == 0){
                that.$message.error(`手环ID不能为空`);
                return;
            }
            console.log(that.tableData)
            // for(var i=0;i<that.tableData.length;i++){
            //     if(that.form.phone_num == that.tableData[i].phone_num){
            //         that.$message.error(`该手机号已绑定手环,请先解绑`);
            //         return
            //     }
            // }
            if(this.form.bracelet_id == this.old_bracelet_id && this.old_uuid == this.form.uwb_id){
                that.$message.error(`该手环ID与Uwb子模块ID信息未发生改变`);
                return;
            }
            if(this.form.bracelet_id != this.old_bracelet_id && this.old_uuid != this.form.uwb_id){
                var datt = {
                    gym_name: global.gym_name || localStorage.getItem("gym_name"),
                    bracelet_id: this.form.bracelet_id,
                    old_bracelet_id: this.old_bracelet_id,
                    uwb_id: this.form.uwb_id,
                    bind_time: Date.parse(new Date()),
                    page: this.cur_page
                }
            }
            if(this.form.bracelet_id != this.old_bracelet_id && this.old_uuid == this.form.uwb_id){
                var datt = {
                    gym_name: global.gym_name || localStorage.getItem("gym_name"),
                    bracelet_id: this.form.bracelet_id,
                    old_bracelet_id: this.old_bracelet_id,
                    bind_time: Date.parse(new Date()),
                    page: this.cur_page
                }
            }
            if(this.form.bracelet_id == this.old_bracelet_id && this.old_uuid != this.form.uwb_id){
                var datt = {
                    gym_name: global.gym_name || localStorage.getItem("gym_name"),
                    old_bracelet_id: this.old_bracelet_id,
                    uwb_id: this.form.uwb_id,
                    bind_time: Date.parse(new Date()),
                    page: this.cur_page
                }
            }
            this.$axios.post(this.localhost + '/api/platform/link/bracelet/update', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisible = false;
                        that.$message.success(`编辑手环成功`);
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
                bracelet_id: this.form.bracelet_id,
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
                bracelet_id: this.form.bracelet_id,
                page: this.cur_page
            };
            console.log('del');
            this.$axios.post(this.localhost+'/api/platform/bracelet/delete', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
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
        yhhy () {
            this.editVisiblep = true;
            this.form.uwb_id = '';
            this.form.bbid = '';
        },
        handleEdit (index, row) {
            let that = this;
            this.idx = index;
            const item = this.tableData[index];
            this.old_bracelet_id = this.tableData[index].bracelet_id;
            this.old_id = this.tableData[index].id
            this.old_uuid = this.tableData[index].uwb_id
            this.editVisible = true;
            that.form = {
                bracelet_id: item.bracelet_id,
                id: item.id,
                uwb_id: item.uwb_id,
                user_name: item.user_name,
                date: item.date,
                address: item.address,
                phone_num: item.phone_num,
                status: item.status,
                bind_time: Date.parse(new Date())
            }
        },
        tadd () {
            this.taddVisible = true;
        },
        handleDelete (index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                bracelet_id: item.bracelet_id,
                id: item.id,
            };
            this.delVisiblea = true;
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
        delyzy (cc,uid) {
            this.delVisiblea = false;
            this.delVisible = true;
        },
        // 确定删除
        deleteRow () {
            this.getdel();
        }
    }
};

</script>

<style>
    .el-table th>.cell{
        padding-left: 0.833rem;
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
        padding-left: 30px;

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
    .ttbox .el-table th:nth-of-type(1){
        text-indent: 10px;
    }
    .bbox .el-table td.is-center,.bbox .el-table th.is-center{
        text-align: center;
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
        height: 482px;
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
    .bdta .icuu{
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
    .bdta span:nth-of-type(2){
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
    }
    .bdbt{
        margin-top: 30px;
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
    .bdta input{
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
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(60,68,86,1);
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        letter-spacing: 2px;
        margin: 0 auto;
        border-radius: 0.05rem;
        position: absolute;
        left: 0;
    }
    .dd{
        background: #3C4456;
        height: 25px;
        width: 60px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        font-family:PingFangSC-Medium;
        margin: 0 auto;
        border-radius: 0.05rem;
    }
    .ee{
        background: #fff;
        border: 1px solid #3C4456;
        height: 25px;
        width: 60px;
        letter-spacing: 2px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        color:#3C4456;
        font-family:PingFangSC-Medium;
        position: absolute;
        right: 0%;
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
    .svgg{
        position: absolute;
        top: 0.275rem;
        left: 0.475rem;
    }
    .debbp{
        padding-top: 20px;
        height: 30px;
        text-align: center;
        font-size: 20px;
    }
</style>
