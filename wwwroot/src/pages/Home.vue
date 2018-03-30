<template>
  <div>
     <personal-data></personal-data>
  </div>
</template>

<script>
  import PersonalData from './../components/PersonalData.vue'
  
  export default {
     components: {
            'personal-data': PersonalData
        }
  }
</script>

<style lang="scss">
  .limiter{
    width: 100%;
    margin: 0 auto;
    background-color: mediumseagreen;
  }
</style>
