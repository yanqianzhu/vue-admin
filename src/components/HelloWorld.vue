<template>
  <div class="hello">
      <div style="padding:20px">
        <a-form layout="inline" :form="form" >
          <a-form-item
            label="报名状态"
          >
            <a-radio-group default-value='' @change="changeReport">
              <a-radio-button value="">
                全部
              </a-radio-button>
              <a-radio-button value="0">
                待确认
              </a-radio-button>
              <a-radio-button value="1">
                已确认
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="任务状态"
          >
            <a-radio-group default-value='' @change="changeTask" >
              <a-radio-button value="">
                全部
              </a-radio-button>
              <a-radio-button value="3">
                未开始
              </a-radio-button>
              <a-radio-button value="1">
                进行中
              </a-radio-button>
              <a-radio-button value="7">
                已结束
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="关键词"
            
          >
            <a-select v-decorator="['type', {
              initialValue: 'taskName'
            }]">
              <a-select-option value="taskName">
                任务名称
              </a-select-option>
              <a-select-option value="platformMarketingName">
                活动标题
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-input v-decorator="['key_word']"  placeholder="unavailable choice" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      
      <a-table :rowKey="record => record.task_id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onChange, getCheckboxProps: getCheckboxProps}" :pagination='false' :columns="columns" :data-source="data">
          <span slot="join_time" slot-scope="text">
              {{$moment(text).format('YYYY年MM月DD天 HH:mm:ss')}}
          </span>
          <span slot="end_time" slot-scope="text">
              {{$moment(text).format('YYYY年MM月DD天 HH:mm:ss')}}
          </span>
          <a slot="action" @click="find(text)" slot-scope="text">
              查看详情
          </a>
      </a-table>
      <div style="display:flex;justify-content:flex-end">
        <div>
            <a-pagination  v-model="page.current" :total="page.total" show-quick-jumper :page-size.sync="page.pageSize"   @change="onChangePage" />
        </div>
          
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'from' }),
      selectedRowKeys: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      data: [
        
      ],
      searchFrom: {

      },
      columns: [
        {
          dataIndex: 'task_no',
          title: '活动编号'
        },
        {
          dataIndex: 'join_time',
          title: '报名时间',
          scopedSlots: { customRender: 'join_time' }
        },
        {
          dataIndex: 'end_time',
          title: '活动时间',
          scopedSlots: { customRender: 'end_time' }
        },
        {
          dataIndex: 'name',
          title: '任务名称'
        },
        {
          dataIndex: 'platform_marketing_name',
          title: '活动标题'
        },
        {
          dataIndex: 'task_status',
          title: '状态'
        },
        {
          scopedSlots: { customRender: 'action' },
          title: '操作'
        },
      ]
    }
  },
  mounted() {
    localStorage.token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6IjEwMSIsInN1YiI6IjViMmExNTM1YjBiY2RmMDAwODhkN2NlYSIsImFwcGlkIjoiMTAxIiwiZXhwIjoxNTk1NDY4MjMwLCJqdGkiOiJWMy05T3IyWWxDVEpINHdhU0Mwbmx3IiwiaWF0IjoxNTk0ODYzNDMwLCJhdXRoX21vZGUiOiJtb2JpbGUiLCJhdXRoX2lkIjoiKzg2LTEzOTAyODc5NjgyIn0.8AgDTaczH2LTPZcfG1mFTCE45WSnz_RDdDh6dWFeAoI';
    this.fetch();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      var data = this.form.getFieldsValue();
      
      
      this.searchFrom[data.type] = data.key_word;
      
      this.page = {
        current: 1,
        pageSize: 10,
        total: 0
      }
      this.fetch();
    },
    changeReport (e) {
      this.searchFrom.affirmStatus = e.target.value;
      this.page = {
        current: 1,
        pageSize: 10,
        total: 0
      }
      this.fetch();
    },
    changeTask(e) {
      this.searchFrom.taskStatus = e.target.value;
      this.page = {
        current: 1,
        pageSize: 10,
        total: 0
      }
      this.fetch();
    },
    getCheckboxProps(record) {
      return {
        props: {
          disabled: record.name == '王植'
        }
      }
    },
    onChange(selectedRowKeys, selectedRow) {
      console.log(selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys;
    },
    onChangePage(n) {
      this.page.current = n;
      this.fetch();
    },
    find(text) {
      console.log(text)
    },
    fetch() {
        var obj = {
          ...this.searchFrom,
          limit: this.page.pageSize,
          page: this.page.current
        }
        this.$get('/fapi/activity/platformMarketing/joinList', obj).then((res) => {
          if (res.code == 0) {
            this.data = res.result.data;
            this.page.total = res.result.total
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
