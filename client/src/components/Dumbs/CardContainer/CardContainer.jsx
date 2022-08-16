import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByR } from "../../../redux/actions";
import Card from "../Card/Card";
import { useState } from "react";
import Paginado from "../../Dumbs/paginado/paginado";
import  alphaIcon  from "../../../img/todas/ordenar-por-alfabeto.png"; 
import  nalphaIcon  from "../../../img/todas/ordenar-por-orden-alfabetico-inverso.png"; 
import  orderIcon  from "../../../img/todas/ordenar-por-orden.png"; 
import  norderIcon  from "../../../img/todas/ordenar-por-orden-numerico.png"; 
import "./CardContainer.css";
import Charging from "../charging/charging";

const CardContainer = () => {
    
        let dispatch = useDispatch();

        let data = useSelector(state => state.videoGames);
        let [loading, setLoading] = useState(true);

        let [switx, setSwitx] = useState(1);
        let [switxR, setSwitxR] = useState(2);

        const [current, setCurrent] = useState(1);
        const [cPerPage] = useState(15);
        const lastOne = current * cPerPage;
        const firstOne = lastOne - cPerPage;
        const inThisPage = data.slice(firstOne,lastOne);

        const pagination = (pageN) => {
            setCurrent(pageN);
        };

        const handleClickAlpha = () => {
            dispatch(orderByR(switx));
            switx === 1 ? setSwitx(1.5) : setSwitx(1)
        };

        const handleClickRanking = () => {
            dispatch(orderByR(switxR));
            switxR === 2 ? setSwitxR(2.5) : setSwitxR(2)
        };

        useEffect(() => {
            setCurrent(1);
            setLoading(true);
        },[]);
        
        useEffect(() => {
            setCurrent(1);
            let x = () =>{
                if(data.length > 0)
                setLoading(false);
            };
            setTimeout(x, 500);
        },[data]);

        return (
            <div className="all">
                <div className="order">
                    <button className="buttonn" onClick={() =>handleClickAlpha()}>
                        {switx === 1 ? <img src={nalphaIcon} alt="icon"/> : <img src={alphaIcon} alt="icon"/>}
                    </button>
                    <button className="buttonn" onClick={() =>handleClickRanking()}>
                        {switxR === 2 ? <img src={norderIcon} alt="icon"/> : <img src={orderIcon} alt="icon"/>}
                    </button>
                </div>
            <div className="linea">

            </div>
            {loading === false ?
                <div className="cont">
                    
                    <div className="cards">
                    {
                        inThisPage.map(p => { 
                            return (
                                <Card 
                                key = {p.id}
                                id = {p.id}
                                back = {p.back ? p.back : 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png'}
                                name = {p.name}
                                rating = {p.rating}
                                genres = {p.genres ? p.genres : []} 
                                />
                                );
                            }  
                            ) 
                        }
                    </div>
                    <div className="paginado">
                        <Paginado cPerPage={cPerPage} pagination={pagination}/>
                    </div>
            </div> :
            <div className="carga">

                <Charging></Charging>
            </div>
            }
                </div>
        );
};

export default CardContainer;
