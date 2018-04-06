<template>
  <div>
     <!-- <personal-data></personal-data> -->
     <pizza-menu></pizza-menu>
     <order-board></order-board>
  </div>
</template>

<script>
  import PersonalData from './../components/PersonalData.vue'
  import PizzaMenu from './../components/PizzaMenu.vue'
  import OrderBoard from './../components/OrderBoard.vue'

  export default {
     components: {
            'personal-data': PersonalData,
            'pizza-menu': PizzaMenu,
            'order-board': OrderBoard
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
