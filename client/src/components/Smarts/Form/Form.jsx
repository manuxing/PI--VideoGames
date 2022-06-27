//revisar date y emprolijar
//revisar checkboxes


import React, { useState } from "react";
import {connect, useDispatch} from "react-redux";
import tools from "../../../Tools";
import axios from "axios";
import {createVg, getGenres} from "../../../redux/actions/index.js";
import { useEffect } from "react";

let copia = [];
let advertencias = [];
let fakeValue = 0;

const Form = ({createVg, genres, getGenres}) => {
    
    let[input, setInput] = useState({name: '', description: '', img:'', dateRl: '', rating: 0, genres:[], platforms: []});
    let[warning, setWarning] = useState({name: '', description: '', img:'', dateRl: '', rating: '', genres:'', platforms: ''});
    let[incomplete, setIncomplete] = useState({name: 1, description: 1, platforms: 1});
    let[estan, setEstan] = useState(false);
    let[noSubmit, setnoSubmit] = useState(false);
    let[submited, setSubmited] = useState(false);

    let handleChange = (evento) => {
        if(submited === true) submited = false;

        if(evento.target.id){
           
            if(Number(evento.target.id) === parseInt(evento.target.id)){
                let copia = input;
                let cuenta = copia.genres.filter(p => {
                    if(p !== parseInt(evento.target.id)){
                        return parseInt(p);
                    }
                });
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
                console.log('copia',copia)
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
        
        if(tools.incomplete(copia) === false && input.platforms.length > 0){
            let endData = data;
            endData.rating = tools.transRating(endData.rating);
            endData.platforms = endData.platforms.join(' ');
            console.log(endData);
            createVg(endData);
            setnoSubmit(false);
            setSubmited(true);
            fakeValue = 0;
            setInput({name: '', description: '', img:'', dateRl: '', rating: 0, genres:[], platforms: []}); 
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
        if(genres.length === 0){
            getGenres()
        }

    });
    useEffect(()=>{
        console.log(genres);
        setEstan(true);
    },[genres])

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Name  *</label>
                    <input type = {'text'} placeholder="Name" name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div>
                        {
                                advertencias.name
                        }
                    </div>
                </div>
                <div>
                    <label>Description  *</label>
                    <input type = {'text'} placeholder="..." name = {'description'} value = {input.description}
                    onChange = {(p => {handleChange(p)})}/>
                    <div>
                        {
                            advertencias.description
                        }
                    </div>
                </div>
                <div>
                    <label>URl Image   </label>
                    <input type = {'url'} placeholder="http://..." name = {'img'} value = {input.img}
                    onChange = {(p => handleChange(p))}/>
                </div>
                <div>
                    <label>Date of Release   </label>
                    <input type = {'date'} name = {'dateRl'} value = {input.dateRl}
                    onChange = {(p => handleChange(p))}/>
                    <div>
                        {
                            advertencias.dateRl
                        }
                    </div>
                </div>
                <div>
                    <label>Rating {fakeValue}</label>
                    <input type = {'range'} min="0" max="50" name = {'rating'} value = {input.rating}
                    onChange = {(p => handleChange(p))}/>
                        {/* <div>
                        {
                            fakeValue
                        }
                        </div> */}
                </div>
                <div>
                    <label>Genres</label>
                    <>
                        {
                            estan === true ? genres.map(p => {
                                return (
                                    <div key={p.id}>
                                            <input type={"checkbox"}
                                            name = {'genres'}
                                            key={p.id}
                                            value = {p.name}
                                            id = {p.id}
                                            onChange = {(e) => {
                                                handleChange(e);
                                            }}
                                            />
                                            <label  htmlFor={p.id}>{p.name}</label>
                                    </div>
                                );
                            }) :
                            <></>
                        }
                    </>
                </div>
                <div>
                    <label>Platforms  *</label>
                    <div>
                        <input type = {'checkbox'} id="PC" name = {'platforms'} value = {'PC'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"PC"}>PC</label>
                    </div>
                        <input type = {'checkbox'} id="PlayStation 3"name = {'platforms'} value = {'PlayStation 3'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"PlayStation 3"}>PlayStation 3</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="PlayStation 4"name = {'platforms'} value = {'PlayStation 4'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"PlayStation 4"}>PlayStation 4</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="PlayStation 5"name = {'platforms'} value = {'PlayStation 5'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"PlayStation 5"}>PlayStation 5</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="Xbox 360°" name = {'platforms'} value = {'Xbox 360°'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"Xbox 360°"}>Xbox 360°</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="Xbox Series" name = {'platforms'} value = {'Xbox Series'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"Xbox Series"}>Xbox Series</label>
                    </div>
                    <div>
                        <input type = {'checkbox'} id="Android" name = {'platforms'} value = {'Android'}
                        onChange = {(p => handleChange(p))}/>
                        <label  htmlFor={"Android"}>Android</label>
                    </div>
                    <div>
                </div>
                <div>
                    <div>
                        <input type = {'submit'} value = {'create'}/>
                    </div>
                    <div>
                        {
                        <>
                            <div>{noSubmit ? (<p>Complete the required fields</p>) : ( <> </> )}</div>
                            <div>{submited ? (<p>Succesfully created</p>):(<></>)}</div>
                        </>
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

export default connect (mapStateToProps,{createVg, getGenres})(Form);