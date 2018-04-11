<template>
  <div id="order-board">
      <form class="form-wrapper" @submit.prevent="submit">
        <h2 class="uppercase header-area">My order:</h2>
            <div class="order-items-area" v-for="(item, index) in orderItems" :key="index">
                <div class="order-item-wrapper">
                    <span class="count-area count">{{item.count}}x</span>
                    <span class="pizza-name-area pizza-name">{{item.pizza.name}}</span>
                    <span class="size-area size">{{item.size}} cm</span>
                    <span class="pizza-price-area price">{{partialSumOfPrices(item)}} zł</span>
                    <button type="button" class="operation-btn-area remove-pizza-btn" @click="decrementOrder(index)">-</button>
                    <ul class="ingredients ingredients-list">
                        <li v-for="(ingredient, i) in item.pizza.ingredients" :key="i">{{ingredient}}</li>
                    </ul>    
                </div>    
                <hr class="hr-pizza-menu"/>
            </div>    
            <span class="total-area">total costs: {{totalCosts}} zł</span>
            <span>{{address.city}} ul. {{address.street}} {{address.houseNumber}}</span>
            <button class="submit-area short" type="submit">Send order</button>
        </form>
  </div>
</template>

<script>
    //TODO:
    //dodaj nowy model Order
    //dodać guid? id do zamówienia
    //nie wysyłaj zamówienia jeśli jest puste
    //FIXME:
    //zmień model Order na OrderItem 
    import Order from './../models/Order.js'
    import axios from 'axios'

    export default {
        beforeUpdate() {
            if(localStorage.getItem("personalData") === null){
                this.$router.push({path: '/'});
            }
        },
        computed: {
            serverAddress(){
                return this.$store.getters.serverAddress;
            },
            orderItems() {
                 return this.$store.getters.orderItems;
            },
            totalCosts() {
                 return this.$store.getters.totalCosts;
            },
            address(){
                let data = localStorage.getItem("personalData");
                return (JSON.parse(data)).address;
            }
        },
        methods: {
            decrementOrder(index) {
                this.$store.commit('removePizzaFromOrder', index);    
            },
            partialSumOfPrices(item) {
                return (item.pizza.prices[item.size] * item.count).toFixed(2);
            },
            submit(e){
                const personalData = JSON.parse(localStorage.getItem("personalData"));
                const orderItems = this.orderItems;

                const order = new Order(personalData, orderItems);

                if(order.orderItems.length > 0)
                {
                    axios.post(this.serverAddress + 'api/order', JSON.stringify(order),
                    { headers: { 'Content-Type': 'application/json' } })
                        .then(response => {
                            const result = response.data;    
                                console.log(result);
                                console.log(response);
                                return true;
                        })
                        .catch(error => {
                            console.log(error);
                            e.preventDefault();
                        })
                }
                else
                {
                    e.preventDefault();
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
    $order-board-width: 60px + 260px + 80px + 60px;

    // local
    button:focus {outline:0;}

    .short{
       width: 120px;
       justify-self: right;
    }

    #order-board{
        padding: 1em;
        padding-left: 4em;
        color: #c7c7c7;
        overflow: hidden;
    }

    h2{
        font-size: 1.2em;
        color: #B0B0B0;
        margin-left: 0.4em;
        font-weight: 400;
    }

    hr{
        display: block;
        width: $order-board-width;
        height: 1px;
        border: 0;
        border-top: 1px solid #3b3b3b;
        margin: 1em 0;
        padding: 0;
    }

    .count, .price, .pizza-name, .ingredients, h2{
        font-family: Gaegu, sans-serif;    
    }

    .count, .price, .pizza-name{
        font-size: 1.5em;
    }

    .ingredients{
         font-size: 1.2em;
    }

    .remove-pizza-btn{
        width: 1.4em;
        height: 1.4em;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: 1.5px solid #20C57E;
        color: #20C57E;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        font-size: 1.4em;
        background-color: transparent;
    }

      .pizza-name{
        // margin-left: 0.5em;
        // font-size: 1.6em;
        color: #20C57E;
    }

    .size{
        font-size: 0.9em;
        color: #20C57E;
    }

    // .header-area{
    //     grid-area: header;
    // }

    // .order-items-area{
    //      grid-area: order-items;
    // }

    // .total-area{
    //     grid-area: total;
    // }

    // .submit-area{
    //     grid-area: submit;
   
    // }

    .form-wrapper{
        display: grid;
        width: $order-board-width;
        grid-auto-rows: auto;
        grid-template-columns: $order-board-width;
        // grid-template-areas: 
        //     "header"
        //     "order-items"
        //     "total"
        //     "submit"
    }

    .count-area{
        grid-area: count;
        align-items: center;
        align-self: center;
        justify-self: center;
    }

    .pizza-name-area{
        grid-area: pizza-name;
    }

    .size-area{
        grid-area: size;
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
        grid-template-columns: 60px 220px 100px 60px;
        grid-template-areas: 
            "count pizza-name pizza-price operation-btn"
            "count size pizza-price operation-btn"
            "count ingredients pizza-price operation-btn"
    }
</style>
