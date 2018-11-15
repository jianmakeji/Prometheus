<template>
  <div id="app">
    <FileDownload />
  </div>
</template>

<script>
import FileDownload from './components/fileDownload.vue'

export default {
  name: 'app',
  components: {
    FileDownload

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
