import React from "react";
import { NavLink } from "react-router-dom";

const Door = () => {
    
    return (
        // imagen de fondo en css animaciones blabla
        <NavLink to={'/home'}>
            <button>Enter</button>
        </NavLink>
    );

};

export default Door;