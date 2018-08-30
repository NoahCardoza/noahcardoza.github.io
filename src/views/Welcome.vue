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
          <el-menu-item v-for="item in elMenuItemsByMode" :key="item.route" :index="item.route">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
    </portal>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

const MOBILE_BREAKPOINT = 555;

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

let lastElMenuItemsByMode = null

export default {
  data(){
    const navbarItems = [
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
    ]

    return {
      navbarItems,
      navbarItemsReversed: navbarItems.slice().reverse(),
      screenWidth: window.innerWidth,
      elMenuShowDropdown: false
    }
  },
  mounted(){
    if (process.env.NODE_ENV == "development") {
      window.vm = this
    }
    window.addEventListener("optimizedResize", () => {
      if ((this.screenWidth < MOBILE_BREAKPOINT && window.innerWidth > MOBILE_BREAKPOINT) || (this.screenWidth > MOBILE_BREAKPOINT && window.innerWidth < MOBILE_BREAKPOINT)) {
        // console.log('Setting {screenWidth}');
        this.screenWidth = window.innerWidth
      }
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
      return this.screenWidth < MOBILE_BREAKPOINT
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
    },
    elMenuItemsByMode(){
      // console.log('eval (elMenuItemsByMode)', this.elMenuModeIsMobile);
      return this.elMenuModeIsMobile ? this.navbarItems : this.navbarItemsReversed
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

  #app ul.el-menu--horizontal {
    /* text-align: right; */
    /*  */
    /* -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg); */
  }

  #app ul.el-menu--horizontal li {
    /* display: inline-block; */
    float: right;
    /*  */
    /* -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg); */
  }

</style>
