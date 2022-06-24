import React from "react";
import style from "./BCreate.css"
import { NavLink } from "react-router-dom";


const BHome = () => {

    return (
        <NavLink to={'/create'}>
            <div className={{/*imgcont*/}}>
                create
                <img src={{/*logo*/}} alt={"jaja"}/>
                <img></img>
            </div>
        </NavLink>
    );

};

export default BHome;