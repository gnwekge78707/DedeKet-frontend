<template>
  <div>


    <div style="padding-bottom: 5px">
      <!--            <el-input prefix-icon="el-icon-search" placeholder="请选择学期并查询" style="width: 20%" class="ml-5" ></el-input>-->
      <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入书名并查询" style="width: 20%"
                       class="ml-5 inline-input"
                       :fetch-suggestions="querySearchBook"

                       @select="handleSelect"

                       v-model="bookName"></el-autocomplete>
      <el-autocomplete clearable prefix-icon="el-icon-position" placeholder="请输入课程并查询" style="width: 20%"
                       class="ml-5 inline-input"
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

    <div class="container">
      <div class="box-card" style="" v-for="item in tableData">
        <el-card>
          <div slot="header" class="clearfix">
            <el-button type="primary" icon="el-icon-edit" circle style=" margin-left: -28%;" size="mini"
                       @click="handleInfo(item)"></el-button>
            <span style="margin-left: 30%">{{ item.bookName }}</span>

            <el-button style="float: right; padding: 3px 0" type="text" @click="handleDelPub(item)">删除发布</el-button>

          </div>

          <el-descriptions class="margin-top" title="具体信息" :column="3" :size="size" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-document"></i>
                缩略图
              </template>


              <el-popover width="250" style="cursor: pointer"
                          placement="right"
                          title=""
                          trigger="hover"
              >
                <img :src="item.url" style="width: 100%"/>
                <img slot="reference" :src="item.url" :alt="item.url" style="width: 60px;margin-left: 5px;">
              </el-popover>


            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-document"></i>
                院系
              </template>
              {{ item.college }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-collection"></i>
                对应课程
              </template>
              {{ item.class }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                剩余/总数
              </template>
              {{ item.remain }}/{{ item.total }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                发布者
              </template>
              <el-tag size="small">{{ item.seller }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <div class="box-card ">
        <el-card style="min-height: 250px;" align="middle" onclick="">
          <div class="el-card__body mid">

            <el-button icon="el-icon-circle-plus-outline" @click="handleAdd" style="color: #505458;
          font-family: 'Microsoft JhengHei UI Light';color: #11649c;text-align:center;font-size: large" type="text">
              发布新图书
            </el-button>

          </div>

        </el-card>
      </div>
      c

    </div>


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
    <el-dialog title="书本信息" :visible.sync="dialogFormVisible" width="80%">
      <el-form label-width="120px" :model="form">
        <!--              <el-form-item label="班级" label-width="120px">-->
        <!--                <mydialog v-bind:all-infos="this.classIds" v-model="form.classId" ></mydialog>-->
        <!--              </el-form-item>-->
        <div class="demo-image__preview" style="text-align: center">
          <el-image
              align="center"
              style="width: 30%; "
              :src="nowitem.url"
              :preview-src-list="nowitem.srclist">
          </el-image>

        </div>
        <span style="margin-top: 13px">重新上传图片</span>
        <div class="block" style="text-align: center; font-family: 'Times New Roman'; font-weight: bold">
          <div class="demo-image__preview" style="text-align: center">
            <div class="relicsImage_content">
              <el-upload
                  class="upload_reilcimg"
                  ref="uploadImg"
                  :action='aaaaa'
                  list-type="picture-card"
                  :headers="headers"
                  :before-upload="beforeAvatarUploadMore"
                  :on-success="handleAvatarSuccess"
                  :on-remove="handleRemove"
                  :on-change="changeUpload"
                  :show-file-list="true"
                  accept="image/png, image/jpeg"
                  :multiple="true"
                  :auto-upload="false"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <p style="font-size: 12px; color: #ccc; margin-top: 20px">
                可上传jpg、jpeg、png格式，不能超过50M
              </p>
            </div>
<!--            <el-upload-->
<!--                class="upload-demo"-->
<!--                action="deal/get-textbook-photo-file"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                list-type="picture">-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--            </el-upload>-->
<!---->
<!--            <el-upload-->
<!--                action="#"-->
<!--                list-type="picture-card"-->
<!--                :auto-upload="false">-->
<!--              <i slot="default" class="el-icon-plus"></i>-->
<!--              <div slot="file" slot-scope="{file}">-->
<!--                <img-->
<!--                    class="el-upload-list__item-thumbnail"-->
<!--                    :src="file.url" alt=""-->
<!--                >-->
<!--                <span class="el-upload-list__item-actions">-->
<!--        <span-->
<!--            class="el-upload-list__item-preview"-->
<!--            @click="handlePictureCardPreview(file)"-->
<!--        >-->
<!--          <i class="el-icon-zoom-in"></i>-->
<!--        </span>-->
<!--        <span-->
<!--            v-if="!disabled"-->
<!--            class="el-upload-list__item-delete"-->
<!--            @click="handleDownload(file)"-->
<!--        >-->
<!--          <i class="el-icon-download"></i>-->
<!--        </span>-->
<!--        <span-->
<!--            v-if="!disabled"-->
<!--            class="el-upload-list__item-delete"-->
<!--            @click="handleRemove(file)"-->
<!--        >-->
<!--          <i class="el-icon-delete"></i>-->
<!--        </span>-->
<!--      </span>-->
<!--              </div>-->
<!--            </el-upload>-->

<!--            <el-dialog :visible.sync="dialogVisible">-->
<!--              <img width="100%" :src="dialogImageUrl" alt="">-->
<!--            </el-dialog>-->

          </div>
        </div>
        <el-descriptions class="margin-top" title="具体信息修改" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              书籍名称
            </template>
            <span v-if="!editing.bookName">
            {{ form.bookName }}  <el-button icon="el-icon-edit" circle size="mini"
                                            @click="doEditing('bookName')"></el-button>
            </span>
            <span v-if="editing.bookName">
            <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入书名" style="width: 70%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchBook"
                             @clear="giveUpEditing('bookName')"
                             @select="handleSelect"
                             @keyup.enter.native="doneEditing('bookName')"
                             v-model="form.bookName"> </el-autocomplete>
              <el-button icon="el-icon-circle-check" circle size="mini" style="margin-left: 5%"
                         @click="doneEditing('bookName')"></el-button>
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              对应课程
            </template>
            <span v-if="!editing.class">
            {{ form.class }}  <el-button icon="el-icon-edit" circle size="mini" @click="doEditing('class')"></el-button>
            </span>
            <span v-if="editing.class">
            <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入课程" style="width: 70%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchBook"
                             @clear="giveUpEditing('class')"
                             @select="handleSelect"
                             @keyup.enter.native="doneEditing('class')"
                             v-model="form.class"> </el-autocomplete>
              <el-button icon="el-icon-circle-check" circle size="mini" style="margin-left: 5%"
                         @click="doneEditing('class')"></el-button>
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              作者
            </template>
            <span v-if="!editing.writer">
            {{ form.writer }}  <el-button icon="el-icon-edit" circle size="mini"
                                          @click="doEditing('writer')"></el-button>
            </span>
            <span v-if="editing.writer">
            <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入作者" style="width: 70%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchBook"
                             @clear="giveUpEditing('writer')"
                             @select="handleSelect"
                             @keyup.enter.native="doneEditing('writer')"
                             v-model="form.writer"> </el-autocomplete>
              <el-button icon="el-icon-circle-check" circle size="mini" style="margin-left: 5%"
                         @click="doneEditing('writer')"></el-button>
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              数量
            </template>
            <span v-if="!editing.total">
            {{ form.remain }}/{{ form.total }}  <el-button icon="el-icon-edit" circle size="mini"
                                                           @click="doEditing('total')"></el-button>
            </span>
            <span v-if="editing.total">
            <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入总量" style="width: 70%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchBook"
                             @clear="giveUpEditing('total')"
                             @select="handleSelect"
                             @keyup.enter.native="doneEditing('total')"
                             v-model="form.total"> </el-autocomplete>
              <el-button icon="el-icon-circle-check" circle size="mini" style="margin-left: 5%"
                         @click="doneEditing('total')"></el-button>
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              简介：
            </template>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.description">
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              选择院系：
            </template>
            <template>
              <el-select v-model="form.college" clearable placeholder="请选择">
                <el-option
                    v-for="item in this.collegeOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-descriptions-item>
        </el-descriptions>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMod">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="新增书本信息" :visible.sync="dialogFormVisibleAdd" width="80%">
      {{ form.bookName }}
      <el-form label-width="220px" :model="form">
<!--        upp-->
        <div class="relicsImage_content">
          <el-upload
              class="upload_reilcimg"
              ref="uploadImg"
              :action='aaaaa'
              list-type="picture-card"
              :headers="headers"
              :before-upload="beforeAvatarUploadMore"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :on-change="changeUpload"
              :show-file-list="true"
              accept="image/png, image/jpeg"
              :multiple="true"
              :auto-upload="false"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <p style="font-size: 12px; color: #ccc; margin-top: 20px">
            可上传jpg、jpeg、png格式，不能超过50M
          </p>
        </div>

        <div class="block" style="text-align: center; font-family: 'Times New Roman'; font-weight: bold">
          <span class="demonstration">你的评分</span>
          <el-rate
              v-model="form.rating"
              :colors="colors">
          </el-rate>
        </div>
        <el-descriptions class="margin-top" title="具体信息" :column="3" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              书籍名称
            </template>
            <el-autocomplete clearable prefix-icon="el-icon-message" placeholder="请输入书名" style="width: 90%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchBook"

                             @select="handleSelect"

                             v-model="form.bookName"></el-autocomplete>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection"></i>
              对应课程
            </template>
            <el-autocomplete clearable prefix-icon="el-icon-position" placeholder="请输入课程" style="width: 90%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchClass"

                             @select="handleSelect"
                             v-model="form.class"></el-autocomplete>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection"></i>
              作者
            </template>
            <el-autocomplete clearable prefix-icon="el-icon-position" placeholder="请输入作者" style="width: 90%"
                             class="ml-5 inline-input"
                             :fetch-suggestions="querySearchWriter"

                             @select="handleSelect"
                             v-model="form.writer"></el-autocomplete>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              总数（{{ form.total }}/{{ form.total }}）
            </template>
            <el-input clearable placeholder="请输入总数" v-model="form.total"></el-input>

          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              发布者
            </template>
            <el-tag size="small">{{ nick }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              简介：
            </template>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.description">
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              选择院系：
            </template>
            <template>
              <el-select v-model="form.college" clearable placeholder="请选择">
                <el-option
                    v-for="item in this.collegeOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-descriptions-item>
        </el-descriptions>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="publishBook">确 定</el-button>
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
//首先第一行引入 ali-oss 插件并配置：
// const OSS = require('ali-oss');
// const client= new OSS({
//   accessKeyId: 'your access key',  // 查看你自己的阿里云KEY
//   accessKeySecret: 'your access secret', // 查看自己的阿里云KEYSECRET
//   bucket: 'your bucket name', // 你的 OSS bucket 名称
//   region: 'oss-cn-beijing', // bucket 所在地址，我的是 华北2 北京
//   cname:true, // 开启自定义域名上传
//   endpoint:"file.xxxx.live" // 自己的域名
// });
export default {
  name: "Publish",
  components: {ArticleComment, mydialog, Aside, Header},
  data() {

    const item = {
      id: 114,
      bookName: "《概率论》",

      url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgx.xiawu.com%2Fxzimg%2Fi4%2Fi4%2F12402024394202568%2FT177wkXXNcXXXXXXXX_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimgx.xiawu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665326133&t=9af98cf2aaa0cfa0dc60d7c04bb2b950",
      srclist: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      college: "计算机院系",
      seller: "教务处",
      remain: "100",
      total: "200",
      rating: "3.7",
      class: "概率论与数理统计",
      description: "",

    }
    return {
      ssd: [],
      isActive: false,
      forma: {
        copyReportCode: "",
      },
      list: [],
      limit: 5, //
      id: "", //代表选中某一行的id
      multipleSelection: [],
      uploadMoreimg: {
        fileList: [],
      },
      url: this.baseurl + "/antique_levy/upload",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      nick: localStorage.getItem("username"),
      tableData: [],
      total: 10,
      pageNum: 1,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      classId: "",
      bookName: "",
      pageSize: 5,
      editing: {
        "bookName": false,
        "writer": false,
        "college": false,
        "total": false,
        "class": false,
        "description": false,
      },
      qclassIds: [],
      qbookName: [],
      qwriter: [],
      qdata: [],
      nowitem: item,
      cacheform: {
        bookName: "",
        writer: "",
        college: "",
        total: 0,
        class: "",
        description: "",
      },
      form: {
        bookName: "",
        writer: "",
        college: "",
        remain: 0,
        total: 0,
        class: "",
        description: "",
      },
      colors: ['#5194ee', '#e0a40c', '#ee510d'],
      nowrating: 0,
      collegeOpt: [{
        value: '材料科学与工程学院',
        label: '材料科学与工程学院'
      }, {
        value: '电子信息工程学院',
        label: '电子信息工程学院'
      }, {
        value: '自动化科学与电气工程学院',
        label: '自动化科学与电气工程学院'
      }, {
        value: '能源与动力工程学院',
        label: '能源与动力工程学院'
      }, {
        value: '航空科学与工程学院',
        label: '航空科学与工程学院'
      }, {
        value: '计算机学院',
        label: '计算机学院'
      },
        {
          value: '机械工程及自动化学院',
          label: '机械工程及自动化学院'
        },
        {
          value: '经济管理学院',
          label: '经济管理学院'
        },
        {
          value: '数学科学学院',
          label: '数学科学学院'
        },
        {
          value: '生物工程系',
          label: '生物工程系'
        },
        {
          value: "外国语学院",
          label: '外国语学院'
        },
        {
          value: '交通科学与工程学院',
          label: '交通科学与工程学院'
        },
        {
          value: '可靠性与系统工程学院',
          label: '可靠性与系统工程学院'
        },
        {
          value: '宇航学院',
          label: '宇航学院'
        },
        {
          value: '人文社会科学学院',
          label: '人文社会科学学院'
        },
        {
          value: '飞行学院',
          label: '飞行学院'
        },
        {
          value: '仪器科学与光电工程学院',
          label: '仪器科学与光电工程学院'
        },
        {
          value: '北京学院',
          label: '北京学院'
        },
        {
          value: '物理学院',
          label: '物理学院'
        },
        {
          value: '法学院',
          label: '法学院'
        },
        {
          value: '软件学院',
          label: '软件学院'
        },
        {
          value: '高等理工学院',
          label: '高等理工学院'
        },
        {
          value: '新媒体艺术与设计学院',
          label: '新媒体艺术与设计学院'
        },
        {
          value: '化学学院',
          label: '化学学院'
        },
        {
          value: '马克思主义学院',
          label: '马克思主义学院'
        },
        {
          value: '人文与社会科学高等研究院',
          label: '人文与社会科学高等研究院'
        },
        {
          value: '空间与环境学院',
          label: '空间与环境学院'
        },
        {
          value: '无人系统研究院',
          label: '无人系统研究院'
        },
        {
          value: '北航学院',
          label: '北航学院'
        },
        {
          value: '网络空间安全学院',
          label: '网络空间安全学院'
        },
        {
          value: '医工交叉创新研究院',
          label: '医工交叉创新研究院'
        },
        {
          value: '微电子学院',
          label: '微电子学院'
        },
        {
          value: '人工智能研究院',
          label: '人工智能研究院'
        },
      ],

      // upload png
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

    }
  },
  created() {
    this.load()
  },
  mounted() {
    this.gAll();
  },
  methods: {
    doEditing(editState) {
      console.log("doing edit")
      this.editing[editState] = true
    },
    doneEditing(editState) {
      this.editing[editState] = false

    },
    giveUpEditing(editState) {
      console.log("giveupedit")
      this.editing[editState] = false
      this.form[editState] = JSON.parse(JSON.stringify(this.cacheform[editState]));
      console.log(this.cacheform[editState], this.form[editState])
    },
    // // upload png

    // 上传之前
    beforeAvatarUploadMore(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isPdf = file.type === "application/pdf";
        const isLt50M = file.size / 1024 / 1024 < 50;
        if (!isLt50M) {
          this.$message.warning("上传文件大小不能超过 50MB!");
          return false;
        }
        if (!isJPG && !isPng && !isPdf) {
          this.$message.warning("只能上传 JPG/PNG/PDF/JPEG 格式!");
          return false;
        }
    },
    // 上传成功
    handleAvatarSuccess() {},
    // 删除
    handleRemove(file, fileList) {
      this.uploadMoreimg.fileList = fileList;
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    changeUpload(file, fileList) {
      this.uploadMoreimg.fileList = fileList;
    },



    reset() {
      // this.username = "";
      // this.classId = "";
      this.load();

    },
    handleSelect(item) {
      console.log(item);
    },
    handleDelPub(item) {
      this.$confirm('此操作将永久删除该发布和相关评论，并使他人购物车中物品无效，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.$Api.glbhttp + "/deal/delete-uploaded-textbook";
        // console.log(this.pageNum, this.pageSize)
        let data1 = {
          textbookId: item.id
        };
        console.log(data1)
        axios.post(url, qs.stringify(data1), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {

          console.log(res)
          this.load()

        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.load()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleMod() {

      console.log("!!!!!!!!!!", this.form)
      this.$confirm('此操作将永久且关联地修改该发布，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.$Api.glbhttp + "/deal/update-uploaded-textbook";
        // console.log(this.pageNum, this.pageSize)
        let data1 = this.form
        console.log("!!!!!!!!!!", data1)
        if (data1.remain > data1.total) {
          this.$message({
            type: 'error',
            message: '删除失败：总数过少'
          });
          return
        }

        axios.post(url, qs.stringify(data1), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {

          console.log(res)
          this.load()

        })
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.load()
      }).catch(() => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
    querySearchWriter(queryString, cb) {
      var restaurants = this.qwriter;
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

        var qkn = res.map((item) => {
          return item.bookName
        }).filter((x, index, self) => self.indexOf(x) === index)
        var qci = res.map((item) => {
          return item.class
        }).filter((x, index, self) => self.indexOf(x) === index)
        var qwt = res.map((item) => {
          return item.writer
        }).filter((x, index, self) => self.indexOf(x) === index)
        this.qbookName = qkn.map((item) => {
          return {"value": item}
        })
        this.qclassIds = qci.map((item) => {
          return {"value": item}
        })
        this.qwriter = qwt.map((item) => {
          return {"value": item}
        })
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
        classKeyword: this.classId,
        seller: this.nick
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
      this.dialogFormVisibleAdd = true
      console.log("form")
      console.log(this.form)
    },
    handleInfo(row) {
      this.cacheform = JSON.parse(JSON.stringify(row));
      this.form = row
      this.form["textbookId"] = row.id
      this.nowitem = row
      this.dialogFormVisible = true
      console.log(this.nowitem)
      console.log(this.form)
    },
    handleBook(id) {
      // request.delete("http://localhost:9090/user/" + id).then(res => {
      //   if (res) {
      //     this.$message.success("删除成功")
      //     this.dialogFormVisible = false
      //     this.load()
      //   } else {
      //     this.$message.error("删除失败")
      //   }
      // })
    },
    publishBook() {
      console.log("trying to publish that")
      let url = this.$Api.glbhttp + "/deal/upload-new-textbook";
      // console.log(this.pageNum, this.pageSize)

      let data1 = this.form
      let formData = new FormData()
      formData.append("photo", this.uploadMoreimg.fileList[0].raw)
      for (const key in data1 ) {
        formData.append(key, data1[key]);
      }
      let config = {
        header : {
          'Content-Type' : 'multipart/form-data'
        }
      }
      // 创建新的数据对象

      console.log("publishing that", formData)
      axios.post(url, formData, config).then(res => {
        this.$refs.uploadImg.clearFiles();
        console.log("check Success", res)
        this.load()
      })

      this.dialogFormVisibleAdd = false
      this.$message({
        message: '成功发布《' + this.form.bookName + "》",
        type: 'success'
      });
      this.form = {
        bookName: "",
        writer: "",
        college: "",
        total: 0,
        class: "",
        description: "",
      }
      this.load()
    },
    // publishBook() {
    //   console.log("trying to publish that")
    //   let url = this.$Api.glbhttp + "/deal/upload-new-textbook";
    //   // console.log(this.pageNum, this.pageSize)
    //
    //   let data1 = this.form
    //   // 创建新的数据对象
    //   if (this.uploadMoreimg.fileList.length > 0)
    //   data1["photo"] = this.uploadMoreimg.fileList[0].raw
    //   console.log(this.uploadMoreimg.fileList)
    //
    //   console.log("publishing that", data1)
    //   axios.post(url, qs.stringify(data1), {
    //     headers: {'Content-Type': 'multipart/form-data'}
    //   }).then(res => {
    //     this.$refs.uploadImg.clearFiles();
    //     console.log("check Success", res)
    //     this.load()
    //   })
    //
    //   this.dialogFormVisibleAdd = false
    //   this.$message({
    //     message: '成功发布《' + this.form.bookName + "》",
    //     type: 'success'
    //   });
    //   this.form = {
    //     bookName: "",
    //     writer: "",
    //     college: "",
    //     total: 0,
    //     class: "",
    //     description: "",
    //   }
    //   this.load()
    // },
    handleSelectionChange(val) {
      this.multiSelection = val;
    },
  },

}
</script>

<style scoped>
.box-card {
  width: 30%;
  min-width: 380px;
  margin-top: 20px;
  margin-right: 10px;
  transition: all .5s;
  text-align-all: center;
  text-align: center;
  border-radius: 5px;
}

.el-card:hover {
  margin-top: -5px;
}

.pic:hover {
  margin-top: -5px;
  cursor: zoom-in;
}

.mid {
  margin-top: 20%;
  height: 100%;

}

.vert-center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  right: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  border: 20px;
  position: relative;
  box-sizing: border-box;
  transition: all .5s;
}

.ele {

  height: auto;
  width: 200px;
  margin: 10px 0.5%;
}
</style>