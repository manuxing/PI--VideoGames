import React from "react";
import {connect} from "react-redux"
import {useParams} from "react-router-dom"
import tools from "../../../Tools";
import { getDetails } from "../../../redux/actions";
import { useEffect } from "react";
import { useState } from "react";


const DetailVg = ({data, getDetails}) => {
    
    let {id} = useParams();
    
    useEffect(() => {
        getDetails(id)
    },[]);

    return (
        
        data.id ? 
        <div>
            <div>
                <img src = {data.back ? data.back : data.background_image} alt = 'VideoGame Icon'/>
            </div>
            <div>
                <h1>{data.name}</h1>
            </div>
            <div>
                {data.description_raw}
            </div>
            <div>
                <h3>{data.rating}</h3>
            </div> 
            <div>
                <h3>{tools.display(data.genres)}</h3>
            </div>
            <div>
                <h3>{data.platforms}</h3>
            </div> 
        </div>
            :
            <div>charging...</div>
    )
};

function mapStateToProps(state) {
    return {
        data : state.detailVg,
    }
    
}

export default connect(mapStateToProps,{getDetails})(DetailVg);