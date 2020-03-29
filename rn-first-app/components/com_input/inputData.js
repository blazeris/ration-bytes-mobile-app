import input from "./input.js";
import { Text, AsyncStorage } from "react-native";
import React, { Component } from "react";

var items_list = {

    //  itemname: {
    //     unit: "unit type",
    //     content: [
      
    //         {
    //             expiration: "date",
    //             amount: "number"
    //         }

    //     ]
    // }
};

export const addItem = (item_type, item_unit, amount, expiration_date) => {

    console.log("addItem function worked");
    var newItem = {
        unit: item_unit, //units: eggs
        content: [
            {
                expiration: expiration_date,
                amnt: amount //amount: 20
            }
        ]   
    };

    items_list[item_type] = newItem;

    console.log("before save data");
    saveData("inventory", items_list);
    // testData();
    testGetItem("inventory");
};


export const useAmount = (item_type, amountUsed) => {

    let item = fetchItem(item_type);

    // item.content[0].amnt -= amountUsed;
  
    console.log("well");
    // items_list[item_type].content[i].amount = newAmount;
    
    // saveData("collections", items_list);
    
  };

  export const itemExists = (item_type) => {
    let item = fetchItem(item_type);
    if(item != null){
        console.log("item exists");
        return true;
    }
    else {
        console.log("item does not exist");
        return false;
    }
  };
  

const logData = (list) => {
    for (var key in list) {
      // check if the property/key is defined in the object itself, not in parent
      if (list.hasOwnProperty(key)) {           
          console.log(key, list[key]);
          console.log("Log Data function");
      }
      else{
          console.log("no key");
      }
    }
};

 const saveData = async (item_name, object) => {
    console.log("big brain");
    try{
        console.log("save data function");
        await AsyncStorage.setItem(item_name, JSON.stringify(object));
    } catch (error) {
        console.log("savedata function didnt work u bitch ");
    }
};

const fetchItem = async (key) => {
    try{
        let value = await AsyncStorage.getItem("inventory"); //returns object consisting of all objects
        let storage = JSON.parse(value);
        let object;
        // let list = Object.values(storage);
        // let item = storage[target];

        if(key in storage){
            object = storage[key];
        }
        else{
            object = null;
        }

        console.log(storage);
        console.log("object: " + object);
        console.log("object units: " + object.unit);

        return object;
    }catch(e){
        console.log(e);
    }
}

const testGetItem = async (inventory) => {

    try {
        let value = await AsyncStorage.getItem(inventory); //returns object consisting of all objects
        let storage = JSON.parse(value);
        let list = Object.values(storage);
        let allKeys = list.keys();

        if (value !== null) {
            console.log(storage);
            // for (let i = 0; i < list.length; i++) {
            //     console.log("Loading " + list[i] + " with length: " + list.length);
            //     let item = list[i];
            //     let unit_type = item.unit;
            //     for (let j = 0; j < item.content.length; j++) {
            //         let m_content = item.m_content[j];
            //         let data = m_content.expiration;
            //         let amount = m_content.amnt;
            //       }
            //     console.log('item: ' + item.amnt);
            // }
            var iterationCounter =1;
            for (var propertyKey in storage) {
                console.log("Running iteration " + iterationCounter +
                    "\n\t propertyKey variable is: " + propertyKey +
                    "\n\t the associated value is: " + storage[propertyKey] );
                iterationCounter = iterationCounter + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }

};

const printAllKeys = async () =>{
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          console.log(result);
        }).catch((e) =>{
          console.log(e);
        });
    });
    // AsyncStorage.clear();
  };
