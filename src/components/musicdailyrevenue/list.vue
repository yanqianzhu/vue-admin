<template>
  <div class="standard">
    <div class="title">
      音乐每日收益
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
    title: '音乐名称',
    dataIndex: 'MusicName',
    key: 'musicName',
  },
  {
    title: '封面',
    dataIndex: 'Cover',
    key: 'cover',
    ellipsis: true,
  },
  {
    title: '出售nft数量',
    dataIndex: 'SellNft',
    key: 'sellNft',
    ellipsis: true,
  },
  {
    title: '音乐发布日期',
    dataIndex: 'ReleaseTime',
    key: 'releaseTime',
    ellipsis: true,
  }
]
const data = [];
export default {
  data(){
    return {
      data,
      columns,
    };
  },
  mounted(){
    this.getmusicdataprofit()
  },
  methods: {
    getmusicdataprofit(){
      this.$get("/api/v1.0/cloud/manage/getEverydayPofitList", {
          EndDate: '',
          MusicId: '',
          StartDate: '',
          UserId: '',
          Page: '',
          Size: ''
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            console.log(this.data)
          }
        });
    },
    onSearch(value){
        this.value = value
        this.getwithdrawal()
    },
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