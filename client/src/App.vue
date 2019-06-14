<template>
  <div id="app">
    <router-link to="/">Boards</router-link>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
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
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  body {
    background-color: #efefef;
  }
</style>