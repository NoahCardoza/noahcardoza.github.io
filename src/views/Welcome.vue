<template>
  <div class="">
    <portal to="portal-header">
      <div class="navbar">
        <div v-if="elMenuModeIsMobile" class="">
          <el-checkbox-button v-model="elMenuShowDropdown" id="btn-dropdown">
            {{currentRouteName}}<span><i class="el-icon-more"></i></span>
          </el-checkbox-button>
        </div>
        <el-menu :class="{'mobile-view': elMenuModeIsMobile, 'hide-mobile-view': !elMenuShouldShow}" :mode="elMenuMode" :router="true" :default-active="$route.path">
          <el-menu-item v-for="item in navbarItems" :index="item.route">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
    </portal>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
})();

export default {
  data(){
    return {
      navbarItems: [
        {
          name: 'Welcome',
          route: '/welcome'
        },
        {
          name: 'About',
          route: '/welcome/about'
        },
        {
          name: 'Classes',
          route: '/welcome/classes'
        },
        {
          name: 'Projects',
          route: '/welcome/projects'
        }
      ],
      screenWidth: window.innerWidth,
      elMenuShowDropdown: false
    }
  },
  mounted(){
    window.vm = this
    window.addEventListener("optimizedResize", () => {
      this.screenWidth = window.innerWidth
    });
  },
  computed: {
    elMenuShouldShow(){
      return !this.elMenuModeIsMobile || this.elMenuShowDropdown
    },
    elMenuMode(){
      return this.elMenuModeIsMobile ? 'vertical' : 'horizontal'
    },
    elMenuModeIsMobile(){
      return this.screenWidth < 555
    },
    currentRouteName(){
      return this.navbarItems.map(i => ({
        ...i,
        match: this.$route.path.replace(i.route, '').length
      })).reduce((bestMatch, next) =>
        !bestMatch || next.match < bestMatch.match
        ? next
          : bestMatch
      , null).name
    }
  },
  watch: {
    elMenuShowDropdown(newVal){
      if (newVal){
        document.addEventListener("click", e => {
          if (!e.path.map(el => el.id).includes('btn-dropdown')) {
            this.elMenuShowDropdown = false
          }
        }, {once : true});
      }
    }
  }
}
</script>

<style>
  #app #btn-dropdown .el-checkbox-button__inner {
    border-right: none;
    border-radius: 10px 200px 200px 10px;
    padding: 0;
    padding-left: 12px;
  }

  #app #btn-dropdown .el-checkbox-button__inner span {
    display: inline-block;
    padding: 16px;
    border-radius: 100%;
    border: 1px solid #dcdfe6;
    margin-left: 12px;
    background-color: #eee;
    line-height: 1;
  }

  #app #btn-dropdown.is-checked .el-checkbox-button__inner span  {
    background-color: #5CAAFA;
  }

  #app #btn-dropdown.is-focus .el-checkbox-button__inner span  {
    border-color: #409EFF;
  }

  #app .mobile-view {
    border: 1px solid #eee;
    z-index: 1000;
    position: absolute;
    right: 1rem;
    top: 5rem;
  }

    #app .hide-mobile-view {
      display: none;
    }

  #app .el-menu--horizontal {
    text-align: right;
  }

  #app .el-menu--horizontal li {
    display: inline-block;
    float: right;
  }
  /* display: inline-block; text-align: center; */
  /* nav{} */
/* nav li{display: inline-block; text-align: center;} */
</style>
