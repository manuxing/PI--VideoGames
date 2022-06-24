import React from "react";
import style from "./CardContainer.css";
import Card from "../Card/Card";

const CardContainer = ({data}) => {
    return (
        <div>
        {
            data.map(p => { 
                return (
                    <Card 
                    key = {p.id}
                    id = {p.id}
                    back = {p.back ? p.back : 'https://st.depositphotos.com/2398521/2608/i/600/depositphotos_26089317-stock-photo-cute-small-dog.jpg'} 
                    name = {p.name} 
                    genres = {p.genres} 
                    />
                );
                }
            )
        }
        </div>
    );
};


export default CardContainer;