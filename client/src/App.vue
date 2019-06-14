<template>
  <div id="app">
    <div class="nav-bar container-fluid">
      <div class="row" id="nav">
        <router-link to="/" class="app-title">Cello</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgba(10, 10, 10, 0.7);
    height: 50px;
    z-index: 1;
  }

  h1 {
    z-index: 2;
  }

  #nav {
    padding: 0 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-active {
        color: #17a2b8;
      }
    }
  }


  body {
    background-color: #efefef;
  }

  a.router-link-active.app-title {
    font-size: 36px;

    &:hover {
      text-decoration: none;
    }
  }
</style>