<template>
  <div class="standard">
    <div class="title">
      用户nft列表
    </div>
    <a-input-search placeholder="请输入用户昵称或者手机号" enter-button @search="onSearch"/>
    <div class="icon-content">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
  const columns = [
  {
    title: '昵称',
    dataIndex: 'NickName',
    key: 'nickname',
    ellipsis: true,
    width: 80,
  },
  {
    title: '性别',
    dataIndex: 'Sex',
    key: 'sex',
    ellipsis: true,
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'Phone',
    key: 'phone',
    ellipsis: true,
    width: 80
  },
  {
    title: '粉丝数',
    dataIndex: 'FansCount',
    key: 'fans',
    ellipsis: true,
    width: 80
  },
  {
    title: '关注数',
    dataIndex: 'AttentionCount',
    key: 'attentionCount',
    ellipsis: true,
    width: 80
  },
  {
    title: '获赞数',
    dataIndex: 'LikesCount',
    key: 'like',
    ellipsis: true,
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'CreateTime',
    key: 'createtime',
    width: 80,
  }
];

const data = [];
  export default {
    data() {
      return {
        data,
        columns,
        Size: '',
        value: ''
      };
    },
    mounted() {
      this.getnftuser()
    },
    methods: { 
      getnftuser(){
        this.$get("/api/v1.0/cloud/user/getUserOfferPrice", {
          MusicId: '',
          Page: '1',
          Size: '',
          UserId: ''
        }).then((res) => {
          if (res.code == 0) {
            
          }
        });
      },
      onSearch(value) {
        this.value = value
        this.getuserlist()
      },
    }
  };
</script>

<style lang="less" scoped>
  .icon-content{
    background-color: #FFFFFF;
    margin-top: 20px;
  }
</style>