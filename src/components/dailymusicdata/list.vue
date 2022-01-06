<template>
  <div class="standard">
    <div class="title">
      每日音乐数据
    </div>
    <a-input-search placeholder="请输入用户昵称或者手机号" enter-button @search="onSearch"/>
    <div class="icon-content">
      <a-table bordered :data-source="data" :columns="columns">
    </a-table>
  </div>
</div>
</template>

<script>
const columns = [
  {
    title: '点击总次数',
    dataIndex: 'ClickCount',
    key: 'clickCount',
  },
  {
    title: '收藏次数',
    dataIndex: 'CollectionCount',
    key: 'collectionCount',
    ellipsis: true,
  },
  {
    title: '评论总次数',
    dataIndex: 'CommentCount',
    key: 'commentCount',
    ellipsis: true,
  },
  {
    title: '粉丝播放总次数',
    dataIndex: 'FansPlayCount',
    key: 'fansPlayCount',
    ellipsis: true,
  },
  {
    title: '粉丝展示总次数',
    dataIndex: 'FansShowCount',
    key: 'fansShowCount',
    ellipsis: true,
  },
  {
    title: '点赞总次数',
    dataIndex: 'LikeCount	',
    key: 'likeCount	',
    ellipsis: true,
  },
  {
    title: '播放总次数',
    dataIndex: 'PlayCount',
    key: 'playCount',
    ellipsis: true,
  },
  {
    title: '转发次数',
    dataIndex: 'ShareCount',
    key: 'shareCount',
    ellipsis: true,
  },
  {
    title: '展示总次数',
    dataIndex: 'ShowCount',
    key: 'showCount',
    ellipsis: true,
  },
  {
    title: '收益',
    dataIndex: 'Profit',
    key: 'profit',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'CreateTime',
    key: 'createTime',
    ellipsis: true,
  }
  ]
  const data = [];
export default {
  data(){
    return {
      data,
      columns
    };
  },
  mounted(){
    this.getdailymusicdata()
  },
  methods: {
    onSearch(value){
        this.value = value
        this.getassetslist()
    },
    getdailymusicdata(){
      this.$get("/api/v1.0/cloud/manage/getEverydayList", {
          EndDate: '',
          MusicId: '',
          StartDate: '',
          UserId: ''
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            console.log(this.data)
          }
        });
    }
  },
}
</script>

<style lang="less" scoped>
.icon-content{
  height: 100vh;
  margin-top: 20px;
  background-color: #FFFFFF;
}
</style>