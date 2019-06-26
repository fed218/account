<template>
  <div id="app">
    <Alert></Alert>

    <router-view/>
  </div>
</template>

<script>
import Alert from './components/Alert.vue';

export default {
  name: 'App',
  components: {
    Alert,
  },
};
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>
