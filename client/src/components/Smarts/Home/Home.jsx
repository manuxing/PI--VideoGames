import React from "react";
import NavBar from "../../../components/Smarts/NavBar/NavBar";
import Card from "../../Dumbs/Card/Card";
import CardContainer from "../../Dumbs/CardContainer/CardContainer";

const Home = ({data}) => {
    return (
        <>
            <NavBar/>
            <CardContainer data = {data}/>
        </>
    );
};




export default Home;