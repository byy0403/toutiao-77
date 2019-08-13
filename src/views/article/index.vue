<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px"></el-image>
            <div slot="error">
              <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button plain @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:15px; text-align:center"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channer_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 日期
      tableData: [],
      dateArr: [],
      total: 0
    }
  },
  mounted () {
    this.getArticleOptions()
  },
  methods: {
    // 获取文章数据
    async getArticleOptions () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticleOptions()
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      this.getArticleOptions()
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 严谨，清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 请问是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.getArticleOptions()
        })
        .catch(() => {})
    },
    // 编辑文章
    edit (id) {
      this.$router.push('/publish?id=' + id)
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
