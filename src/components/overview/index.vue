<template>
  <div>
    <!-- <download-excel :data="exportData" :fields="json_fields" name="filename.xls" >
          下
        </download-excel>
        <div @click="d">下载</div> -->
  </div>
</template>

<script>
import e from "../../utils/export";
export default {
  data() {
    return {
      exportData: [
        {
          name: 1,
        },
        {
          name: 2,
        },
      ],
      json_fields: {
        名称: "name",
      },
    };
  },

  mounted() {},
  methods: {
    d() {
      var t = [
        {
          key: "title",
          title: "标题",
        },
      ];
      var l = [
        {
          title: "王植",
        },
      ];
      e(t, l, "表格.xlsx");
    },
  },
};
</script>

<style lang='less' scoped>
</style>