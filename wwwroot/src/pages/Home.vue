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
