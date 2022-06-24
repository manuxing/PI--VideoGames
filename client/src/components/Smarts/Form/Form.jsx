//revisar si se puede mover las variables al cuerpo
//cuando se haya creado correctamente hacer algo?


import React, { useState } from "react";
import {useDispatch} from "react-redux";
import tools from "../../../Tools";
import axios from "axios";
import {createVg} from "../../../redux/actions/index.js";
import { useEffect } from "react";

let copia = [];
let advertencias = [];

const Form = () => {

    let[input, setInput] = useState({name: '', description: '', dateRl: '', rating: 0, genres:'', platforms: ''});
    let[warning, setWarning] = useState({name: '', description: '', dateRl: '', rating: '', genres:'', platforms: ''});
    let[incomplete, setIncomplete] = useState({name: 1, description: 1, platforms: 1});
    let[noSubmit, setnoSubmit] = useState(false);

    let dispatch = useDispatch();

    let handleChange = (evento) => {

        setInput(previo => ({...previo, [evento.target.name]:evento.target.value}));
        let validado = tools.validate(evento);
        tools.setter(evento, validado, warning, setIncomplete, setWarning);
        
    };
    
    let handleSubmit = (p) => {

        copia = incomplete;
        p.preventDefault();

        if(tools.incomplete(copia) === false){
            // dispatch(createVg(input));
            setnoSubmit(false);
            setInput({name: '', description: '', dateRl: '', rating: 0, genres:'', platforms: ''}); 
            setIncomplete({name: 1, description: 1, platforms: 1});
        } else {
            setnoSubmit(true);
        };  

    };
    
    useEffect(() => {

        copia = incomplete;
        advertencias = warning;

        if(tools.incomplete(copia) === false){
            setnoSubmit(false);
        };

    });

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name  *</label>
                    <input type = {'text'} name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div>
                        {
                           advertencias.name
                        }
                    </div>
                </div>
                <div>
                    <label>Description  *</label>
                    <input type = {'text'} name = {'description'} value = {input.description}
                    onChange = {(p => handleChange(p))}/>
                    <div>
                        {
                            advertencias.description
                        }
                    </div>
                </div>
                <div>
                    <label>Date of Release</label>
                    <input type = {'date'} name = {'dateRl'} value = {input.dateRl}
                    onChange = {(p => handleChange(p))}/>
                        {
                            advertencias.dateRl
                        }
                </div>
                <div>
                    <label>Rating</label>
                    <input type = {'number'} name = {'rating'} value = {input.rating}
                    onChange = {(p => handleChange(p))}/>
                        {
                            advertencias.rating
                        }
                </div>
                <div>
                    <label>Genres</label>
                    <input type = {'text'} name = {'genres'} value = {input.genres}
                    onChange = {(p => handleChange(p))}/>
                        {
                            advertencias.genres
                        }
                </div>
                <div>
                    <label>Platforms  *</label>
                    <input type = {'text'} name = {'platforms'} value = {input.platforms}
                    onChange = {(p => handleChange(p))}/>
                        {
                            advertencias.platforms
                        }
                </div>
                <div>
                    <div>
                        <input type = {'submit'} value = {'create'}/>
                    </div>
                    <div>
                        { 
                         noSubmit ? (<p>Complete the required fields</p>) : ( <> </> )
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;