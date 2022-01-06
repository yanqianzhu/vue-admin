<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import warterMark  from './warterMark/warterMark'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data() {
    return {
      locale: zhCN,
      userInfo:''
    }
  },
  mounted() {
    this.getInfor();
    
  },
  methods :{
     getInfor() {
      this.$get("/api/v1.0/cloud/user/getUserBasic").then((res) => {
        if (res.code == 0) {
          this.userInfo = res.data.Phone;
          warterMark.set(this.userInfo)
        }
      });
    },
  }
}
</script>

<style lang='less'>
.page-title{
  background-color: #fff;
  padding-left: 20px;
}
.contentlist {
  margin: 24px 24px 0;
  .tablecont{
       background:#fff;
      padding:24px;
    //   margin-bottom: 20px;
  }
  .product_fields-_roup{
      background:#fff;
      padding:24px;
      margin-bottom: 20px;
  }
}
.standard {
  margin: -24px -24px 0;
  .title {
    height: 72px;
    background: #fff;
    line-height: 72px;
    padding-left: 24px;
    font-weight: 600;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
}
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
  .clearfix{
    zoom: 1;
  }
  ul{
    padding: 0;
    list-style: none;
  }
  .ant-breadcrumb{
    line-height: 84px !important;
    font-size: 16px !important;
  }
  .pagebox{
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
  body{
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-card-head{
    background: #f2f4f5 !important;
    padding: 0 14px;
  }
  .ant-card-head-title{
    font-weight: bold;
    padding: 11px 0;
  }
  .ant-card-body{
    padding: 14px;
  }
  .tag-box{
    .ant-tag{
      height: 26px;
      line-height: 20px;
      background: none;
      border: 3px solid rgb(250, 140, 22);
      color: #fa8c16
    }
    
  }
</style>
