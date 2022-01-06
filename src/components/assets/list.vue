<template>
  <div class="standard">
    <div class="title">
      用户资产列表
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
            title="用户资产详情" 
            @ok="handleOk"
            width="1000px"
          >
            <p>已提取金额: {{ AlreadyAmount }}</p>
            <p>余额</p>
            <p>银行卡号</p>
            <p>开户行</p>
            <p>银行名称</p>
            <p>冻结金额</p>
            <p>昵称</p>
            <p>可提现金额</p>
            <p>身份证号</p>
            <p>银行卡开户人名称</p>
          </a-modal>   
      </template>
    </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '昵称',
    dataIndex: 'NickName',
    key: 'nickName',
    ellipsis: true,
  },
  {
    title: '银行开户行名称',
    dataIndex: 'UserRealName',
    key: 'userRealName',
    ellipsis: true,
  },
  {
    title: '身份证号',
    dataIndex: 'UserCardId',
    key: 'CardId',
    ellipsis: true,
  },
  {
    title: '可提现金额',
    dataIndex: 'UserCardId',
    key: 'userCardId',
    ellipsis: true,
  },
  {
    title: '冻结金额',
    dataIndex: 'FrozenAmount',
    key: 'frozenAmount',
    ellipsis: true,
  },
  {
    title: '银行名称',
    dataIndex: 'BankName',
    key: 'bankName',
    ellipsis: true,
  },
  {
    title: '开户行',
    dataIndex: 'BankDeposit',
    key: 'bankDeposit',
    ellipsis: true,
  },
  {
    title: '银行卡号',
    dataIndex: 'BankCardId',
    key: 'bankCardId',
    ellipsis: true,
  },
  {
    title: '余额',
    dataIndex: 'Balance',
    key: 'balance',
    ellipsis: true,
  },
  {
    title: '已提现金额',
    dataIndex: 'AlreadyAmount',
    key: 'alreadyAmount',
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
      AlreadyAmount: '',
      Balance: '',
      BankCardId: '',
      BankDeposit: '',
      BankName: '',
      FrozenAmount: '',
      NickName: '',
      SureAmount: '',
      UserCardId: '',
      UserRealName: ''
    };
  },
  mounted() {
    this.getassetslist()
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
    getassetslist(){
      this.$get("/api/v1.0/cloud/user/getUserAssetList", {
          Page: '1',
          Size: this.size,
          UserId: '',
          Value: this.value
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.data = res.data.list
            this.size = res.data.total
            console.log(this.data)
          }
        });
    },
    onSearch(value){
        this.value = value
        this.getassetslist()
      },
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