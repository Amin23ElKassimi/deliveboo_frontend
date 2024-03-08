
<script>
  import AppHeader from './components/AppHeader.vue';

  export default{
    components: { AppHeader }
}
</script>
<template>
    <AppHeader/>
    <!-- # questo e' illuogo dove tutto puo' cambiare in base alle rotte -->
    <router-view></router-view>
</template>



<style lang="scss">
  @use './styles/general.scss' as *;

</style>
