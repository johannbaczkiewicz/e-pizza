import Vue from 'vue';
import Vuex from 'vuex';
import Order from './models/Order'
import Pizza from './models/Pizza'
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        pizzas: [],
        order: [],
        totalCosts: 0.00
    },
    getters: {
        order(state) {
            return state.order;
        },
        pizzas(state){
            return state.pizzas;
        },
        totalCosts(state){
            const result = state.totalCosts.toFixed(2);
            if(result === '-0.00')
            {
                state.totalCosts = 0.00;
            }
            
            return state.totalCosts.toFixed(2);
        }
    },
    mutations: {
        addPizzaToOrder(state, index) {
            const pizza = state.pizzas[index];
            let isInOrder = false;

            if(state.order.length > 0)
            {
                state.order.forEach(item => {
                    if(JSON.stringify(item.pizza) === JSON.stringify(pizza))
                    {
                        isInOrder = true;            
                        item.count++;      
                    }               
                });
            }

            if(!isInOrder)
            {
                state.order.push(new Order(1, pizza));
            }

            state.totalCosts += pizza.prices["32"];
        },
        removePizzaFromOrder(state, index) {      
            state.order[index].count--;
            state.totalCosts -= state.order[index].pizza.prices["32"];

            if(state.order[index].count < 1)
            {
                state.order.splice(index, 1);
            }                
        },
        getPizzas(state){
            state.pizzas = [];

            axios.get('http://localhost:5000/api/pizzas')
            .then(response => {
                const pizzas = response.data;                   
                    console.log("get pizzas");
                    pizzas.forEach(pizza => {             
                        state.pizzas.push(pizza);
                    });     
            })
            .catch(e => {
              this.errors.push(e)
            })
        },
        resetMenu(state){
            state.pizzas = [];
        }
    },
    actions: {
        getPizzas(context){
           context.commit('getPizzas');      
        }
    }
});