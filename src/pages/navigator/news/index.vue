<template>
  <div class="news">
    <p class="options">
      <el-button type="text" @click="add_flag = true">新增</el-button>
    </p>
    <common-table :tableData='tableData' :columns='columns' :options='options'></common-table>

    <!-- <el-dialog></el-dialog> -->
    <el-dialog title="新增" :visible.sync="add_flag" :close-on-click-modal='false' :close-on-press-escape='false'>
      <el-form :model="news_form" size='mini' :rules='add_rule' ref='addNews'>
        <el-form-item label="文章标题" label-width="80px" prop='title'>
          <el-input v-model="news_form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章封面" label-width="80px" prop='cover_img'>
          <el-input v-model="news_form.cover_img"></el-input>
        </el-form-item>
        <el-form-item label="文章链接" label-width="80px" prop='link'>
          <el-input v-model="news_form.link"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="reset">取 消</el-button>
        <el-button size='mini' type="primary" @click="add_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable';
import Axios from '@/api/request';
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      news_type: 0,
      tableData: [{title: 'title'}],
      columns: [
        {
          prop: 'title',
          label: '标题',
        },
        {
          prop: 'cover_img',
          label: '封面',
         
        },
        {
          prop: 'link',
          label: '链接',
        },
        {
          label: '操作',
          render: (h, row) => {
            return h('el-button', {
              style: { color: 'red' },
              props: { type: 'text' },
              on: { click: () => { this.del_line(row) } },
            }, '删除');
          }
        },
      ],
      options: {
        page_size: 10,
        page_index: 0,
        total: 0,
        currentChange: this.currentChange,
        sizeChange: this.sizeChange
      },
      // modal
      add_flag: false,
      news_form: {
        title: '',
        cover_img: '',
        link: ''
      },
      add_rule: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请输入文章封面链接', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入文章链接地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    del_line(row) {
      MessageBox.confirm('确定删除吗?', '警告', { type: 'warning' }).then(() => {
        Axios.post('/admin/news/del', {
          data: { id: row.id }
        }).then(() => {
          this.get_news();
        });
      });
    },
    get_news() {
      Axios.get('/admin/news/list', {
        params: {
          type: this.news_type,
          page_index: this.options.page_index,
          page_size: this.options.page_size
        }
      }).then((res) => {
        this.tableData = res.list || [];
        this.options.total = res.total;
      });
    },
    currentChange(page_index) {
      this.options.page_index = page_index - 1;
      this.get_news();
    },
    sizeChange(page_size) {
      this.options.page_size = page_size;
      this.options.page_index = 0;
      this.get_news();
    },
    enter() {
      this.news_type = parseInt(this.$route.params.type);
      this.get_news();
    },
    //  添加
    add_submit() {
      this.$refs.addNews.validate((valid) => {
        if (valid) {
          this.add_api();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.add_flag = false;
      this.$refs.addNews.resetFields();
    },
    add_api() {
      Axios.post('/admin/news/add', {
        data: {
          ...this.news_form,
          type: this.news_type
        }
      }).then(() => {
        this.get_news();
        this.reset();
      });
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.enter();
      },
    }
  },
  mounted() {
    this.enter();
  },
  components: { CommonTable },
}
</script>

<style lang="scss" scoped>
.news{
  padding: 30px 40px;
}
</style>
