import React from "react";
import tools from "../../../Tools";

const DetailVg = ({data}) => {
    return (
        <div>
            <div>
                <img src = {data.back} alt = 'VideoGame Icon'/>
            </div>
            <div>
                <h1>{data.name}</h1>
            </div>
            <div>
                <p>{data.description}</p>
            </div>
            <div>
                <p>{data.rating}</p>
                <p>{tools.display(data.genres)}</p>
                <p>{data.platforms}</p>
            </div>

        </div>
    )
};
// let data = {name:'elGame', description:'ese ya sabes', rating:4, genres:[{name:'pepe'},{name: 'argebto'}], platforms:'play'}
export default DetailVg;