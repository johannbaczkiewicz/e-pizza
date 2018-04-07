<template>
   <div id="order">
        <pizza-menu></pizza-menu>
        <order-board></order-board>
   </div>
</template>

<script>
  import PizzaMenu from './../components/PizzaMenu.vue'
  import OrderBoard from './../components/OrderBoard.vue'

  export default {
     components: {
            'pizza-menu': PizzaMenu,
            'order-board': OrderBoard
     }
  }
</script>

<style lang="scss">

</style>
