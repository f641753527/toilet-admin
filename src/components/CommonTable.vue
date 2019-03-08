<template>
    <div>
        <el-table :data="tableData" :stripe='config.stripe' @row-click='config.rowClick' :size='config.size' :border="config.border" 
          :highlight-current-row='config.highlightCurrentRow' @selection-change='config.selectionChange'>
          
          <el-table-column v-if='config.multipleRowSelect'  type="selection" width="30"></el-table-column>
          <el-table-column v-else  type="index" width="30"></el-table-column>
          <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :label="column.label" align="center">
            <template slot-scope="scope">
              <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
            
        <div class="block">
          <el-pagination small :current-page="config.page_index" :page-size="config.page_size" @current-change="config.currentChange" 
            @size-change='config.sizeChange' layout="total, sizes, prev, pager, next, jumper" :total="config.total">
          </el-pagination>
        </div>
    </div>
        
</template>

<script>
export default {
  data() {
    return {
      defaultConfig: { // 默认配置
        // table 属性
        size: 'mini', // 表格大小
        stripe: true, // 是否为斑马纹 table
        border: false,  // 是否带有纵向边框
        highlightCurrentRow: false, // 是否要高亮当前行
        multipleRowSelect: false,   // 是否支持表格行多选

        //  分页
        page_size: 10,
        page_index: 0,
        total: 0,

        /* 分页事件 */

        // 页码改变
        currentChange: (page) => {},

        // pagesize改变
        sizeChange: (size) => {},

        /*  表格事件  */

        // 单击表格行事件
        rowClick: (row, event, column) => {},

        //  当选择项发生变化时会触发该事件
        selectionChange: (selection) => {},

      },
    };
  },
  props: {
    tableData: {
      type: Array,
    },
    columns: {
      type: Array,
    },

    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    config() {
      return Object.assign({}, this.defaultConfig, this.options); // 拿外部options覆盖默认配置
    },
  },
  components: {
    'my-render': {
      functional: true,
      props: {
        row: {
          type: Object,
        },
        render: {
          type: Function,
        },
      },
      render: (h, ctx) => {
        return ctx.props.render(h, ctx.props.row);
      },
    },
  },
};
</script>

<style>
.block .el-pagination{
  margin-top: 30px;
  text-align: center;
}
</style>
