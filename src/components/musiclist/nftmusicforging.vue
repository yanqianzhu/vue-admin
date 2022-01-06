<template>
  <div class="standard">
    <div class="title">
      音乐nft列表
    </div>
    <a-input-search placeholder="请输入音乐名称或者标题" enter-button @search="onSearch"/>
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
    title: '歌名',
    dataIndex: 'MusicName',
    key: 'musicName',
    ellipsis: true,
  },
  {
    title: '演唱',
    dataIndex: 'Singing',
    key: 'singing',
    ellipsis: true,
  },
  {
    title: '锻造数量',
    dataIndex: 'CastingCount',
    key: 'castingCount',
    ellipsis: true,
  },
  {
    title: '版权比例',
    dataIndex: 'CopyrightProportion',
    key: 'copyrightProportion	',
    ellipsis: true,
  },
  {
    title: '版权时长',
    dataIndex: 'CopyrightYear',
    key: 'copyrightYear',
    ellipsis: true,
  },
  {
    title: '单价',
    dataIndex: 'TotalPrice',
    key: 'totalPrice',
    ellipsis: true,
  },
  {
    title: '总价',
    dataIndex: 'UnitPrice',
    key: 'unitPrice',
    ellipsis: true,
  },
  {
    title: '查看详情',
    scopedSlots: { customRender: 'viewdetails' },
    key: 'viewdetails',
    ellipsis: true,
  },
  ]
export default {
  data() {
    return {
      columns,
      data: [],
      value: '',
      size: '',
      visible: false,
    };
  },
  mounted() { 
    this.getnftmusic()
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
    getnftmusic(){
      this.$get("/api/v1.0/cloud/music/getMusicNftList", {
          Page: '1',
          Size: this.size,
          UserId: '',
          Value: this.value,
        }).then((res) => {
          if (res.code == 0) {
            this.data = res.data.list
            this.size = res.data.Total
            console.log(this.data)
          }
        });
    },
    onSearch(value){
        this.value = value
        this.getnftmusic()
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