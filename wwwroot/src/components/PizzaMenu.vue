<template>
    <div class="pizza-menu">   
         <!-- <input type="radio" id="small-pizza" value="small" v-model="picked">
         <label for="small-pizza">32cm</label>
         <input type="radio" id="medium-pizza" value="medium" v-model="picked">
         <label for="medium-pizza">42cm</label>
         <input type="radio" id="large-pizza" value="large" v-model="picked">
         <label for="large-pizza">52cm</label>
         <br>
         <span>Picked: {{ picked }}</span> -->
         <h2 class="uppercase">Pizza Menu</h2>
         <hr class="hr-pizza-menu"/>
         <div v-for="(pizza, index) in pizzas" :key="index">
             <div class="pizza-menu-wrapper">
                <span class="pizza-name pizza-name-area uppercase">{{ pizza.name }}</span>
                <span class="pizza-price-area">{{ pizza.prices["32"].toFixed(2) }} zł</span>
                <button class="add-pizza-btn add-pizza-btn-area" @click="addPizzaToOrder(index)">+</button>
                <ul class="ingredients-area ingredients-list">
                    <li v-for="(ingredient, index) in pizza.ingredients" :key="index">{{ingredient}}</li>
                </ul>
             </div>          
             <hr class="hr-pizza-menu"/>
         </div>
    </div>
</template>

<script>
    // TODO:radio-buttons
    // https://codepen.io/raubaca/pen/ONzBxP
    // https://codepen.io/mblode/pen/gGIAm

    export default {
        created(){
            this.getPizzas();
        },
        computed: {
            pizzas(){
                return this.$store.getters.pizzas;
            }
        },
        methods: {
            addPizzaToOrder(index){
                this.$store.commit('addPizzaToOrder', index);
            },
            getPizzas(){
                this.$store.dispatch('getPizzas');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './../styles/global.scss';
    @import url('https://fonts.googleapis.com/css?family=Gaegu');
    $menu-width: 400px;

    button:focus {outline:0;}

    h2{
        font-size: 16px;
        font-family: Gaegu, sans-serif;
        font-weight: 400;
        color: darkgoldenrod;
    }

    .pizza-name{
        font-size: 16px;
        font-family: Gaegu, sans-serif;
        color: blue;
    }

    .ingredients-list{
        display: inline;
        list-style: none;
        font-size: 14px;
        font-family: Gaegu, sans-serif;

        li{
            display: inline;
        }

        li:after{
            content: ", ";
        }
    }

    .add-pizza-btn{
        width: 24px;
        height: 24px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: 1.5px solid dodgerblue;
        color: dodgerblue;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        font-size: 16px;
        background-color: transparent;
    }

    .pizza-name-area {
        grid-area: pizza-name;
    }

    .pizza-price-area {
        grid-area: pizza-price;
        align-items: center;
        align-self: center;
        justify-self: right;
        font-family: Gaegu, sans-serif; //delete
        font-size: 16px;
    }

    .add-pizza-btn-area {
        grid-area: add-pizza-btn;
        align-items: center;
        align-self: center;
        justify-self: right;
    }

    .ingredients-area {
        grid-area: ingredients;
    }

    .pizza-menu-wrapper{
        width: $menu-width;
        // margin-bottom: 4px;
        // background-color: rebeccapurple;
        display: grid;
        grid-auto-rows: auto;
        grid-template-columns: 270px 76px 54px;
        grid-template-areas: 
            "pizza-name pizza-price add-pizza-btn"
            "ingredients pizza-price add-pizza-btn"
    }

    .hr-pizza-menu{
        display: block;
        width: $menu-width;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    }
</style>
