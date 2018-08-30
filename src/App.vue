<template>
  <div id="app">
    <section id="main">
      <el-row type="flex" align="middle" justify="space-between" class="align-content: center;">
        <el-col style="flex: 0 0 8rem;">
          <span style="font-size: 2rem;">
            <b>Noah</b>
            <br>
            <i>Cardoza</i>
          </span>
        </el-col>
        <el-col align="right">
          <portal-target name="portal-header"></portal-target>
          <!-- <el-button icon="el-icon-more" circle></el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :gutter="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </section>
    <footer>
      Hosted with ❤️ by <b><a href="https://github.com/NoahCardoza/noahcardoza.github.io" target="_blank">GitHub</a></b>
      <br>
      With help from
        <a href="https://vuejs.org/" target="_blank">
          <img style="vertical-align:middle;" width="32px" src="https://raw.githubusercontent.com/vuejs/art/master/logo.png" alt="Vue">
        </a>
    </footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

//
// (function() {
//     var throttle = function(type, name, obj) {
//         obj = obj || window;
//         var running = false;
//         var func = function() {
//             if (running) { return; }
//             running = true;
//              requestAnimationFrame(function() {
//                 obj.dispatchEvent(new CustomEvent(name));
//                 running = false;
//             });
//         };
//         obj.addEventListener(type, func);
//     };
//
//     /* init - you can init any event */
//     throttle("resize", "optimizedResize");
// })();


export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*  */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}

section#main {
  flex: 1 0 auto;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
  padding: 20px;
}


footer {
  text-align: center;
  flex-shrink: 0;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
  padding: 20px;
}
</style>
