
<script>
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';

  export default{
    components: { AppHeader, AppFooter }
}
</script>
<template>
    <AppHeader/>
    <!-- # questo e' illuogo dove tutto puo' cambiare in base alle rotte -->
    <router-view></router-view>

    <AppFooter/>
</template>



<style lang="scss">
  @use './styles/general.scss' as *;

</style>
