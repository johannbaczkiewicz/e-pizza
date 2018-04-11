<template>
    <div class="pizza-menu">   
         <h2 class="uppercase">Pizza Menu</h2>
         <hr class="hr-pizza-menu"/>
         <div v-for="(pizza, index) in pizzas" :key="index">
             <div class="pizza-menu-wrapper">
                <span class="pizza-name pizza-name-area uppercase">{{ pizza.name }}</span>
                <div>
                    <div v-for="(size, sizeIndex) in sizes" :key="sizeIndex">
                        <input type="radio" :id="getDynamicId(pizza, index, size)" :value="size" v-model="pickedSize[index]"/>
                        <label :for="getDynamicId(pizza, index, size)">{{ size }} cm</label>
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

    .pizza-size-area{
        grid-area: pizza-size;
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
            "pizza-size pizza-price add-pizza-btn"
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
