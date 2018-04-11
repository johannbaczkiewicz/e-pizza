<template>
   <div class="bg flexcenter" id="order">
     <div class="order">
        <pizza-menu></pizza-menu>
        <order-board></order-board>
     </div>
    
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
  @import './../styles/global.scss';

  .flexcenter{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .order{
    overflow: hidden;
    display: flex;
    align-items: flex-start;
  }
</style>
