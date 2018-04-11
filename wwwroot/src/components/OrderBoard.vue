<template>
  <div id="order-board">
      <form class="form-wrapper" @submit.prevent="submit">
        <h2 class="header-area">My order:</h2>
            <div class="order-items-area" v-for="(item, index) in orderItems" :key="index">
                <div class="order-item-wrapper">
                    <span class="count-area">{{item.count}}x</span>
                    <span class="pizza-name-area pizza-name">{{item.pizza.name}}</span>
                    <span class="size-area size">{{item.size}} cm</span>
                    <span class="pizza-price-area">{{partialSumOfPrices(item)}} zł</span>
                    <button type="button" class="operation-btn-area operation-btn" @click="decrementOrder(index)">-</button>
                    <ul class="ingredients-list">
                        <li v-for="(ingredient, i) in item.pizza.ingredients" :key="i">{{ingredient}}</li>
                    </ul>    
                </div>    
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
    $order-board-width: 54px + 150px + 76px + 54px;

    // local
    button:focus {outline:0;}

    .short{
       width: 120px;
       justify-self: right;
    }

    .size{
        font-size: 10px;
        color: green;
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
        grid-template-columns: 54px 150px 76px 54px;
        grid-template-areas: 
            "count pizza-name pizza-price operation-btn"
            "count size pizza-price operation-btn"
            "count ingredients pizza-price operation-btn"
    }
</style>
