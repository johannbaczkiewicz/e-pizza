import Vue from 'vue';
import Vuex from 'vuex';
import OrderItem from './models/OrderItem'
import Pizza from './models/Pizza'
import axios from 'axios'
import config from './../../config.json'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        pizzas: [],
        orderItems: [],
        totalCosts: 0.00,
        errors: [],
        config: config
    },
    getters: {
        serverAddress(state){
            let obj =  JSON.parse(JSON.stringify(state.config))
            return obj.webapi_server_address;
        },
        orderItems(state) {
            return state.orderItems;
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
        addPizzaToOrder(state, { pizza, size }) {
            let isInOrder = false;

            if(state.orderItems.length > 0)
            {
                state.orderItems.forEach(item => {
                    if(JSON.stringify(item.pizza) === JSON.stringify(pizza) && item.size === size)
                    {
                        isInOrder = true;            
                        item.count++;      
                    }               
                });
            }

            if(!isInOrder)
            {
                state.orderItems.push(new OrderItem(1, pizza, size));
            }

            state.totalCosts += pizza.prices[size];
        },
        removePizzaFromOrder(state, index) {      
            state.orderItems[index].count--;
            const size = state.orderItems[index].size;
            state.totalCosts -= state.orderItems[index].pizza.prices[size];

            if(state.orderItems[index].count < 1)
            {
                state.orderItems.splice(index, 1);
            }                
        },
        getPizzas(state){
            state.pizzas = [];
            const srvAddress = store.getters.serverAddress;

            axios.get(srvAddress + 'api/pizzas')
            .then(response => {
                const pizzas = response.data;                   
                    console.log("get pizzas");
                    pizzas.forEach(pizza => {             
                        state.pizzas.push(pizza);
                    });     
            })
            .catch(e => {
                state.errors.push(e);
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