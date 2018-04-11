<template>
    <div id="personal-data" class="bg">
       <div class="flex-container">
           <section class="content">
              <svg class="ribbon" version="1.1" viewBox="0 0 159.80591 37.420471" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(.74436 0 0 .74436 1265.9 -161.43)">
                    <path class="ribbon-color" d="m-1700.6 230.1 10.424 18.521-10.424 18.521h49.839v-37.042zm164.85 0v37.042h49.839l-10.424-18.521 10.424-18.521z"/>
                    <path d="m-1650.8 267.14-18.278-13.229 18.153-11.355z" fill="#105034"/>
                    <path d="m-1535.7 267.14 18.278-13.229-18.153-11.355z" fill="#105034"/>
                    <rect class="ribbon-color" x="-1669" y="216.87" width="151.57" height="37.042"/>
                    <text class="ribbon-text" x="-1651" y="240"  xml:space="preserve"><tspan>Bon Appetit!</tspan></text>
                    </g>
                </svg>
                <form class="personal-form-wrapper" @submit.prevent="submitData">
                    <div class="errors">
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                            </ul>
                        </p>
                    </div>    
                    <div class="city relative">
                        <label for="city" class="form-label uppercase">City</label>    
                        <input name="city" class="personal-form-input full-grid-input" v-model="address.city"/>
                        <span class="input-focus"></span>
                    </div>
                    <div class="street relative">
                        <label for="street" class="form-label uppercase">Street</label>    
                        <input name="street" class="personal-form-input full-grid-input" v-model="address.street"/>
                        <span class="input-focus"></span>
                    </div>
                    <div class="house relative">
                        <label for="houseNumber" class="form-label uppercase">House number</label>    
                        <input name="houseNumber" class="personal-form-input one-column-input" v-model="address.houseNumber"/>
                        <span class="input-focus"></span>
                    </div>
                    <div class="apartment relative">
                        <label for="apartmentNumber" class="form-label uppercase">Apartment</label>    
                        <input name="apartmentNumber" class="personal-form-input one-column-input" v-model="address.apartmentNumber"/>
                        <span class="input-focus"></span>
                    </div>
                    <div class="phone relative">
                        <label for="phoneNumber" class="form-label uppercase">Phone number</label>    
                        <input name="phoneNumber" class="personal-form-input full-grid-input" v-model="phoneNumber"/>
                        <span class="input-focus"></span>
                    </div>
                  
                    <button class="form-button full-grid-input uppercase submit" aria-label="Sumbit" type="submit">Continue</button>
                </form>
           </section>
       </div>   
    </div>
</template>

<script>
    import CustomerData from './../models/CustomerData.js'
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
            submitData(e){
                const result = this.checkForm();

                if(result == true)
                {
                    const personalData = new CustomerData(this.phoneNumber, this.address);
                    localStorage.setItem("personalData", JSON.stringify(personalData));
                    this.$router.push({ path: 'order' })
                }
                e.preventDefault();      
            },
            checkForm(){         
                this.errors = [];

                this.checkAddress(this.address);
                this.checkPhoneNumber(this.phoneNumber);   
                
                if(!this.errors.length) return true;
                return false;
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

<style lang="scss" scoped>  
    @import './../styles/global.scss';
    @import url('http://fonts.googleapis.com/css?family=Amatic+SC&subset=latin,latin-ext'); //..
    @import url('http://fonts.googleapis.com/css?family=Anaheim&subset=latin,latin-ext');
    @import url('https://fonts.googleapis.com/css?family=Great+Vibes');
    @import url('https://fonts.googleapis.com/css?family=Mr+Dafoe');

    $focus-height: 0.05em;
    $form-gap: 24px;
    $column-count: 2;
    $form-width: 240px;
    $form-column-width: $form-width / $column-count;
    $form-width-with-gap: $form-width + ($form-gap * ($column-count - 1));

    .ribbon{
        width: $form-width-with-gap;
        height: auto;
        user-select: none;
    }

    .ribbon-color{
        fill: #1a9e64;
        //1fc17b
        //1a9e64
    }

    .ribbon-text{
        font-size: 22px;
        letter-spacing: 1.5px;
        fill: #1c1c1c;
        // fill: #c7c7c7;
        // font-weight: 600;
        font-family: 'Mr Dafoe', cursive;
        text-align: center;
    }

    .flex-container{
            height: 100vh; 
            display: flex;
            align-items: center;
            justify-content: center;
    }

    .content{
        // background-color: red;
        height: auto;
        width: auto;
    }

    .form-label{
        padding-left: 1px;
        font-size: 0.84em;
        font-weight: 400;
        font-family: 'Anaheim', sans-serif;
        // line-height: 1.5;
        color: #adadad;
        letter-spacing: 0.2em;
        text-align: left;
    }

    .children-block *{
        display: block;
    }

    .relative{
        position: relative;
    }

    // .bg{
    //     background-image: url("./../../resources/img/black_paper.png");
    //     background-repeat: repeat;
    //     height: 100vh;
    // }

    .form-button{
        margin-top: 18px;
        font-size: 12px;
        color: #c7c7c7;
        background: transparent;
        line-height: 1.2;
        height: 32px;
        border: 1px solid #adadad;
        outline: 0;
        transition: all 0.13s ease;
        // box-shadow: 2px 2px 4px #555555;
        &:hover, &:focus{
             border: 1px solid #1a9e64;   
             color: #1a9e64;       
        }
    }

    .personal-form-input{
        // min-height: 50px;
        font-family: 'Anaheim', sans-serif;
        padding: 0 4px;
        font-size: 1.2em;
        color: #c7c7c7;
        line-height: 1.2;
        height: 28px;
        border: 0;
        outline: 0;
        box-shadow: none;
        background: transparent;
        border-bottom: $focus-height solid #adadad; 
    }
    
     span.input-focus{
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            height: $focus-height;
            background: #1a9e64;
            transition: all 0.13s linear;
            width: 0;
    }

    .personal-form-input:focus{
        box-shadow: none;
    }

    .personal-form-input:focus ~ span {
        width: 100%;
        margin-left: 0;
    }


    .full-grid-input{
        width: $form-width-with-gap;
    }

    .one-column-input{
        width: $form-column-width;
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
    }

    .errors p{
        margin-top: 24px;
        color: #adadad;
        font-size: 12px;
    }

    .errors ul li{
        color: #fd819a;
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

    .personal-form-wrapper{
        width: $form-width-with-gap;
        // background-color: rebeccapurple;
        display: grid;
        grid-row-gap: 12px;
        grid-column-gap: $form-gap;
        grid-row-gap: 1.8em;
        grid-auto-rows: auto;
        grid-template-columns: repeat($column-count, $form-column-width);
        grid-template-areas: 
            "errors errors"
            "city city"
            "street street"
            "house apartment"
            "phone phone"
            "submit submit";
    }
</style>



