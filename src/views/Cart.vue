<template>

  <div class="content shopCart">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/dashboard' }">产品</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- Steps -->
    <div class="steps">
      <el-steps :active="1" align-center>
        <el-step title="购物车"></el-step>
        <el-step title="订单信息"></el-step>
        <el-step title="订单支付"></el-step>
        <el-step title="成功提交订单"></el-step>
      </el-steps>
    </div>
    <!-- table -->
    <div class="table">
      <el-table element-loading-text="正在为您拼命加载中..." :data="tableData" ref="multipleTable" style="width: 100%"
                @selection-change="handleSelectionChange" :close-on-click-modal="false" :close-on-press-escape="false"
                :header-cell-style="{background:'#f8f8f8',color:'#999'}">
        <el-table-column type="selection" width="75" align="center" />
        <el-table-column prop="shopImg" align="center" width="150" label="商品">
          <template slot-scope="scope">
            <img :src="scope.row.shopImg" class="shopImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="shop" align="center">
          <template slot-scope="scope">
            <span class="shop">{{scope.row.shop}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <span class="price">¥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.number" oninput="value=value.replace(/[^\d]/g,'')" autocomplete="off" style="width:140px" size="mini"
                      @change="handleInput(scope.row)">
              <el-button size="mini" slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
              <el-button slot="append" size="mini" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="小计" align="center">
          <template slot-scope="scope">
            <span class="count">¥{{scope.row.goodTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="submit">
        <van-submit-bar :price="totalPrice*100" :disabled='multipleSelection.length<0' button-color='#bfa548' button-text="去结算" label='产品总额：'>
          <p class="submitBar">
            <span>继续购物</span>
            <span>
              共 <b>{{tableData.length}}</b> 件商品,
              已选择 <b>{{multipleSelection.length}}</b> 件
            </span>
          </p>
        </van-submit-bar>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      tableData: [
        { shopImg: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg", shop: '小米不能写 红色 10支装', price: 20, number: 1, goodTotal: 20, },
        { shopImg: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg", shop: '小米巨能写 黑色 10支装', price: 30, number: 1, goodTotal: 30, }
      ],
      totalPrice: 0,
      multipleSelection: [],
    }
  },
  methods: {
    // 删除单个商品
    handleDelete(index, row) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除数组中指定的元素
        this.tableData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 数量变化触发
    handleInput(value) {
      console.log(value);
      if (null == value.number || value.number == "" || value.number == 0) {
        value.number = 1;
      }
      value.goodTotal = (value.number * value.price).toFixed(2);//保留两位小数
      //增加商品数量也需要重新计算商品总价
      this.handleSelectionChange(this.multipleSelection);
    },
    add(addGood) {
      //输入框输入值变化时会变为字符串格式返回到js
      //此处要用v-model，实现双向数据绑定
      if (typeof addGood.number == 'string') {
        addGood.number = parseInt(addGood.number);
      };
      addGood.number += 1;
      addGood.goodTotal = (addGood.number * addGood.price).toFixed(2);//保留两位小数
      this.handleSelectionChange(this.multipleSelection)
    },
    del(delGood) {
      if (typeof delGood.number == 'string') {
        delGood.number = parseInt(delGood.number);
      };
      if (delGood.number > 1) {
        delGood.number -= 1;
        delGood.goodTotal = (delGood.number * delGood.price).toFixed(2);//保留两位小数
        this.handleSelectionChange(this.multipleSelection)
      }
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      this.totalPrice = 0;
      //此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        //判断返回的值是否是字符串
        if (typeof selection[i].goodTotal == 'string') {
          selection[i].goodTotal = parseInt(selection[i].goodTotal);
        };
        this.totalPrice += selection[i].goodTotal;
      }
    }
  },
}


</script>

<style lang="scss" scoped>
.shopCart {
  margin-bottom: 50px;
  .breadcrumb {
    margin: 20px 0;
    ::v-deep .el-breadcrumb__inner.is-link {
      color: #11649C;
    }
  }
  .steps {
    margin-top: 50px;
    ::v-deep .el-step__head {
      border-color: #d8d8d8;
      color: #fff;
    }
    ::v-deep .el-step__head.is-finish {
      color: #fff;
      border-color: #11649C;
    }
    ::v-deep .el-step__title {
      font-size: 15px;
    }
    ::v-deep .el-step__title.is-finish {
      color: #11649C;
    }
    ::v-deep .el-step__title.is-process {
      color: #d8d8d8;
    }

    ::v-deep .is-finish {
      .is-text {
        background: #11649C;
      }
    }
    ::v-deep .is-process {
      .is-text {
        background: #d8d8d8;
      }
    }
    ::v-deep .is-wait {
      .is-text {
        background: #d8d8d8;
      }
    }
    ::v-deep .el-step__line {
      height: 5px;
      top: 10px;
      background-color: #f1f1f1;
    }
  }
  .table {
    margin-top: 50px;
    position: relative;
    padding-bottom: 100px;
    ::v-deep .el-input__inner {
      text-align: center;
    }
    ::v-deep .el-input-group__append {
      padding: 0 15px;
    }
    ::v-deep .el-input-group__prepend {
      padding: 0 15px;
    }
    .shopImg {
      width: 100%;
    }
    .price,
    .shop {
      color: #000733;
    }
    .count {
      color: #11649C;
    }
    ::v-deep .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #11649C;
      border-color: #11649C;
    }
    ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #11649C;
      border-color: #11649C;
    }
    ::v-deep .el-checkbox__inner::after {
      left: 7px;
      top: 3px;
    }
    ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      top: 7px;
    }
    .submit {
      position: absolute;
      right: 0;
      left: 0;
      ::v-deep .van-submit-bar {
        position: absolute;
        top: 20px;
        .van-submit-bar__bar {
          background-color: #f8f8f8;
          padding: 30px 20px 30px 28px;
        }
      }
      .submitBar {
        color: #757575;
        display: flex;
        align-items: center;
        b {
          color: #11649C;
          margin: 0 5px;
        }

        span {
          display: flex;
          align-items: center;
          &:first-child {
            cursor: pointer;
            &:hover {
              color: #11649C;
            }
            &::after {
              display: inline-block;
              content: "";
              width: 1px;
              height: 12px;
              background: #ccc;
              margin: 0 10px;
            }
          }
        }
      }
      ::v-deep .van-submit-bar__price {
        color: #11649C;
      }
      ::v-deep .van-submit-bar__text {
        padding-right: 30px;
        color: #000733;
      }
    }
  }
}

</style>