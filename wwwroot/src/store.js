import Vue from 'vue';
import Vuex from 'vuex';
import Order from './models/Order'
import Pizza from './models/Pizza'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        pizzas: [new Pizza("Margherita", ["sos pom.", "ser", "peperoni"], 18.5, 18.5, 22.0, 24.5), 
        new Pizza("Rzeźnicka", ["sos pom.", "ser", "peperoni", "kabanos", "wołowina"], 22.0, 22.0, 25.5, 27.4),
        new Pizza("Prosciutto", ["sos pom.", "ser", "szynka", "oregano"], 18.9, 18.9, 22.4, 24.8),
        new Pizza("Hawai", ["sos pom.", "ser", "szynka", "ananas", "oregano"], 21.9, 21.9, 24.0, 26.5)],
        order: [],
        totalCosts: 0.0
    },
    getters: {
        order(state) {
            return state.order;
        },
        pizzas(state){
            return state.pizzas;
        },
        totalCosts(state){
            state.totalCosts = 0;

            state.order.forEach(element => {
                state.totalCosts += (element.count * element.pizza.price);
            }); 

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
                    if(item.pizza.name == pizza.name)
                    {
                        if(JSON.stringify(item.pizza) === JSON.stringify(pizza))
                        {
                            isInOrder = true;            
                            item.count++;      
                        }
                    }                  
                });
            }

            if(!isInOrder)
            {
                state.order.push(new Order(1, pizza));
            }
        },
        removePizzaFromOrder(state, index){
            state.order[index].count--;
            if(state.order[index].count < 1)
            {
                state.order.splice(index, 1);
            }             
        }
    }
});