<template>
  <div>
    个人信息

    <el-card style="width: 60%">
      <div class="row">
        <div style="display:inline-block; padding-left: 20%" class="column">
          <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              ref="uploadImg"
              :show-file-list="true"
              :on-remove="handleRemove"
              :on-change="changeUpload"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" @error="itemError()">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="display:inline-block; padding-top: 80px" class="column">
          上传头像
          <el-button type="success" icon="el-icon-check" circle @click="uploadImage"></el-button>
        </div>
      </div>


      <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          {{ name }}
        </el-form-item>
        <el-form-item label="当前密码" prop="pass">
          <el-input type="password" v-model="ruleForm.nowpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>          <el-button @click="resetForm('ruleForm')">重置</el-button>

        </el-form-item>
        <el-form-item label="电话号码">
          <el-input type="textarea" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitphoneForm('ruleForm')">修改手机号</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "User",
  created() {

  },
  mounted() {
    let url = this.$Api.glbhttp + "/info/get-phone";
    // console.log(this.pageNum, this.pageSize)
    let data1 = {
      token: localStorage.getItem("token"),
    };
    // ruleForm: {
    //   nowpass: '',
    //       pass: '',
    //       checkPass: '',
    //       phone: ''
    // },
    console.log("get phone",data1)
    axios.post(url, qs.stringify(data1), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(res => {

      console.log(res)
      this.ruleForm.phone = res.data.phone

    })
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新手机号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 10000000000) {
            callback(new Error('位数不够'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      mytoken: localStorage.getItem("token"),
      name: localStorage.getItem("username"),
      id: 1,
      imageUrl: "https://dedeket.oss-cn-hangzhou.aliyuncs.com/head_portrait/" + localStorage.getItem("username") + ".png",
      uploadMoreimg: {
        fileList: [],
      },
      ruleForm: {
        nowpass: '',
        pass: '',
        checkPass: '',
        phone: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        phone: [
          {validator: checkAge, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.uploadMoreimg.fileList = fileList;
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    changeUpload(file, fileList) {
      this.uploadMoreimg.fileList = fileList;
    },
    itemError() {
      this.imageUrl = require('@/assets/avt.png')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitphoneForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.$Api.glbhttp + "/info/change-phone";
          // console.log(this.pageNum, this.pageSize)
          let data1 = {
            token: localStorage.getItem("token"),
            newPhone: this.ruleForm.phone,
          };

          console.log("try to change phone",data1)
          axios.post(url, qs.stringify(data1), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(res => {

            console.log(res)

              this.$message({
                type: 'success',
                message: '修改成功!'
              });


          })

        } else {
          this.$message({
            type: 'warning',
            message: '密码输入错误!'
          });
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.$Api.glbhttp + "/info/change-password";
          // console.log(this.pageNum, this.pageSize)
          console.log("mytk", this.mytoken)
          let data1 = {
            token: this.mytoken,
            newPassword: this.ruleForm.pass,
            oldPassword: this.ruleForm.nowpass,
          };

          console.log("try to change password",data1)
          axios.post(url, qs.stringify(data1), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(res => {

            console.log("w??", res)
            if (res.data.notMatch === null) {
              this.$message({
                type: 'warning',
                message: '当前密码输入错误!'
              });
            } else {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }

          })

        } else {
          this.$message({
            type: 'warning',
            message: '密码输入错误!'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadImage() {

      console.log("trying to publish that")
      let url = this.$Api.glbhttp + "/info/upload-head-portrait";
      // console.log(this.pageNum, this.pageSize)
      let token = localStorage.getItem("token")
      let formData = new FormData()
      console.log("shit?", this.uploadMoreimg)
      console.log("filelist?",this.uploadMoreimg.fileList[0].raw)
      formData.append("photo", this.uploadMoreimg.fileList[0].raw)
      formData.append("token", token)
      console.log(formData.get("photo"))
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // 创建新的数据对象

      console.log("publishing that", formData)
      axios.post(url, formData, config).then(res => {

        this.$refs.uploadImg.clearFiles();
        console.log("check Success", res)

      })
    }
  }

}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


.el-card:hover {
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.932);
  border-color: #eee;
  margin-top: 5px;
  transition: all 0.2s ease-out;
}

.column {
  float: left;
  width: 50%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
  padding-bottom: 5%;
}
</style>