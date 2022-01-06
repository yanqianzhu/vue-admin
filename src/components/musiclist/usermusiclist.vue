<template>
  <div class="standard">
    <div class="title">
      用户音乐列表
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
    title: '演唱者',
    dataIndex: 'Singing',
    key: 'singing',
  },
  {
    title: '原唱者',
    dataIndex: 'Original',
    key: 'original',
    ellipsis: true,
  },
  {
    title: '歌曲名',
    dataIndex: 'Name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '创作者',
    dataIndex: 'Creator',
    key: 'creator',
    ellipsis: true,
  },
  {
    title: '评论总数',
    dataIndex: 'CommentCount',
    key: 'commentCount',
    ellipsis: true,
  },
  {
    title: '收藏总数量',
    dataIndex: 'CollectionCount',
    key: 'collectionCount',
    ellipsis: true,
  },
  {
    title: '是否私密',
    dataIndex: 'IsPrivate',
    key: 'isPrivate',
  },
  {
    title: '是否删除',
    dataIndex: 'IsDeleted',
    key: 'isDeleted',
  },
  {
    title: '是否锻造nft',
    dataIndex: 'IsCastingNft',
    key: 'isCastingNft',
  },
  {
    title: '审核状态',
    dataIndex: 'ApplyState',
    key: 'applyState',
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
  }
];
const data = [];
export default {
  data() {
    return {
      data,
      columns,
      visible: false,
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
  //点击搜索
  onSearch(value){
        this.value = value
        this.getassetslist()
  },
    getassetslist(){
      this.$get("/api/v1.0/cloud/manage/getMusicList", {
          IsPrivate: '',
          MusicName: '',
          MusicType: '',
          Page: '1',
          Size: '10',
          State: '',
          UserId: '2',
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            console.log(this.data)
          }
        });
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