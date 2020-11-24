<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');

#app {
  font-family: Helvetica, sans-serif;
  color: #111;
  min-height: 100vh;
}
 .nav-bar {
    margin: 0px;
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 1;
  }
.footer-container {
    position: static;
    width: 100%;
    padding: 2rem 0px 1rem;
    bottom: 0;
    padding-bottom: 0;
  }
</style>
