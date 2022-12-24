<template>
  <div>


    <div style="padding-bottom: 5px">
      <!--            <el-input prefix-icon="el-icon-search" placeholder="请选择学期并查询" style="width: 20%" class="ml-5" ></el-input>-->
<!--      <el-input clearable prefix-icon="el-icon-message" placeholder="请输入书名并查询" style="width: 20%" class="ml-5"-->
<!--                v-model="bookName"></el-input>-->
<!--      <el-input clearable prefix-icon="el-icon-position" placeholder="请输入课程并查询" style="width: 20%" class="ml-5"-->
<!--                v-model="classId"></el-input>-->
      <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入书名并查询" style="width: 20%" class="ml-5 inline-input"
                       :fetch-suggestions="querySearchBook"

                       @select="handleSelect"

                       v-model="bookName"></el-autocomplete>
      <el-autocomplete clearable prefix-icon="el-icon-position" placeholder="请输入课程并查询" style="width: 20%" class="ml-5 inline-input"
                       :fetch-suggestions="querySearchClass"

                       @select="handleSelect"
                       v-model="classId"></el-autocomplete>
      <!--            <mydialog></mydialog>-->
      <el-button type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 5px">
      <!--            <el-button type="primary" @click="handleAdd"><i class="el-icon-circle-plus-outline" style="margin-right: 3px"></i>新增-->
      <!--            </el-button>-->
      <el-button type="warning"><i class="el-icon-plus" style="margin-right: 3px"></i>批量选购</el-button>
      <el-button type="primary"><i class="el-icon-upload" style="margin-right: 3px"></i>导入课表</el-button>
    </div>

    <el-table :data="tableData" border stripe
              :header-cell-style="{ color: '#fff', background: '#11649C' }"
              style="width:100%;"
              @selection-change="handleSelectionChange"
    >

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="bookName" label="书名" width="120">
      </el-table-column>
      <el-table-column
          header-align="center"
          align="center"
          width="180px"
          label="图片">
        <template slot-scope="scope">
          <el-popover width="250" style="cursor: pointer"
                      placement="right"
                      title=""
                      trigger="hover"
          >

            <img :src="scope.row.url" style="width: 100%"/>
            <img slot="reference" :src="scope.row.url" :alt="scope.row.url" style="width: 60px;margin-left: 5px;">
<!--            <img slot="reference" :src=this.$Api.osshttp+"11"+".png" :alt=this.$Api.osshttp+this.scope.row.photoIdArr[0]+".png" style="width: 60px;margin-left: 5px;">-->
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="class" label="课程">
      </el-table-column>
      <el-table-column prop="seller" label="发布者">
      </el-table-column>

      <el-table-column prop="rating" label="评分">
        <template slot-scope="scope">
          <!-- <el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
          <el-rate v-model="scope.row.rating" :allow-half="true" disabled text-color="#ff9900" show-score
          ></el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="remain" label="剩余">
      </el-table-column>
      <el-table-column label="操作" width="250vh">
        <el-button-group slot-scope="scope">
          <el-button @click="handleInfo(scope.row)"><i
              class="el-icon-info"></i>详细
          </el-button>

          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='返回'
              icon="el-icon-info"
              icon-color="red"
              title="确定"
              @confirm="handleBook(scope.row.id)"
          >
            <el-button type="success" slot="reference"><i class="el-icon-edit-outline"></i> 订购</el-button>
          </el-popconfirm>
        </el-button-group>

      </el-table-column>
    </el-table>

    <div style="padding: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

    </div>
    <el-dialog title="书本信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-width="120px" :model="form">
        <!--              <el-form-item label="班级" label-width="120px">-->
        <!--                <mydialog v-bind:all-infos="this.classIds" v-model="form.classId" ></mydialog>-->
        <!--              </el-form-item>-->
        <div class="demo-image__preview" style="text-align: center">
          <el-image
              class="pic"
              align="center"
              style="width: 50%"
              :src= 'this.nowitem.url'
              :preview-src-list="nowitem.srclist">
          </el-image>

        </div>
        <div class="block" style="text-align: center; font-family: 'Times New Roman'; font-weight: bold">
          <span class="demonstration">书籍打分</span>
          <el-rate
              v-model="nowrating"
              :colors="colors">
          </el-rate>
        </div>
        <el-descriptions class="margin-top" title="具体信息" :column="3" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              书籍名称
            </template>
            {{ nowitem.bookName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection"></i>
              对应课程
            </template>
            {{ nowitem.class }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              剩余/总数
            </template>
            {{ nowitem.remain }}/{{ nowitem.total }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              简介
            </template>
            {{nowitem.description}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              发布者
            </template>
            <el-tag size="small">{{ nowitem.seller }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
<!--        评论-->
        <article-comment v-bind:comment1="nowitem.comments" v-bind:textbookid1="String(nowitem.id)"></article-comment>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import request from "@/utils/request";
import mydialog from "@/components/searchBar";
import ArticleComment from "@/components/comment";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import axios from "axios";
import qs from "qs";
import api from "@/utils/api";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Subscription",
  components: {ArticleComment, mydialog, Aside, Header},
  data() {
    const osspicurl = this.$Api.osshttp
    const item = {
      id: 114,
      bookName: "《概率论》",

      photoIdArr: [11,12],
      college: "计算机院系",
      seller: "教务处",
      remain: "100",
      total: "200",
      rating: "3.7",
      class: "概率论与数理统计",
      description: "",

      comments: [],
    }
    return {

      tableData: [],
      total: 10,
      pageNum: 1,
      dialogFormVisible: false,
      classId: "",
      bookName: "",
      pageSize: 3,

      classIds: [],
      usernames: [],
      alldata: [],
      nowitem: item,
      form: {
        id: 0,
        username: "",
        classId: "",
        year: "",
        email: "",
      },
      colors: ['#5194ee', '#e0a40c', '#ee510d'],
      nowrating: 0,
    }
  },
  created() {
    console.log("created ", this.pageNum, this.pageSize)
    this.load()
    console.log("created done")
  },
  mounted() {
    // this.load()
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),

    reset() {
      this.load();

    },
    getComment(textbook) {
      console.log("getcomment")
      let url = this.$Api.glbhttp + "/deal/get-textbook-comment";
      // console.log(this.pageNum, this.pageSize)
      let data1 = {
        textbookId: textbook

      };
      console.log(data1)
      axios.post(url, qs.stringify(data1), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {

        console.log(res)

      })
      return res.data
    },
    // Search
    handleSelect(item) {
      console.log(item);
    },

    querySearchBook(queryString, cb) {
      var restaurants = this.qbookName;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchClass(queryString, cb) {
      var restaurants = this.qclassIds;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    gAll() {
      let url = this.$Api.glbhttp + "/deal/get-filtered-textbook";
      // console.log(this.pageNum, this.pageSize)
      let data1 = {
        pageIndex: 1,
        pageSize: 200,
        bookNameKeyword: this.bookName,
        classKeyword: this.classId

      };
      console.log(data1)
      axios.post(url, qs.stringify(data1), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {

        console.log(res.data.data)
        res = res.data.data

        var qkn = res.map((item) => {return item.bookName}).filter((x, index,self)=>self.indexOf(x)===index)
        var qci = res.map((item) => {return item.class}).filter((x, index,self)=>self.indexOf(x)===index)
        this.qbookName = qkn.map((item) => {return {"value": item}})
        this.qclassIds = qci.map((item) => {return {"value": item}})
        console.log(this.qbookName)
        console.log(this.qclassIds)

      })
    },
    load() {
      //axios post请求参入Form Data格式的参数  data参数书写的变化  contentType请求头设置变化
      let url = this.$Api.glbhttp + "/deal/get-filtered-textbook";
      // console.log(this.pageNum, this.pageSize)
      let data1 = {
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        bookNameKeyword: this.bookName,
        classKeyword: this.classId

      };
      console.log(data1)
      axios.post(url, qs.stringify(data1), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {

        console.log(res.data.data)

        res.data.data.map( item => {
          item.rating = 5

          if (item.photoIdArr == null) {
            item.photoIdArr = [11, 13]
          }
          item.srclist = item.photoIdArr.map((ii) => {return this.$Api.osshttp+ ii +".png"})
          item.url = this.$Api.osshttp+ item.photoIdArr[0] +".png"
              // item.srclist = [
              //   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              //   'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              // ]
          // console.log('allitem',item)
          // return{}
        })

        this.tableData = res.data.data
        this.total = res.data.total * this.pageSize
        console.log("at load end", this.tableData, this.total)
      })

    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      console.log("form")
      console.log(this.form)
    },
    handleInfo(row) {
      this.form = row
      this.nowitem = row
      // this.nowitem.id = row.id
      let url = this.$Api.glbhttp + "/deal/get-textbook-comment";

      // console.log(this.pageNum, this.pageSize)
      let data1 = {
        textbookId: this.nowitem.id

      };
      console.log(data1)
      axios.post(url, qs.stringify(data1), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {

        console.log("shit")
        console.log("comment res", res.data.data)
        if (res.data.data === null) {

          this.nowitem.comments = [
            {
              TextbookId: this.nowitem.id,
              Sender: "yufoo1",
              Comment: "好书",
              CreatedAt: "2022-09-30 10:10:44",
              commentNum:0,
              like:0,
            }
          ]

          //console.log("null null", this.nowitem.comments)
        } else {
          this.nowitem.comments = res.data.data
          //console.log("no null", this.nowitem.comments)
        }
        console.log("shit")
      })



      this.dialogFormVisible = true

    },
    handleBook(id) {
      //this.dialogFormVisible = false
      let url = this.$Api.glbhttp + "/deal/add-textbook-to-shopping-trolley";
      let data1 = {
        textbookId: id,
        token: localStorage.getItem("token"),
        subscriptionNumber: 1
      };
      console.log(data1)
      axios.post(url, qs.stringify(data1), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        console.log(res)
        res.data.data.map( item => {
          item.productID = item.textbookId.toString()
          item.id = item.id.toString()
          delete item.textbookId
          item.productName = item.bookName
          delete item.bookName
          item.num = item.subscriptionNumber
          delete item.subscriptionNumber
          item.maxNum = item.remain
          delete item.remain
          item.check = false
          if (item.photoIdArr == null) {
            item.photoIdArr = [11, 13]
          }
          item.productImg = this.$Api.osshttp+ item.photoIdArr[0] +".png"
          delete item.photoIdArr


          delete item.status
          delete item.createdAt
          delete item.username
        })
        if (res.data.status === true) {
          // 001 为成功, 更新vuex购物车状态
          console.log(res.data.data[0])
          this.unshiftShoppingCart(res.data.data[0]);
          this.notifySucceed(res.data.status);
        } else {
          // 提示失败信息
          this.notifyError(res.data.status);
        }

      })
    },
    save() {

    },
    handleSelectionChange(val) {
      this.multiSelection = val;
    },
  }
}
</script>

<style scoped>
.pic:hover{
  margin-top: -5px;
  cursor: zoom-in;
}
</style>