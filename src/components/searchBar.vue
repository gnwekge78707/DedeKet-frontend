<template>
  <el-autocomplete
      class="inline-input"
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSubmit"
  ></el-autocomplete>
</template>

<script>
export default {
  name: "searchBar",
  //allInfos是父组件传来的值，如果allInfos不是父组件传来的就不用这样写
  props: ["allInfos"],
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    inputValue: function (val) {
      this.$emit("input", val)
      console.log("emiting")
      console.log(val)
    }
  },
  methods: {
    handleSubmit() {
      //根据自身情况
      //该方法是提交时触发

      this.$emit("input", this.inputValue)
      console.log("submiting")
      console.log()
    },
    //输入框获取焦点时调用的方法
    querySearch(queryString, cb) {
      //allInfos是怎么来，是从父组件传过来的还是在自己组件调用api接口拿到的还是其他
      //我这里的allInfos是从父组件传过来的，在这里也举例子组件从父组件传值
      let results = this.allInfos;
      console.log("debuging")
      console.log(results)
      results = queryString
          ? results.filter(this.createFilter(queryString))
          : results;
      //cb是回调函数，返回筛选出的结果数据到输入框下面的输入列表
      cb(results);
    },
    //该方法仿写官方文档，如果没有特别的需求，该方法改动不大
    //这是当输入数据时触发的，筛选出和输入数据匹配的建议输入。
    //我这里用的是调用match方法，是模糊匹配；官方调用的是indexOf，是精确匹配，看自身情况选择
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },
};
</script>
