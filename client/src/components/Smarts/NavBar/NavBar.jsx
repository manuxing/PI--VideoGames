import React from "react";
import BHome from "../../Dumbs/BHome/BHome";
import BCreate from "../../Dumbs/BCreate/BCreate";
import SearchBar from "../../Dumbs/SearchBar/SearchBar";
import "./NavBar.css";


const NavBar = () => {
    return(
        <nav className="nav">
            <div className="buttons">
                <BHome/>
                <BCreate/> 
            </div>
            <div className="search">
                <SearchBar/>
            </div>
        </nav>
    );
};

export default NavBar;