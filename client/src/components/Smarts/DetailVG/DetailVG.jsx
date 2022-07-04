import React from "react";
import {connect} from "react-redux"
import {useParams} from "react-router-dom"
import BHome from "../../Dumbs/BHome/BHome";
import tools from "../../../Tools";
import { getDetails } from "../../../redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import "./DetailVG.css"
import  icon  from "../../../img/star.png"; 
import Charging from "../../Dumbs/charging/charging";


const DetailVg = ({data, getDetails}) => {
    
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getDetails(id);
        setLoading(true);
    },[]);

    useEffect(() => {
        if(data.id){
            setLoading(false);
        };
    },[data]);

    return (
        loading === false && data !== 0 ?
        <div className="detail">
            <div className="buttons">
                <BHome/>
            </div>
            <div className="up">
                <div className="imgContainer">
                    <img src = {data.back ? data.back : data.background_image} alt = 'VideoGame Icon'/>
                </div>
            <div className="infoo">
                <div>
                    <h3>{data.platforms}</h3>
                </div> 
                <div>
                    <h3>{tools.display(data.genres)}</h3>
                </div>
                <div className="rat">
                    <h3>{data.rating}</h3>
                    <img src={icon}/>
                </div> 
            </div>
            </div>
            <div className="line"></div>
            <div className="text">
                <div className="name">
                    <h1>{data.name}</h1>
                </div>
                <div className="description">
                    <p>{data.description_raw ? data.description_raw : data.description}</p>
                </div>
            </div>
                <div className="line"></div>
        </div>
            :
            <div className="carga">

            <Charging></Charging>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        data : state.detailVg,
    }
};

export default connect(mapStateToProps,{getDetails})(DetailVg);