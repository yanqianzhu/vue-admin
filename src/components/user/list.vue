<template>
  <div class="standard">
    <div class="title">
      用户列表
    </div>
    <a-input-search placeholder="请输入用户昵称或者手机号" enter-button @search="onSearch"/>
    <div class="icon-content">
      <a-table bordered :data-source="dataSource" :columns="columns">
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
          <p>关注数: {{ AttentionCount }}</p>
          <p>创建时间: {{ CreateTime }}</p>
          <p>粉丝数: {{ FansCount }}</p>
          <p>个人介绍: {{ Introduction }}</p>
          <p>是否删除: {{ IsDeleted }}</p>
          <p>是否禁用: {{ IsDisable }}</p>
          <p>获赞数: {{ LikesCount }}</p>
          <p>昵称: {{ NickName }}</p>
          <p>用户手机号: {{ Phone }}</p>
          <p>性别: {{ Sex }}</p>
          <p>修改时间: {{ UpdateTime }}</p>
          <p>微信openid: {{ WxOpenid }}</p>
        </a-modal>   
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm
          title="确定删除吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteconfirm"
          @cancel="deletecancel"
        >
          <span class="delete" @click="btndelete(record.Id)">删除</span>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定禁用吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="disableconfirm"
          @cancel="disablecancel"
        >
          <span class="disable" @click="btndisable(record.Id)">禁用</span>
        </a-popconfirm>
      </template>
    </a-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userdetails: [],
      dataSource: [],
      visible: false,
      size: '',
      message: '',
      id: '',
      OperType: '',
      nickname: '',
      AttentionCount: '',
      CreateTime: '',
      FansCount: '',
      Introduction: '',
      IsDeleted: '',
      IsDisable: '',
      LikesCount: '',
      NickName: '',
      Phone: '',
      Sex: '',
      UpdateTime: '',
      WxOpenid: '',
      columns: [
        {
          title: '昵称',
          dataIndex: 'NickName',
          key: 'nickname',
          ellipsis: true,
        },
        {
          title: '性别',
          dataIndex: 'Sex',
          key: 'sex',
          ellipsis: true,
        },
        {
          title: '手机号',
          dataIndex: 'Phone',
          key: 'phone',
          ellipsis: true,
        },
        {
          title: '粉丝数',
          dataIndex: 'FansCount',
          key: 'fans',
          ellipsis: true,
        },
        {
          title: '关注数',
          dataIndex: 'AttentionCount',
          key: 'attentionCount',
          ellipsis: true,
        },
        {
          title: '获赞数',
          dataIndex: 'LikesCount',
          key: 'like',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'CreateTime',
          key: 'createtime',
        },
        {
          title: '禁用',
          dataIndex: 'IsDisable',
          key: 'isDisable',
        },
        {
          title: '删除',
          dataIndex: 'IsDeleted',
          key: 'isDeleted',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
        {
          title: '查看详情',
          dataIndex: 'viewdetails',
          key: 'viewdetails',
          scopedSlots: { customRender: 'viewdetails' },
        }
      ],
    };
  },
  mounted() {
      this.getuserlist()
  },
  // created(){
  //   console.log(this.$route.path)
  // },
  methods: {
    //确定删除
    deleteconfirm(e){
      console.log(e);
      this.getoperation()
      this.$message.success('删除成功');
      setTimeout(()=>{
        this.getuserlist()
        console.log(123)
      }, 1000);
    },
    //取消删除
    deletecancel(e){
      console.log(e);
      this.$message.error('取消删除');
    },
    //确定禁用
    disableconfirm(e){
      console.log(e);
      this.getoperation()
      this.$message.success('禁用成功');
      setTimeout(()=>{
        this.getuserlist()
        console.log(123)
      }, 1000);
    },
    //取消禁用
    disablecancel(e){
      console.log(e);
      this.$message.error('取消禁用');
    },
    //点击查看详情
    showModal(){
      this.visible = true;
  },
    //点击关闭详情
    handleOk(e){
      console.log(e);
      this.visible = false;
  },
  //获取用户列表
    getuserlist(){
      this.$get("/api/v1.0/cloud/user/getUserList", {
        Value: this.message,
        Page: '1',
        Size: this.size,
      }).then((res) => {
        if(res.code == 0){
          this.dataSource = res.data.List
          this.size = res.data.Total
          for(let i in this.dataSource){
            if(this.dataSource[i].Sex == 1){
              this.dataSource[i].Sex = '男'
            }else{
              this.dataSource[i].Sex = '女'
            }
            if(this.dataSource[i].IsDisable == 1){
              this.dataSource[i].IsDisable = '已禁用'
            }else{
              this.dataSource[i].IsDisable = '未禁用'
            }
            if(this.dataSource[i].IsDeleted == 1){
              this.dataSource[i].IsDeleted = '已删除'
            }else{
              this.dataSource[i].IsDeleted = '未删除'
            }
          }
        }
      });
      },
    //操作
    getoperation(){
      this.$post("/api/v1.0/cloud/manage/userOperation", {
          'Id': this.id,
          'OperType': this.OperType,
          'Value': 1,
        }).then((res) => {
          if(res.code == 0){
            console.log(res)
          }
      });
    },
    //输入用户昵称或者手机号进行搜索
    onSearch(message){
      this.message = message
      this.getuserlist()
    },
    //详情点击事件
    viewDetails(NickName){
      this.nickname = NickName
      this.visible = true;
      this.$get("/api/v1.0/cloud/user/getUserList", {
          Value: this.nickname,
          Page: '1',
          Size: this.size,
        }).then((res) => {
          if(res.code == 0){
            this.userdetails = res.data.List
            this.size = res.data.Total
            this.AttentionCount = this.userdetails[0].AttentionCount
            this.CreateTime = this.userdetails[0].CreateTime
            this.FansCount = this.userdetails[0].FansCount
            this.Introduction = this.userdetails[0].Introduction
            this.IsDeleted = this.userdetails[0].IsDeleted
            this.IsDisable = this.userdetails[0].IsDisable
            this.LikesCount = this.userdetails[0].LikesCount
            this.NickName = this.userdetails[0].NickName
            this.Phone = this.userdetails[0].Phone
            this.Sex = this.userdetails[0].Sex
            this.UpdateTime = this.userdetails[0].UpdateTime
            this.WxOpenid = this.userdetails[0].WxOpenid
            console.log(this.userdetails)
            console.log(this.userdetails[0].AttentionCount)
          }
        });
    },
    //点击删除
    btndelete(Id){
      console.log(Id)
      this.id = Id
      this.OperType = 1
    },
    //点击禁用
    btndisable(Id){
      console.log(Id)
      this.id = Id
      this.OperType = 2
    }
  },
};
</script>

<style lang="less" scoped>
.icon-content{
  background-color: #FFFFFF;
  margin-top: 20px;
}
.delete{
   cursor: pointer;
}
.disable{
   cursor: pointer;
}
</style>