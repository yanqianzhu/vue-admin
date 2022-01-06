<template>
  <div class="standard">
    <div class="title">
      用户提现列表
    </div>
    <a-input-search placeholder="请输入用户昵称或者手机号" enter-button @search="onSearch"/>
    <div class="icon-content">
      <a-table bordered :data-source="data" :columns="columns">
        <template slot="changestate" slot-scope="text, record">
          <a-popconfirm
            v-if="data.length"
            title="确认修改状态吗?"
            @confirm="() => btndetermine(record.Id,record.State)"
            @cancel="() => btncancel()"
          >
            <a-button 
              type="primary" 
              v-for="(item,index) in changestate" 
              :key="index"
              @click="btnstate(index,record.Id)"
            >
              {{ item }}
            </a-button>
          </a-popconfirm>
      </template>
    </a-table>
    </div>
</div>
</template>

<script>
const columns = [
  {
    title: '申请金额',
    dataIndex: 'ApplyAmount',
    key: 'applyAmount',
    ellipsis: true,
  },
  {
    title: '提现状态',
    dataIndex: 'State',
    key: 'state',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'CreateTime',
    key: 'createTime',
    ellipsis: true,
  },
  {
    title: '修改时间',
    dataIndex: 'UpdateTime',
    key: 'updateTime',
    ellipsis: true,
  },
  {
    title: '修改状态',
    dataIndex: 'changestate',
    scopedSlots: { customRender: 'changestate' },
    ellipsis: true,
  },
];
export default {
  data(){
    return {
      data: [],
      columns,
      size: '',
      value: '',
      text: '确认修改状态吗',
      changestate: ['待审核','待付款','已打款'],
      state: '',
      id: ''
    };
  },
  mounted() {
    this.getwithdrawal()
  },
  methods: {
    //确定修改状态
    btndetermine(key){
      console.log(key)
      this.changeState()
      setTimeout(()=>{
        this.getwithdrawal()
        this.$message.success('修改成功');
      }, 1000);
    },
    //点击取消
    btncancel(){
      this.$message.error('取消成功');
    },
    //点击选择修改状态
    btnstate(index,Id){
      if(index == 0){
        this.state = 10021
      }else if(index == 1){
        this.state = 10022
      }else{
        this.state = 10023
      }
      this.id = Id
      console.log(this.state,Id)
      console.log(this.id)
    },
    //获取提现列表
    getwithdrawal(){
      this.$get("/api/v1.0/cloud/manage/getUserWithdrawalRecord", {
        Page: '1',
        Size: '10',
        UserId: '',
        Value: this.value
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            console.log(this.data)
            for(var i in this.data){
              if(this.data[i].State == 10021){
                this.data[i].State = '待审核'
              }else if(this.data[i].State == 10022){
                this.data[i].State = '待付款'
              }else{
                this.data[i].State = '已打款'
              }
            }
          }
        });
    },
    //修改状态调用
    changeState(){
      this.$post("/api/v1.0/cloud/manage/userWithdrawalState", {
            'State': this.state,
            'id': this.id,
          }).then((res) => {
            if (res.code == 0) {
              console.log(res)
            }
        });
    },
    onSearch(value){
        this.value = value
        this.getwithdrawal()
    },
  }
}
</script>

<style lang='less' scoped>
.icon-content{
  height: 100vh;
  margin-top: 20px;
  background-color: #FFFFFF;
  button{
    margin-left: 5px;
  }
}
</style>