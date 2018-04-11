<template>
    <div id="pizza-menu">   
         <h2 class="uppercase">Pizza Menu</h2>
         <hr class="hr-pizza-menu"/>
         <div v-for="(pizza, index) in pizzas" :key="index">
             <div class="pizza-menu-wrapper">
                <span class="pizza-name pizza-name-area uppercase">{{ pizza.name }}</span>
                <div class="radio-wrapper">
                    <div class="radio-group" v-for="(size, sizeIndex) in sizes" :key="sizeIndex">
                        <input class="hidden radio" type="radio" :id="getDynamicId(pizza, index, size)" :value="size" v-model="pickedSize[index]"/>
                        <label class="radio-label" :for="getDynamicId(pizza, index, size)">
                            <span>{{ size }} cm</span>
                        </label>
                    </div>      
                </div>
                <span class="pizza-price-area">{{ getPrice(pizza, pickedSize[index]) }} zł</span>
                <button class="add-pizza-btn add-pizza-btn-area" @click="addPizzaToOrder(pizza, pickedSize[index])">+</button>
                <ul class="ingredients-area ingredients-list">
                    <li v-for="(ingredient, index) in pizza.ingredients" :key="index">{{ingredient}}</li>
                </ul>
             </div>          
             <hr class="hr-pizza-menu"/>
         </div>
    </div>
</template>

<script>
    export default {
        created(){
            this.getPizzas();
        },
        data(){
            return {
                pickedSize: [],
                sizes: []
            }
        },
        watch: {
            pizzas(newValue, oldValue){
                if(this.pizzas.length > 0)
                {             
                    this.sizes = Object.keys(this.pizzas[0].prices);
                    for (let i = 0; i < this.pizzas.length; i++) 
                    {
                        //set default size
                        this.pickedSize.push(this.sizes[0]);                         
                    }           
                }
                
            }
        },
        computed: {
            pizzas(){
                return this.$store.getters.pizzas;
            }
        },
        methods: {
            addPizzaToOrder(pizza, size){
                this.$store.commit('addPizzaToOrder', { pizza, size });
            },
            getPizzas(){
                this.$store.dispatch('getPizzas');
            },
            getDynamicId(pizza, pizzaIndex, size){
                return (pizza.name + this.pizzas.indexOf(pizza) + "-" + size).toLowerCase();
            },
            getPrice(pizza, size){
                return pizza.prices[size].toFixed(2);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './../styles/global.scss';
    @import url('https://fonts.googleapis.com/css?family=Gaegu');
    $menu-width: 320px + 100px + 80px;

    button:focus {outline:0;}

    #pizza-menu{
        padding: 1em;
        color: #c7c7c7;
        overflow: hidden;
    }

    .radio-wrapper {
        text-align: center;
        display: flex;
        align-items: flex-start;
    }
    
    .radio-group{
        margin-left: 0.6em;
    }

    .radio-label{
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3em 0.6em;
        margin: 0.2em;
        cursor: pointer;
        color: #292929;
        border-radius: 0.25em;
        background: #BFBFBF;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.22);
        transition: 0.1s;
        user-select: none;
    }

    .radio-label span {
        font-size: 0.7em;
        font-family: sans-serif;
    }

    .radio-label:hover{
        background: #D9D9D9;
        color: #3D3D3D;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.32);
    }

    .radio-label:active{
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.22);
    }

    .radio:checked + .radio-label{
        // background: #1a9e64;
        // color: #efefef;
        background: #1db473;
        color: #0D0D0D;
    }

    .radio:checked + .radio-label:hover{
        background: #22D386;
        color: #292929;
        // color: #e2e2e2;
    }

    .hidden{
        display: none;
    }

    h2{
        font-size: 1.3em;
        font-family: Gaegu, sans-serif;
        font-weight: 400;
        margin-left: 0.6em;
        // margin-top: 0.2em;
        color: #B0B0B0;
    }

    .pizza-name{
        margin-left: 0.5em;
        font-size: 1.6em;
        font-family: Gaegu, sans-serif;
        color: #20C57E;
    }

    .ingredients-list{
        display: inline;
        list-style: none;
        font-size: 1.4em;
        margin-left: 0.6em;
        font-family: Gaegu, sans-serif;

        li{
            display: inline;
        }

        li:after{
            content: ", ";
        }
    }

    .add-pizza-btn{
        width: 1.5em;
        height: 1.5em;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: 1.5px solid #20C57E;
        color: #20C57E;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        font-size: 1.5em;
        background-color: transparent;
    }

    .pizza-name-area {
        grid-area: pizza-name;
    }

    .pizza-size-area{
        grid-area: pizza-size;
    }

    .pizza-price-area {
        grid-area: pizza-price;
        align-items: center;
        align-self: center;
        justify-self: right;
        font-family: Gaegu, sans-serif; //delete
        font-size: 1.5em;
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
        grid-template-columns: 320px 100px 80px;
        grid-template-areas: 
            "pizza-name pizza-price add-pizza-btn"
            "pizza-size pizza-price add-pizza-btn"
            "ingredients pizza-price add-pizza-btn"
    }

    .hr-pizza-menu{
        display: block;
        width: $menu-width;
        height: 1px;
        border: 0;
        border-top: 1px solid #3b3b3b;
        margin: 1em 0;
        padding: 0;
    }
</style>
