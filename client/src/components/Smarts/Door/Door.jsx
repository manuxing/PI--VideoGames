import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../../../redux/actions";
import "./Door.css";


const Door = () => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch]);
    
    return (
        <div className="page">
            <div className="Bcontainer">
                <NavLink className={"Button"} to={'/home'}>
                    <button className="Button">Enter</button>  
                </NavLink>
            </div>
        </div>
    );

};


export default Door;