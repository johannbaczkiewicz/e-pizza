<template>
    <div id="personal-data">
        <form @submit="checkForm">
             <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </p>
            <input v-model="phoneNumber" placeholder="Phone number"/>
            <input v-model="address.street" placeholder="Street"/>
            <input v-model="address.city" placeholder="City"/>
            <input v-model="address.zipCode" placeholder="Zip Code"/>
            <input aria-label="Sumbit" type="submit" value="Send">
        </form>
       
    </div>
</template>

<script>
    import Address from './../models/Address.js'
    import Regex from './../models/Regex.js'

    export default {
        data(){
            return{
                errors: [],
                phoneNumber: null,
                address: new Address(null, null, null),
            } 
        },
        methods: {
            checkPhoneNumber(){
                if(!this.phoneNumber) 
                {
                    this.errors.push("Phone number required.");
                }
                else
                {
                    if(!Regex.validPhoneNumber(this.phoneNumber))
                    {           
                        this.errors.push("Incorrect phone number format.");                        
                    }
                }   
            },
            checkStreet(){
                if(!this.address.street)
                {
                    this.errors.push("Street required.");
                }
                else
                {
                    if(!Regex.validStreet(this.address.street))
                    {           
                        this.errors.push("Incorrect street format.");                        
                    }        
                }    
            },
            checkCity(){
                if(!this.address.city)
                {
                    this.errors.push("City required.");
                }
                else
                {
                    if(!Regex.validCity(this.address.city))
                    {           
                        this.errors.push("Incorrect city format.");                        
                    }        
                }    
            },
            checkZipCode(){
                if(!this.address.zipCode)
                {
                    this.errors.push("Zip code required.");
                }
                else
                {
                    if(!Regex.validZipCode(this.address.zipCode))
                    {           
                        this.errors.push("Incorrect zip code format.");                        
                    }        
                }    
            },
            checkForm(e){         
                this.errors = [];

                this.checkPhoneNumber();
                this.checkZipCode();
                this.checkStreet();
                this.checkCity();

                if(!this.errors.length) return true;
                e.preventDefault();            
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        box-sizing: border-box;
    }
    ul, li{
        list-style-type: none;
        padding: 0;
    }
    form, input{
        display: block;
    }
    input{
        margin-top: 24px;
    }
</style>



