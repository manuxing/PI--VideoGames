import React from "react";
import { useSelector } from "react-redux";
import "./paginado.css"


const Paginado = ({cPerPage, pagination}) => {
    
    const data = useSelector((state) => state.videoGames);
    
    const paginated = [];
    
    let i = 1;

    while(i < Math.ceil(data.length/cPerPage)){
        paginated.push(i);
        i++;
    };

    return (
        <nav>
            <ul className="paginado">
                {paginated.length > 0 && paginated.map(p => {
                    return (
                    <li key={p}>
                        <button onClick={() => pagination(p)}>{p}</button>
                    </li>
                    )
                })}
            </ul>
        </nav>
    );

};

export default Paginado;