<template>
    <div id="personal-data" class="container">
        <form class="wrapper" @submit="checkForm">
            <div class="errors">
                <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </p>
            </div>        
            <input class="city personal-form-input full-grid-input" v-model="address.city" placeholder="City"/>
            <input class="street personal-form-input  full-grid-input" v-model="address.street" placeholder="Street"/>
            <input class="house personal-form-input  one-column-input" v-model="address.houseNumber" placeholder="House number"/>
            <input class="apartment personal-form-input  one-column-input" v-model="address.apartmentNumber" placeholder="Apartment number"/>
            <input class="phone personal-form-input  full-grid-input" v-model="phoneNumber" placeholder="Phone number"/>
            <input class="submit personal-form-input  full-grid-input" aria-label="Sumbit" type="submit" value="Send">
        </form>
       
    </div>
</template>

<script>
    import Address from './../models/Address.js'
    import Regex from './../models/Regex.js'

    export default {
        name: 'PersonalData',
        data(){
            return{
                errors: [],
                phoneNumber: null,
                address: new Address(null, null, null, null),
            } 
        },
        methods: {
            checkForm(e){         
                this.errors = [];

                this.checkAddress(this.address);
                this.checkPhoneNumber(this.phoneNumber);

                if(!this.errors.length) return true;
                e.preventDefault();            
            },
            checkAddress(address){
                this.$_checkCity(address.city);
                this.$_checkStreet(address.street);
                this.$_checkHouseNumber(address.houseNumber);
                this.$_checkApartmentNumber(address.apartmentNumber);
            },
            checkPhoneNumber(phoneNumber){
                if(!phoneNumber) 
                {
                    this.errors.push("Phone number required.");
                }
                else
                {
                    if(!Regex.validPhoneNumber(phoneNumber))
                    {           
                        this.errors.push("Incorrect phone number format.");                        
                    }
                }   
            },
            $_checkCity(city){
                if(!city)
                {
                    this.errors.push("City required.");
                }
                else
                {
                    if(!Regex.validCity(city))
                    {           
                        this.errors.push("Incorrect city format.");                        
                    }        
                }    
            },
            $_checkStreet(street){
                if(!street)
                {
                    this.errors.push("Street required.");
                }
                else
                {
                    if(!Regex.validStreet(street))
                    {           
                        this.errors.push("Incorrect street format.");                        
                    }        
                }    
            },          
            $_checkHouseNumber(houseNumber){
                if(!houseNumber)
                {
                    this.errors.push("House number required.");
                }
                else
                {
                    if(!Regex.validNumber(houseNumber))
                    {           
                        this.errors.push("Incorrect house number format.");                        
                    }        
                }    
            },
            $_checkApartmentNumber(apartmentNumber){
                if(!apartmentNumber){}
                else
                {
                    if(!Regex.validNumber(apartmentNumber))
                    {           
                        this.errors.push("Incorrect apartment number format.");                        
                    }        
                }    
            }
        }
    }
</script>

<style lang="scss">  
    $form-gap: 10px;
    $form-width: 250px;
    $form-column-width: $form-width / 2;
    $form-width-with-gap: $form-width + $form-gap;

    .personal-form-input{
        // min-height: 50px;
        font-size: 14px;
    }

    .full-grid-input{
        max-width: $form-width-with-gap;
    }

    .one-column-input{
        max-width: $form-column-width;
    }

    .container{
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        // background-color: darkorange;
    }

    .errors{
        grid-area: errors;
        font-size: 12px;
    }

    .city{
        grid-area: city;
    }

    .street {
        grid-area: street;
    }

    .house {
        grid-area: house;
    }

    .apartment{
        grid-area: apartment;
    }

    .phone {
        grid-area: phone;
    }

    .submit {
        grid-area: submit;
    }

    .wrapper{
        width: $form-width-with-gap;
        // background-color: rebeccapurple;
        display: grid;
        grid-gap: $form-gap;
        grid-auto-rows: auto;
        grid-template-columns: $form-column-width $form-column-width;
        grid-template-areas: 
            "errors errors"
            "city city"
            "street street"
            "house apartment"
            "phone phone"
            "submit submit";
    }
</style>



