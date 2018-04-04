<template>
  <div id="order-board">
      <div v-for="(orderItem, index) in orderItems" :key="index">
          <div class="order-item-wrapper">
               <span class="count-area">{{orderItem.count}}x</span>
               <span class="pizza-name-area pizza-name">{{orderItem.pizza.name}}</span>
               <button class="operation-btn-area operation-btn" @click="decrementOrder(index)">-</button>
               <ul class="ingredients-list">
                   <li v-for="(ingredient, index2) in orderItem.pizza.ingredients" :key="index2">{{ingredient}}</li>
               </ul>    
          </div>    
      </div>
  </div>
</template>

<script>
    import Order from './../models/Order.js'
    import Pizza from './../models/Pizza.js'

    export default {
        data(){
            return{
                orderItems: [
                            new Order(2, new Pizza("Margherita", ["sos pom.", "ser", "peperoni"], 18.5, 18.5, 22.0, 24.5)),
                            new Order(1, new Pizza("Prosciutto", ["sos pom.", "ser", "szynka", "oregano"], 18.9, 18.9, 22.4, 24.8))
                            ]
            }
        },
        methods: {
            decrementOrder(index) {
                console.log(this.orderItems[index].count)
                this.orderItems[index].count--;
                console.log(this.orderItems[index].count)
                if(this.orderItems[index].count < 1)
                {
                    this.orderItems.splice(index, 1);
                }             
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './../styles/global.scss';
    // operation-btn
    // ingredients-list

    // variables
    $order-board-width: 54px + 150px + 54px;

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
        grid-template-columns: 54px 150px 54px;
        grid-template-areas: 
            "count pizza-name operation-btn"
            "count ingredients operation-btn"
    }
</style>
