<template lang="html">
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>Classes - ATeam: Assignments</h1>
      </div>
      <!-- <el-card class="box-card" shadow="false" style="margin: 2rem 0;">
        <div slot="header" class="clearfix">
            <b>{{cls.title}}</b>
        </div>
        <vue-markdown :source="cls.markdown || markdownFromClass(cls)" :anchorAttributes="{target: '_blank'}"></vue-markdown>
      </el-card> -->
      <!--  -->
      <el-tabs :value="defaultTab" @tab-click="handleTabClick">
        <el-tab-pane v-for="cls in classes" :label="cls.title" :name="cls.id">
          <class-tab-body :cls="cls"/>
        </el-tab-pane>


      </el-tabs>

    </el-card>
  </div>
</template>

<!-- <template lang="html">
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>Classes - ATeam: Assignments</h1>
      </div>
      <el-tabs :value="defaultTab" @tab-click="handleTabClick">
        <el-tab-pane v-for="cls in classes" :label="cls.title" :name="cls.id">
          <vue-markdown :source="cls.markdown || markdownFromClass(cls)"
          :anchorAttributes="{
            target: '_blank',
            onclick:  `handleMarkdownLinks(this, '${cls.git}wk${paddWeek(cls.week)}/')`
          }"></vue-markdown>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template> -->

<script>
import ClassTabBody from './ClassTabBody.vue'

const calculateWeeksBetween = (d1, d2) =>
    Math.floor(Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24 * 7))

export default {
  components: {
    ClassTabBody
  },
  data(){
    return {
      classes: [
        {
          id: 'python3',
          title: 'Introduction to Python',
          git: 'https://github.com/NoahCardoza/teaching-curriculum/blob/master/python3/',
          raw_git: 'https://raw.githubusercontent.com/NoahCardoza/teaching-curriculum/master/python3/',
          files: [
            'README.md'
          ],
          startdate: new Date("Tue Aug 28 2018"),
          week: calculateWeeksBetween(new Date("Tue Aug 28 2018"), new Date()),
          markdown: null
        },
        {
          id: 'scratch',
          title: 'Introduction to Scratch',
          git: 'https://github.com/NoahCardoza/teaching-curriculum/blob/master/scratch/',
          raw_git: 'https://raw.githubusercontent.com/NoahCardoza/teaching-curriculum/master/scratch/',
          files: [
            'README.md'
          ],
          startdate: new Date("Tue Aug 28 2018"),
          week: calculateWeeksBetween(new Date("Tue Aug 28 2018"), new Date()),
          markdown: null
        }
      ]
    }
  },
  mounted(){
    window.vc = this
  },
  computed: {
    defaultTab(){
      const defaultTabId = this.$route.params.classId || (this.classes[0] || {}).id
      if (!this.$route.params.classId && defaultTabId){
        this.$router.push({
          params: {
            classId: defaultTabId
          }
        })
      }
      return defaultTabId
    }
  },
  methods: {
    handleTabClick(tab){
      this.$router.push({
        params: {
          classId: tab.name
        }
      })
    }
  }
}
</script>

<style lang="css">

code {
  font-family: Courier, 'New Courier', monospace;
  color: #ff2449;
  background-color: #f1f1f1;
  border: #e0e0e0 solid 1px;
  border-radius: 3px;
  padding: .1rem;
  line-height: 1.7rem;
}

</style>
