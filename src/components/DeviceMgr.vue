<template>
  <div class="content">
    <div class="table ttbox">
      <div class="crumbs">
        <div class="oo">器械管理</div>
        <div class="celllist">
          器械配置
          <div class="addccb" @click="showAddDeviceView">
            添加器械
            <svg width="14px" height="14px" class="svgg">
              <line x1="7" y1="0" x2="7" y2="14" style="stroke:#888EA7;stroke-width:1" />
              <line x1="0" y1="7" x2="14" y2="7" style="stroke:#888EA7;stroke-width:1" />
            </svg>
          </div>
        </div>
      </div>
      <div class="container">
        <el-table ref="multipleTable" :data="learnList" border class="table">
          <el-table-column prop="number" label="编号" style="color: red !important" />
          <el-table-column prop="device_name" label="器械名称" style="color: red !important" />

          <el-table-column prop="category" label="器械类型" style="color: red !important" />
          <el-table-column prop="code" label="字典码">
            <template slot-scope="scope">
              <div type="text">{{ learnList[scope.$index].code }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" prop="status" width="200">
            <template slot-scope="scope">
              <div
                class="cc"
                type="text"
                @click="editAction(scope.$index,learnList[scope.$index].id)"
              >{{ learnList[scope.$index].count==0?"添加教程":"编辑教程" }}</div>
              <!-- <div
                class="ee"
                type="text"
                @click="deleteAction(scope.$index, scope.row, learnList[scope.$index].id)"
              >删除</div>-->
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="1000"
          ></el-pagination>
        </div>-->
      </div>
      <!-- 添加器械 -->
      <div v-if="showAdd" class="bindlog">
        <div class="addbox">
          <div class="addbox-head">
            <div>
              添加器械
              <span></span>
              <span @click="showAdd=false">
                <svg width="10px" height="10px" class="svg">
                  <line x1="0" y1="0" x2="10" y2="10" style="stroke:#888EA7;stroke-width:1" />
                  <line x1="10" y1="0" x2="0" y2="10" style="stroke:#888EA7;stroke-width:1" />
                </svg>
              </span>
            </div>
          </div>
          <div class="addbox-content">
            <div class="addbox-content-item">
              <div>器械类型</div>
              <div class>
                <el-select v-model="chooseType" placeholder="选择类型">
                  <el-option
                    v-for="item in deviceList"
                    :key="item.category"
                    v-model="item.category"
                    :label="item.category"
                    :value="item.category"
                  />
                </el-select>
              </div>
              <div class>器械名称</div>
              <div class>
                <input
                  type="text"
                  v-model="chooseDevice"
                  style="height:30px; width: 90%;"
                  placeholder="请输入器械名称"
                />
              </div>
            </div>
          </div>
          <div class="addbox-footer">
            <span @click="showAdd=false">取消</span>
            <span @click="addDeviceAction">添加</span>
          </div>
        </div>
      </div>

      <!-- 添加、编辑教程 -->
      <div v-if="showEdit" class="bindlog">
        <div class="bindbox">
          <div class="bdup">
            <!-- style="position: relative; float:left; width: 100%; height: 150px; background: #eee; border:1px #000;" -->
            <div>
              {{ isAdd ? "添加器械" : "编辑器械" }}
              <span />
              <span @click="showEdit=false">
                <svg width="10px" height="10px" class="svg">
                  <line x1="0" y1="0" x2="10" y2="10" style="stroke:#888EA7;stroke-width:1" />
                  <line x1="10" y1="0" x2="0" y2="10" style="stroke:#888EA7;stroke-width:1" />
                </svg>
              </span>
            </div>
          </div>

          <div class="bdmd">
            <div class>通用信息</div>
            <div class="bdta" style="border:0px;">
              <div class="chooseDevice">
                <span class="hnha">器械类型</span>
                <div class="xcbox">
                  <span class>{{chooseType}}</span>
                  <!-- <el-select
                    v-model="chooseType"
                    placeholder="选择类型"
                    @change="chooseTypeFunc"
                    v-bind:disabled="!isAdd"
                  >
                    <el-option
                      v-for="item in deviceList"
                      :key="item.category"
                      v-model="item.category"
                      :label="item.category"
                      :value="item.category"
                    />
                  </el-select>-->
                </div>
              </div>
              <div class="chooseDevice">
                <span class="hnha">器械名称</span>
                <div class="xcbox">
                  <span class>{{chooseDevice}}</span>
                  <!-- <el-select
                    v-model="chooseDevice"
                    placeholder="选择器械"
                    v-bind:disabled="!isAdd"
                    @change="chooseDeviceFunc"
                  >
                    <el-option v-for="item in devicelist" :key="item" :label="item" :value="item" />
                  </el-select>-->
                </div>
              </div>
            </div>
            <span class>内容信息</span>
            <div v-for="action in details" class="actionContent">
              <div class="addContent">
                <div
                  style=" position: absolute;  right: 0px; width: 30px; height: 30px; top: 20px;"
                >
                  <img
                    style="width: 100%; cursor: pointer;"
                    src="../assets/dele.png"
                    @click="delActionName(action)"
                  />
                </div>
                <div class="addContentLeft">
                  <span class>训练部位</span>
                  <template>
                    <el-checkbox-group v-model="action.parts">
                      <el-checkbox
                        v-for="(item, index) in partlist"
                        :key="index"
                        :label="item"
                        @change="chooseItem(action, item)"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </template>
                  <div class="bordered" style="height:70px">
                    <span class>动作名称</span>
                    <input
                      type="text"
                      v-model="action.type"
                      style="height:30px; width: 90%; "
                      placeholder="请输入动作名称"
                    />
                  </div>
                  <div class="bordered" style="height:100px">
                    <span class>锻炼建议</span>
                    <textarea
                      type="text"
                      v-model="action.recom_text"
                      style="height:70px; width: 100%;  border: 0px; "
                      placeholder="请输入锻炼建议"
                    />
                  </div>
                  <div class="bordered" style="height:110px">
                    <span class>恢复建议</span>
                    <textarea
                      type="text"
                      v-model="action.recover_text"
                      style="height:80px; width: 100%; border: 0px;"
                      placeholder="请输入恢复建议"
                    />
                  </div>
                </div>
                <div class="addContentRight" v-for="video in action.video">
                  <span class>视频封面</span>
                  <upload-img v-model="video.video_pic" @error="onUploadImgError" />
                  <span class="pic-delete" @click="delPicture(video)" v-if="video.video_pic">删除图片</span>
                  <div>{{action.video_url}}</div>
                  <div style="position: relative;">
                    <div class="bordered videoUrl">
                      视频标题 |
                      <input type="text" v-model="video.video_title" />
                    </div>
                    <div class="bordered videoUrl">
                      视频地址 |
                      <input type="text" v-model="video.video_url" />
                    </div>
                    <div class="bordered videoUrl">
                      备注信息 |
                      <input type="text" v-model="action.remark" />
                    </div>
                  </div>
                </div>
                <div
                  style="position:absolute; width: 100%; height: 5px;  bottom: 50px; right:0px;
                    border-top: 1px dashed rgba(229, 231, 235, 1);"
                ></div>
              </div>
            </div>
          </div>
          <div class="bdbt" style="float:left; width: 100%; height: 80px; padding: 20px;">
            <span @click="addActionName">添加动作</span>
            <span @click="showEdit=false">取消</span>
            <span style="cursor: pointer;" @click="saveLearnAction" v-if="(isAdd && canAdd) || !isAdd">确定</span>
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
                  <line x1="0" y1="0" x2="10" y2="10" style="stroke:#888EA7;stroke-width:1" />
                  <line x1="10" y1="0" x2="0" y2="10" style="stroke:#888EA7;stroke-width:1" />
                </svg>
              </span>
            </div>
          </div>
          <div class="ubdmd" :model="form">
            <span class="dece" />
            <div class="ubdta">是否确认删除器械</div>
            <div class="debbp">{{ form.device_name }}</div>
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
import {
  LIST_LEARN,
  LIST_DEVICE,
  GET_LEARN,
  ADD_LEARN,
  UPDATE_LEARN,
  ADD_DEVICE
} from "../store/action_type.js";
import { mapState } from "vuex";
import { Promise } from "q";
import global from "../components/Global";
import UploadImg from "./UploadImg.vue";
export default {
  name: "DeviceMgr",
  components: {
    UploadImg
  },
  data() {
    return {
      cur_page: 1,
      showEdit: false,
      showDelete: false,
      showAdd: false,
      currentItem: {},
      // diclist: [],
      devicelist: [],
      isAdd: false,
      form: {},
      partlist: [
        "手臂",
        "肩部",
        "肩颈",
        "背部",
        "胸部",
        "腹部",
        "腿部",
        "臀部"
      ], //,"暂无"
      idt: "",
      chooseType: "",
      chooseDevice: "",
      actionName: "",
      adviceSuggest: "",
      restoreSuggest: "",
      videoPicture: "",
      videoTitle: "",
      videoUrl: "",
      remark: "",
      details: [],
      deleteDetails: [],
      canAdd: false //类型器械是否允许添加动作
    };
  },
  computed: {
    // ...mapState(["learnList"])
    ...mapState({ learnList: "learnList", deviceList: "deviceList" })
  },
  created() {
    this.$store.dispatch(LIST_DEVICE);
    let datt = {
      page_num: this.cur_page,
      page_size: 100
    };
    this.$store.dispatch(LIST_LEARN, datt);
  },
  mounted() {},
  updated() {},
  methods: {
    chooseItem(model, item) {
      console.log(model, item);
    },
    delPicture(item) {
      //删除图片
      item.video_pic = "";
    },
    async onUploadImgError(msg) {
      this.$notify.error({
        title: "图片上传失败",
        message: msg
      });
    },
    delActionName(item) {
      //单个动作删除
      var index = this.details.indexOf(item);
      if (index > -1) {
        if (item.sec_category) {
          item.sec_category.forEach(v => {
            v.status = "0";
          });
        }
        this.deleteDetails.push(item);
        this.details.splice(index, 1);
      }
    },
    handleCurrentChange(val) {
      // 分页导航
      this.cur_page = val;
      this.getData();
    },
    editAction(index, id) {
      //列表-编辑
      this.isAdd = false;
      this.showEdit = true;
      this.deleteDetails = [];
      this.idx = index;
      const item = this.learnList[index];
      this.form = item

      this.idt = item.id;
      this.chooseType = item.category;
      this.chooseDevice = item.device_name;

      this.details = [item];
      var datt = {
        category: item.category,
        device_name: item.device_name
      };
      var that = this;
      this.$store.dispatch(GET_LEARN, datt).then(result => {
        //console.log("get item ", result);
        if (!result.success) {
          that.$message.error(`操作失败`);
          return;
        }
        var details = result.data.detail;
        for (var i = 0; i < details.length; i++) {
          var d = details[i];
          d.parts = [];
          if (d.sec_category) {
            d.sec_category.forEach(v => {
              if (v.name == "其他") {
              } else {
                d.parts.push(v.name); //已选部位
              }
            });
          }
          if (!d.video || d.video.length == 0) {
            d.video = [{ video_title: "" }];
          }
        }
        that.details = details;
      });
    },
    addActionName() {
      //添加动作
      this.details.push({ parts: [], video: [{ video_title: "" }] });
    },
    showAddDeviceView() {
      //添加器械
      this.showAdd = true;
      this.chooseType = "";
      this.chooseDevice = "";
    },
    addDeviceAction() {
      //添加教程
      var that = this;
      if (this.chooseType.length == 0 || this.chooseDevice.length == 0) {
        that.$message.error(`请选择类型或器械`);
        return;
      }
      var datt = {
        category: this.chooseType,
        device_name: this.chooseDevice
      };
      this.$store.dispatch(ADD_DEVICE, datt).then(result => {
        console.log(result);
        if (result.success) {
          that.showAdd = false;
          that.$message.success(`操作成功`);
          this.$store.dispatch(LIST_DEVICE); //todo: 分页
          let datt = {
            page_num: this.cur_page,
            page_size: 100
          };
          this.$store.dispatch(LIST_LEARN, datt);
        } else {
          that.$message.error(result.message || `操作失败`);
        }
      });
    },
    saveLearnAction() {
      //教程-保存
      var that = this;
      if (this.chooseType.length == 0 || this.chooseDevice.length == 0) {
        that.$message.error(`请选择类型或器械`);
        return;
      }
      // if (this.details.length == 0) {
      //   that.$message.error(`请添加动作`);
      //   return;
      // }

      //判断是否存在相同动作，相同部位。
      var sameActionAndPart = false;
      for (var i = 0; i < this.details.length; i++) {
        var item = this.details[i];
        if (!item.sec_category) {
          item.sec_category = [];
        }
        for (var j = 0; j < this.details.length; j++) {
          var item2 = this.details[j];
          if (!item2.sec_category) {
            item2.sec_category = [];
          }
          if (item2 != item && item.type == item2.type) {
            item.sec_category.forEach(v => {
              item2.sec_category.forEach(v2 => {
                if (v != v2 && v.name == v2.name) {
                  sameActionAndPart = true;
                }
              });
            });
          }
        }
        if (sameActionAndPart) {
          that.$message.error(`存在相同动作和部位，请检查`);
          break;
        }
      }

      for (var i = 0; i < this.details.length; i++) {
        var d = this.details[i];
        d.category = this.chooseType;
        d.device_name = this.chooseDevice;
        if (!d.recom_text && !d.recover_text && !d.type) {
          that.$message.error(`请完善动作信息`);
          return;
        }

        //合并部位 status:1 新增 0 删除
        var originParts = [];
        if (!d.sec_category) {
          d.sec_category = [];
        }
        d.sec_category.forEach(item => {
          originParts.push(item.name);
          item.status = "0";
          if (d.parts.indexOf(item.name) > -1) {
            item.status = "1";
          }
        });
        if (d.parts) {
          d.parts.forEach(v => {
            if (originParts.indexOf(v) == -1) {
              d.sec_category.push({ id: "", status: "1", name: v });
            }
          });
        }
        //合并部位end

        //删除所有部位,默认为”其他“
        var hasPart = false;
        d.sec_category.forEach(v => {
          if (v.status == "1") {
            hasPart = true;
          }
        });
        if (!hasPart) {
          //没有选择部位时，默认为”其他“
          d.sec_category.push({ id: "", status: "1", name: "其他" });
        }
      }

      var postData = this.details;
      //删除动作 部位置空
      this.deleteDetails.forEach(item => {
        postData.push(item);
      });
      var datt = {};
      var isAdd = that.form.count == 0
      if (isAdd) {
        //添加时，sec_category = ”肩部1，肩部2，肩部3“
        postData.forEach(d => {
          var partsNames = "";
          d.sec_category.forEach(v => {
            partsNames = partsNames + v.name + ",";
          });
          d.sec_category = partsNames;
        });
        datt = {
          category: this.chooseType,
          device_name: this.chooseDevice,
          detail: postData
        };
      } else {
        datt = postData;
      }
      var method = isAdd ? ADD_LEARN : UPDATE_LEARN;
      this.$store.dispatch(method, datt).then(result => {
        if (result.success) {
          that.deleteDetails = [];
          that.$set(that.learnList, that.idx, that.form);
          that.showEdit = false;
          that.$message.success(`操作成功`);

          let datt = {
            //todo: 分页
            page_num: this.cur_page,
            page_size: 100
          };
          this.$store.dispatch(LIST_LEARN, datt);
        } else {
          that.$message.error(`操作失败`);
        }
      });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.container .el-table thead {
  color: #5a6286;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table th {
  background: #e9eef6;
  margin-left: 1px;
  height: 35px;
  box-sizing: content-box;
  padding: 0;
}
.el-table tr {
  height: 50px;
}
.el-table td,
.el-table th.is-leaf {
  border: 1px solid rgba(198, 204, 220, 1);
  border-left: 0;
  border-top: 0;
}
.el-table tr:nth-child(even) {
  background: #f9fafc;
}
.el-table--small td,
.el-table--small th {
  padding: 5px 0;
  box-sizing: content-box !important;
}
.el-table--small td {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table--small th {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  /* padding-left: 30px; */

  box-sizing: border-box;
}
.has-gutter tr {
  background: #e9eef6;
}
.el-table__row .cell {
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
.dialog-footer {
  position: inherit;
}
.el-dialog__header {
  padding: 20px 30px 20px !important;
  text-align: center;
}
.el-dialog__title {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
}
.el-dialog__body {
  padding: 40px 30px 30px !important;
  box-shadow: 0px 5px 50px rgba(246, 247, 248, 1) inset;
}
.bindlog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
}
.bindbox {
  width: 900px;
  height: 90%;
  overflow: scroll;
  box-sizing: border-box;
  background: #fff;
  margin: 50px auto 0;
  padding: 0 30px 0;
}

.unbindbox {
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  background: #fff;
  margin: 50px auto 0;
  padding: 0 30px 0;
}
.bdup {
  height: 45px;
  line-height: 60px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  text-align: left;
  position: relative;
}
.ubdup {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  text-align: left;
  position: relative;
}
.ubdup div span:nth-of-type(1) {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 30px;
  box-sizing: border-box;
  background: #ff6464;
}
.bdup div span:nth-of-type(1) {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 30px;
  box-sizing: border-box;
  background: #ffc001;
}
.bdup div span:nth-of-type(2) {
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
.ubdup div span:nth-of-type(2) {
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
.svg {
  margin: 0 auto;
}
.bdmd {
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  padding: 20px 0 80px;
  position: relative;
}
.ubdmd {
  height: 130px;
  width: 100%;
  box-sizing: content-box;
  padding: 40px 0 0px;
  position: relative;
  border-bottom: 1px solid #e5e7eb;
}
.bdbt {
  height: 70px;
  width: 350px;
  border-top: 1px solid rgba(229, 231, 235, 1);
  position: relative;
  bottom: 15px;
  margin: 0px;
}

.bdbt span:nth-of-type(1) {
  box-sizing: border-box;
  width: 110px;
  height: 40px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #fff;
  line-height: 40px;
  top: 22px;
  left: 8px;
  background: #000;
  font-weight: 500;
  border-radius: 2px;
  text-align: center;
}
.bdbt span:nth-of-type(2) {
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  line-height: 40px;
  top: 22px;
  right: 146px;
  font-weight: 500;
  border-radius: 2px;
  text-align: center;
  border: 1px solid rgba(192, 199, 216, 1);
  background: #fff;
  cursor: pointer;
}
.bdbt span:nth-of-type(3) {
  box-sizing: border-box;
  width: 100px;
  height: 40px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  line-height: 40px;
  top: 22px;
  right: 36px;
  background: rgba(255, 192, 1, 1);
  font-weight: 500;
  border-radius: 2px;
  text-align: center;
}
.ubdbt {
  height: 70px;
  border-top: 1px solid rgba(229, 231, 235, 1);
  position: relative;
}
.ubdbt span:nth-of-type(1) {
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  line-height: 40px;
  top: 12px;
  right: 146px;
  font-weight: 500;
  border-radius: 2px;
  border: 1px solid rgba(192, 199, 216, 1);
  text-align: center;
  cursor: pointer;
}
.ubdbt span:nth-of-type(2) {
  box-sizing: border-box;
  width: 100px;
  height: 40px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #fff;
  line-height: 40px;
  top: 12px;
  right: 36px;
  background: #ff6464;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
}
.bdta .inuu {
  position: absolute;
  height: 17px;
  font-family: PingFangSC-Regular;
  color: rgba(91, 99, 126, 1);
  top: 35px;
  left: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  line-height: 20px;
  width: 200px;
}
.bdtb {
  background: #fff;
}
.bdtb input {
  outline: none;
  border: 0;
}
.bdtb input::-webkit-input-placeholder {
  color: #bfc4d1;
}
.ubdta {
  text-align: left;
  text-indent: 49px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  line-height: 22px;
}
.ubdtb {
  margin-top: 10px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(91, 99, 126, 1);
  line-height: 17px;
  text-align: left;
  text-indent: 49px;
}
.unce {
  position: absolute;
  top: 40px;
  width: 30px;
  height: 30px;
  background: url("../assets/unce.png") no-repeat center;
  left: 0;
}
.dece {
  position: absolute;
  top: 40px;
  width: 30px;
  height: 30px;
  background: url("../assets/dele.png") no-repeat center;
  left: 0;
}
.has-gutter tr th {
  background: #e9eef6;
}
.has-gutter tr td:last-child .cell {
  padding: 0 !important;
}
tbody tr td:last-child .cell {
  padding: 0 !important;
  height: 25px;
  margin: 0 auto;
  width: 150px;
  box-sizing: content-box;
  padding: 0;
}
thead tr th:last-child .cell {
  padding: 0 !important;
}
.has-gutter tr th:last-of-type .cell {
  padding: 0 !important;
}
.el-table__header {
  width: 100% !important;
}
.xcbox .el-input__inner,
.ccbox .el-input__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 0.56rem;
  display: inline-block;
}
.xcbox .el-input,
.xcbox .el-input__inner,
.ccbox .el-input,
.ccbox .el-input__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 0.56rem;
  display: inline-block;
  padding: 0;
  border: 0;
}
.xcbox .el-input__suffix,
.ccbox .el-input__suffix {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-bloxk;
  width: 0.6rem;
  height: 100%;
}
.xcbox .el-input__suffix-inner,
.ccbox .el-input__suffix-inner {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
.xcbox .el-icon-arrow-up:before,
.ccbox .el-icon-arrow-up:before {
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.oo {
  width: 240px;
  height: 46px;
  background: #fff;
  text-indent: 22px;
  line-height: 46px;
  border: 1px solid rgba(198, 204, 220, 1);
  border-bottom: 0px;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
}
.el-breadcrumb__inner {
  width: 240px;
  height: 46px;
}
.table {
  min-height: 550px;
}
.crumbs {
  margin: 0;
}
.celllist {
  width: 100%;
  background: #fff;
  height: 60px;
  text-indent: 20px;
  line-height: 60px;
  box-sizing: border-box;
  border: 1px solid rgba(198, 204, 220, 1);
  font-size: 14px;
  border-bottom: 0;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  position: relative;
}
.container {
  border-radius: 0;
  padding: 0;
}
.aa {
  background: #5780ff;
  height: 25px;
  width: 60px;
  display: inline-block;
  color: #fff;
  font-size: 12px;
  text-indent: 10px;
  letter-spacing: 2px;
  line-height: 25px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.bb {
  background: #e8eaee;
  height: 25px;
  width: 60px;
  display: inline-block;
  color: rgba(90, 98, 134, 1);
  letter-spacing: 2px;
  font-size: 12px;
  text-indent: 10px;
  line-height: 25px;
  font-family: PingFangSC-Medium;
}
.cc {
  background: #ffc001;
  height: 0.694rem;
  width: 1.67rem;
  display: inline-block;
  color: rgba(60, 68, 86, 1);
  font-size: 12px;
  text-align: center;
  line-height: 0.694rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  letter-spacing: 0px;
  border-radius: 0.05rem;
  /* position: absolute;
  left: 0.1rem; */
}
.dd {
  background: #3c4456;
  height: 25px;
  width: 1.67rem;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  font-family: PingFangSC-Medium;
  border-radius: 0.05rem;
}
.ee {
  background: #fff;
  border: 1px solid #3c4456;
  height: 0.694rem;
  width: 1.67rem;
  letter-spacing: 2px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  line-height: 0.694rem;
  font-weight: 500;
  color: #3c4456;
  font-family: PingFangSC-Medium;
  position: absolute;
  right: 0.1rem;
  cursor: pointer;
}
.content {
  background: #f6f7f8;
  height: 670px;
}
.el-table--border th,
.el-table__fixed-right-patch {
  background: red !important;
}
.has-gutter tr th .cell {
  background: red !important;
}
.tbody tr td:last-child .cell {
  margin: 0 auto;
  width: 150px;
  box-sizing: content-box;
  padding: 0;
  height: 26px;
}
.has-gutter tr td:last-child .cell {
  padding: 0 !important;
}
tbody tr td:last-child .cell {
  padding: 0 !important;
}
thead tr th:last-child .cell {
  padding: 0 !important;
}
.bdta {
  height: 130px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
}
.chooseDevice {
  width: 350px;
  height: 60px;
  background: rgba(247, 247, 247, 1);
  border: 1px solid rgba(225, 227, 232, 1);
  position: relative;
}
.bordered {
  padding: 7px;
  border: 1px solid rgba(225, 227, 232, 1);
}
.videoUrl {
  padding: 3px;
  margin: 20px 10px 0 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.videoUrl input {
  width: calc(100% - 70px);
  height: 100%;
  border: 0px;
}
.addContent {
  width: 100%;
  height: 480px;
  position: relative;
  float: left;
  margin-top: 30px;
}
.addContentLeft {
  width: 50%;
  height: calc(100% - 20px);
  float: left;
  margin-top: 20px;
}
.addContentRight {
  width: calc(50% - 20px);
  height: calc(100% - 20px);
  float: left;
  margin-bottom: 0px;
  margin-left: 20px;
  margin-top: 20px;
}
.bdta .hnha {
  position: absolute;
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(91, 99, 126, 1);
  top: 11px;
  left: 20px;
}
.hnhc {
  position: absolute;
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(91, 99, 126, 1);
  top: 11px;
  left: 6.28rem;
}
.bdta .hnhb {
  position: absolute;
  height: 17px;
  font-family: PingFangSC-Regular;
  color: rgba(91, 99, 126, 1);
  top: 35px;
  left: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  line-height: 20px;
  border: 0;
  outline: none;
  width: 1.8rem;
}
.bdta .hnhd {
  position: absolute;
  height: 17px;
  font-family: PingFangSC-Regular;
  color: rgba(91, 99, 126, 1);
  top: 35px;
  left: 3rem;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  line-height: 20px;
  border: 0;
  outline: none;
  width: 1.8rem;
}
.bdta .hnhe {
  position: absolute;
  height: 17px;
  font-family: PingFangSC-Regular;
  color: rgba(91, 99, 126, 1);
  top: 35px;
  left: 6.28rem;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  line-height: 20px;
  border: 0;
  outline: none;
  width: 1.8rem;
}
.bdta .hnhf {
  position: absolute;
  height: 17px;
  font-family: PingFangSC-Regular;
  color: rgba(91, 99, 126, 1);
  top: 35px;
  left: 8.72rem;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  line-height: 20px;
  border: 0;
  outline: none;
  width: 1.8rem;
}
::-webkit-input-placeholder {
  color: #bfc4d1;
}
.bdta .hnhb:focus {
  border: 0;
}
.xcbox {
  width: 5rem;
  height: 0.56rem;
  position: absolute;
  top: 1rem;
  left: 0.58rem;
}
.xcbox .el-input__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.xcbox .el-select,
.ccbox .el-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.xcbox .el-input__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  background: yellow;
  height: 0.56rem;
  display: inline-block;
}
.xcbox .el-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem !important;
  background: yellow !important;
  height: 0.56rem !important;
  display: inline-block;
}
.ccbox {
  width: 5rem;
  height: 0.56rem;
  position: absolute;
  top: 1rem;
  right: 0.36rem;
}
.addccb {
  width: 3rem;
  height: 0.9rem;
  line-height: 0.9rem;
  background: #3c4456;
  color: #fff;
  position: absolute;
  right: 0.45rem;
  font-size: 0.35rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  top: 0.375rem;
  text-indent: 1.173rem;
  cursor: pointer;
}
.subTitle {
  width: 3rem;
  height: 0.9rem;
  line-height: 0.9rem;
  color: #3c4456;
  font-size: 0.38rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  top: 0.375rem;
}
.svgg {
  position: absolute;
  top: 0.275rem;
  left: 0.475rem;
}
.hyyn {
  width: 10rem;
}
.debbp {
  padding-top: 20px;
  height: 30px;
  text-align: center;
  font-size: 20px;
}
.hnhc {
  position: absolute;
  top: 11px;
  left: 225px;
}
.actionContent {
  float: left;
  width: 100%;
  height: 470px;
  margin: 0 auto;
}
.pic-delete {
  color: darkblue;
  font-size: 12px;
  cursor: pointer;
}

.addbox {
  width: 500px;
  height: 300px;
  margin: 50px auto 0;
  padding: 0 30px 0;
  background: #fff;
}
.addbox-head {
  width: 100%;
  height: 30px;
  position: relative;
  padding-top: 15px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.addbox-head span:nth-of-type(1) {
  width: 40px;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #ffc001;
}
.addbox-head span:nth-of-type(2) {
  position: absolute;
  right: 0;
}
.addbox-content {
  width: 100%;
  height: 170px;
  padding-top: 15px;
}
.addbox-content-item {
  position: relative;
  padding: 15px;
  border: 1px solid rgba(198, 204, 220, 1);
}
.addbox-content-item div {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
.addbox-footer {
  width: 100%;
  height: 70px;
  padding-top: 10px;
}
.addbox-footer span {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  line-height: 40px;
  float: left;
  height: 40px;
  color: #000;
}
.addbox-footer span:nth-of-type(1) {
  width: 80px;
  border: 1px solid rgba(198, 204, 220, 1);
  margin-left: 300px;
}
.addbox-footer span:nth-of-type(2) {
  width: 100px;
  background: rgba(255, 192, 1, 1);
  margin-left: 10px;
}
input {
  border: 0px;
  padding: 0;
}
</style>
