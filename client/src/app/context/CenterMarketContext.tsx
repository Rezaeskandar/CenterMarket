import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/Basket";

interface CenterMarketContextValue {
    basket: Basket | null;
    setBasket: (basket:Basket) => void;
    removeItem:(productId: number, quantity:number)=> void;
}

export const CenterMarketContext = createContext<CenterMarketContextValue | undefined>(undefined);

export function  useCenterMarketContext(){

const context = useContext(CenterMarketContext) ;
if(context === undefined){
    throw Error ('Oops - we do not seem to be iside the provider')  
}

    return context;
}

export function CenterMarketProvider({children}: PropsWithChildren<any>){
     const [basket, setBasket] =useState<Basket|null>(null);


     function removeItem(productId:number, quantity: number){
        if(!basket) return;

        const items =[...basket.items];

        const itemIndex =  items.findIndex(i =>i.productId === productId)
        if(itemIndex >= 0){
        items[itemIndex].quantity-=quantity;
        if(items [itemIndex].quantity === 0) items.splice(itemIndex,1)

        setBasket(prevState => {
            return {...prevState!, items}
        })
        }
     }
     return (
        <CenterMarketContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </CenterMarketContext.Provider>
     )
} 
