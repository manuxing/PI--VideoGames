import { Component } from "react";
import { connect } from "react-redux";
import { orderByR, getVgs } from "../../../redux/actions";
import Tools from "../../../Tools";
import style from "./CardContainer.css";
import Card from "../Card/Card";
import { useEffect } from "react";
import { useState } from "react";

const CardContainer = ({data, orderBy, getVgs}) => {

        let [info, setInfo] = useState(false);
        let [mount, setMount] = useState(false)
    
        useEffect(() => {
            if(mount === false){
                getVgs();
                console.log('1',info);
                console.log('data',data);
                setMount(true)
            }
            console.log('aver princ',data)
        });
  
        useEffect(() => {
            
            console.log('2',info)
            if(orderBy === 2){
                setMount(false);
                let data_ord = Tools.order(data);
                console.log('2',data_ord)
                setInfo(data_ord);
            } else if(orderBy === 1){
                setMount(false);
                let data_ord = Tools.alpha(data);
                setInfo(data_ord);
            } else {
                console.log(0)
                setInfo(data);
            };
            console.log('aver',data)
        },[orderBy,data]);
   
    
        return (
            <div>
            {
                info[1] ?
                 info.map(p => { 
                    return (
                        <Card 
                        key = {p.id}
                        id = {p.id}
                        back = {p.back} /*? p.back : 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png'}*/ 
                        name = {p.name} 
                        genres = {p.genres ? p.genres : []} 
                        />
                    );
                }  
                ):
                    <div>carganco</div>
            }
            </div>
        );
};


function mapStateToProps (state) {
    return {
        orderBy : state.orderBy,
        data: state.videoGames
    }
};



export default connect(mapStateToProps,{orderByR, getVgs})(CardContainer);