export default class Regex
{
    constructor(){}

    static validCity(city){
        const regex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s0-9.-/]*$/;
        return regex.test(city);
    }
  
    static validStreet(street){
        const regex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s.-/]*$/;
        return regex.test(street);
    }

    static validNumber(number){
        const regex = /^[0-9]{1,5}$/;
        return regex.test(number);
    }

    static validPhoneNumber(phoneNumber){
        const regex = /^[0-9]{9}$/;
        return regex.test(phoneNumber);
    }

    // static validStreet(street){
    //     const regex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s0-9.-/]*$/;
    //     return regex.test(street);
    // }
    
    // static validZipCode(zipCode){
    //     const regex = /^\d{2}(?:[-]\d{3})$/;
    //     return regex.test(zipCode);
    // }
}