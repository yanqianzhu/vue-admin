<template>
  <div class="standard">
    <div class="title">
      用户出价列表
    </div>
    <a-input-search placeholder="请输入用户昵称或者手机号" enter-button @search="onSearch"/>
    <div class="icon-content">
      <a-table bordered :data-source="data" :columns="columns">
      <template slot="viewdetails" slot-scope="text, record">
          <a-button type="primary" @click="viewDetails(record.NickName)">
            查看详情
          </a-button>
          <a-modal 
            v-model="visible" 
            title="用户列表详情" 
            @ok="handleOk"
            width="1000px"
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </a-modal>   
      </template>
    </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '用户昵称',
    dataIndex: 'UserNickName',
    key: 'userNickName',
    ellipsis: true,
  },
  {
    title: '出价金额',
    dataIndex: 'OfferPrice',
    key: 'offerPrice',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'CreateTime',
    key: 'createTime',
    ellipsis: true,
  },
  {
    title: '查看详情',
    scopedSlots: { customRender: 'viewdetails' },
    key: 'viewdetails',
    ellipsis: true,
  },
  ]
  const data = [];
export default {
  data() {
    return {
      columns,
      data,
      value: '',
      size: '',
      visible: false,
    };
  },
  mounted() {
    this.getofferlist()
  },
  methods: {
    //点击查看详情
    showModal() {
      this.visible = true;
  },
    //点击关闭详情
    handleOk(e) {
      console.log(e);
      this.visible = false;
  },
    //详情点击事件
    viewDetails(NickName) {
      console.log(NickName)
      this.visible = true;
  },
    getofferlist(){
        this.$get("/api/v1.0/cloud/user/getUserOfferPrice", {
          MusicId: '',
          Page: '1',
          Size: '',
          UserId: ''
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            this.size = res.data.total
            console.log(res)
          }
        });
      },
    onSearch(value){
        this.value = value
        this.getassetslist()
    }
  },
};
</script>

<style lang="less" scoped>
.icon-content{
  height: 100vh;
  margin-top: 20px;
  background-color: #FFFFFF;
}
</style>