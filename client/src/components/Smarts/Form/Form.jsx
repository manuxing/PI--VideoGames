//revisar si se puede mover las variables al cuerpo
//genre tiene que ser opciones que envien un id por atras, en el caso de hacer uno nuevo  solo enviar el nombre
//ver si hacemos que el display de las cosas sea por id o por otro pero la verdad creo que da igual el llamado es lo mismo
//cuando se haya creado correctamente hacer algo?


import React, { useState } from "react";
import {connect, useDispatch} from "react-redux";
import tools from "../../../Tools";
import axios from "axios";
import {createVg} from "../../../redux/actions/index.js";
import { useEffect } from "react";

let copia = [];
let advertencias = [];
let fakeValue = 0;

const Form = ({createVg, genres}) => {
    
    let[input, setInput] = useState({name: '', description: '', dateRl: '', rating: 0, genres:[], platforms: []});
    let[warning, setWarning] = useState({name: '', description: '', dateRl: '', rating: '', genres:'', platforms: ''});
    let[incomplete, setIncomplete] = useState({name: 1, description: 1, platforms: 1});
    let[noSubmit, setnoSubmit] = useState(false);

    let handleChange = (evento) => {

        if(evento.target.id){
           
            if(Number(evento.target.id) === parseInt(evento.target.id)){
                let copia = input;
                let cuenta = copia.genres.filter(p => {
                    if(p !== parseInt(evento.target.id)){
                        return parseInt(p);
                    }
                })
                console.log(cuenta);
                if(cuenta.length !== input.genres.length){
                    copia.genres = cuenta;
                    setInput(copia);
                } else {
                    copia.genres.push(parseInt(evento.target.id));
                    setInput(copia);
                    console.log('algo')
                }
            } else {
                let validado = tools.validate(evento);
                tools.setter(evento, validado, warning, setIncomplete, setWarning);
                let copia = input;
                let cuenta = copia.platforms.filter(p => {
                    if(p !== evento.target.id){
                        return p;
                    }
                })
                console.log('eeeculia',cuenta);
                if(cuenta.length !== input.platforms.length){
                    copia.platforms = cuenta;
                    setInput(copia);
                } else {
                    copia.platforms.push(evento.target.id);
                    setInput(copia);
                }
            }

        } else{

            let validado = tools.validate(evento);
            tools.setter(evento, validado, warning, setIncomplete, setWarning);
            if(evento.target.name === 'rating'){
                fakeValue = tools.transRating(evento.target.value);
            };
            setInput(previo => ({...previo, [evento.target.name]:evento.target.value}));

        }
        
    };
    
    let handleSubmit = (p,data) => {

        p.preventDefault();
        copia = incomplete;
        
        if(tools.incomplete(copia) === false){
            let endData = data;
            endData.rating = tools.transRating(endData.rating);
            endData.platforms = endData.platforms.join(' ');
            console.log(endData);
            createVg(endData);
            setnoSubmit(false);
            fakeValue = 0;
            setInput({name: '', description: '', dateRl: '', rating: 0, genres:[], platforms: ''}); 
            setIncomplete({name: 1, description: 1, platforms: 1});
        } else {
            setnoSubmit(true);
        };  

    };
    
    useEffect(() => {
        copia = incomplete;
        advertencias = warning;
        console.log(input);
        if(tools.incomplete(copia) === false){
            setnoSubmit(false);
        };

    });

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e,input)}>
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
                    onChange = {(p => {handleChange(p)})}/>
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
                    <input type = {'range'} min="0" max="50" name = {'rating'} value = {input.rating}
                    onChange = {(p => handleChange(p))}/>
                        {
                            fakeValue
                        }
                </div>
                <div>
                    <label>Genres</label>
                    
                    <>
                        {
                            genres.map(p => {
                                return (
                                    <div key={p.id}>
                                            <input type={"checkbox"}
                                            name = {'genres'}
                                            value = {p.name}
                                            id = {p.id}
                                            onChange = {(e) => {
                                                handleChange(e);
                                            }}
                                            />
                                            <label  htmlFor={p.id}>{p.name}</label>
                                    </div>
                                );
                            })
                        }
                    </>
                        
                    
                </div>
                <div>
                    <label>Platforms  *</label>
                    <div>
                        <input type = {'checkbox'} id="play" name = {'platforms'} value = {'play'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"play"}>play</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="xbox" name = {'platforms'} value = {'xbox'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"xbox"}>xbox</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="compu"name = {'platforms'} value = {'compu'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"compu"}>compu</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="nintendods"name = {'platforms'} value = {'nintendods'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"nintendods"}>nds</label>
                    </div>
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
};

function mapStateToProps (state) {
    return {
        genres : state.genres
    }
};

export default connect (mapStateToProps,{createVg})(Form);