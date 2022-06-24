import React from "react";
import BHome from "../../Dumbs/BHome/BHome";
import BCreate from "../../Dumbs/BCreate/BCreate";
import OA from "../../Dumbs/OA/OA";
import OR from "../../Dumbs/OR/OR";
import SearchBar from "../../Dumbs/SearchBar/SearchBar";

const NavBar = () => {
    return(
        <nav>
            <BHome/>
            {/* estos 3 */}
            <OA/>
            <OR/>
            <BCreate/>
            {/* al latbar con contactos, about, y los filtros parecidos a los de mati */}
            <SearchBar/>
        </nav>
    );
};

export default NavBar;