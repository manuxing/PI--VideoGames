import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getVgs, getGenres } from "../../../redux/actions";
import NavBar from "../../../components/Smarts/NavBar/NavBar";
import CardContainer from "../../Dumbs/CardContainer/CardContainer";
import LatBar from "../.LatBar/LatBar";
import "./Home.css"


let Home = () => {

    let dispatch = useDispatch();
    let genres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getVgs());
        dispatch(getDetails());
        if(genres.length < 1){
            dispatch(getGenres());
        }
    },[]);

    return (
        <div className="home">
            <div className="nav">
                <NavBar/>
            </div>
            <div className="panell-wrap">
                <div className="panel">
                    <LatBar/>
                </div>
                <div className="cards-wrap">
                    <CardContainer/>
                </div>
            </div>
        </div>
    );
};

export default Home;