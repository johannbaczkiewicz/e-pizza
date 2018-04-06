<template>
  <div id="order-board">
      <h2>My order:</h2>
      <div v-for="(item, index) in order" :key="index">
          <div class="order-item-wrapper">
               <span class="count-area">{{item.count}}x</span>
               <span class="pizza-name-area pizza-name">{{item.pizza.name}}</span>
               <span class="pizza-price-area">{{sumPrice(item)}} zł</span>
               <button class="operation-btn-area operation-btn" @click="decrementOrder(index)">-</button>
               <ul class="ingredients-list">
                   <li v-for="(ingredient, i) in item.pizza.ingredients" :key="i">{{ingredient}}</li>
               </ul>    
          </div>    
      </div>
      <span>total costs: {{totalCosts}} zł</span>
  </div>
</template>

<script>
    import Order from './../models/Order.js'
    import Pizza from './../models/Pizza.js'

    export default {
        computed: {
            order() {
                 return this.$store.getters.order;
            },
            totalCosts() {
                 return this.$store.getters.totalCosts;
            }
        },
        methods: {
            decrementOrder(index) {
                this.$store.commit('removePizzaFromOrder', index);    
            },
            sumPrice(item) {
                return (item.pizza.price * item.count).toFixed(2);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './../styles/global.scss';
    // operation-btn
    // ingredients-list

    // variables
    $order-board-width: 54px + 150px + 76px + 54px;

    // local
    button:focus {outline:0;}

    .count-area{
        grid-area: count;
        align-items: center;
        align-self: center;
        justify-self: center;
    }

    .pizza-name-area{
        grid-area: pizza-name;
    }

    .pizza-price-area{
        grid-area: pizza-price;
        align-items: center;
        align-self: center;
        justify-self: center;
    }

    .operation-btn-area{
        grid-area: operation-btn;
        align-items: center;
        align-self: center;
        justify-self: right;
    }

     .order-item-wrapper{
        width: $order-board-width;
        // background-color: rebeccapurple;
        display: grid;
        grid-auto-rows: auto;
        grid-template-columns: 54px 150px 76px 54px;
        grid-template-areas: 
            "count pizza-name pizza-price operation-btn"
            "count ingredients pizza-price operation-btn"
    }
</style>
