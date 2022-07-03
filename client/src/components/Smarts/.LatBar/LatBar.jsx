import React ,{useEffect, useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGenre, filterCreated, getVgs, orderByR } from "../../../redux/actions";
import "./LatBar.css"

const LatBar = () => {
    
    let genres = useSelector((state) => state.genres);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVgs)
    },[dispatch])


    const handleClick = (p) => {
        console.log(p.target)
        dispatch(filterGenre(p.target.value));
    };

    const handleClickOrigin = (p) => {
        console.log(p.target)
        dispatch(filterCreated(p.target.value));
    };

    return (
        <div className="lat">
            <br/>
            <div className="origen">
                <div>
                    <button className="buttonns" value="ALL" onClick={(p) => handleClickOrigin(p)}>
                        All
                    </button>
                </div>
                <div>
                    <button className="buttonns" value="CREATED" onClick={(p) => handleClickOrigin(p)}>
                        Created
                    </button>
                </div>
                <div>
                    <button className="buttonns" value="API" onClick={(p) => handleClickOrigin(p)}>
                        API
                    </button>
                </div>
            </div> 
                    <br/>
                    <br/>
            
                <div className="filters">
                    <button className="buttonns" value={'todos'} onClick={(p)=>handleClick(p)}>
                        All
                    </button>
                    {
                        genres && genres.map(p =>{
                        return (
                        <div key ={p.id}>
                            <button className="buttonns" value={p.id} onClick={(p)=>handleClick(p)}>
                                {p.name}
                            </button>
                        </div>
                        )
                    })}
                </div>
        </div>
    );

};


export default LatBar;