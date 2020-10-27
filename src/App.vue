<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-container {
  position: sticky;
  top: 0;
}

#nav {
  padding-top: 0.1vw;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  top: 0;
}

.navbar .sticky-top {
  position: fixed;
  overflow: visible;
  width: 100%;
  top: 0;
}

#nav a {
  font-weight: bold;
  font-size: 1em;
  color: #2c3e50;
}

#nav h1 {
  margin: 0px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
