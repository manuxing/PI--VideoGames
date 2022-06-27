import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderByR } from "../../../redux/actions";
import Tools from "../../../Tools";
import style from "./CardContainer.css";
import Card from "../Card/Card";

const CardContainer = ({data, orderBy}) => {
    let[info, setInfo] = useState(data);
    let[desor, setDesor] = useState(data);

    useEffect(() => {
        console.log(data)
        console.log('des',desor)
        console.log('use',orderBy)
        if(orderBy === 2){
            //despachar un cambio para displayar loading
            //hacer que tools.order sea o mas rapido, o hacerlo en el back o hacerlo promesa
            let data_ord = Tools.order(data);
            console.log(data_ord)
            setInfo(data_ord);
        } else if(orderBy === 1){
            let data_ord = Tools.alpha(data);
            console.log(data_ord)
            setInfo(data_ord);
        } else {
            console.log('data',data)
            setInfo(desor);
        };
    });


    return (
        <div>
        {
            info.map(p => { 
                return (
                    <Card 
                    key = {p.id}
                    id = {p.id}
                    so = {orderBy}
                    back = {p.back} /*? p.back : 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png'}*/ 
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


function mapStateToProps (state) {
    return {
        orderBy : state.orderBy
    }
};


export default connect(mapStateToProps,{orderByR})(CardContainer);