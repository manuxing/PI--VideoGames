import React, { useState } from "react";
import {connect, useDispatch} from "react-redux";
import tools from "../../../Tools";
import BHome from "../../Dumbs/BHome/BHome";
import axios from "axios";
import {createVg, getGenres, getVgs} from "../../../redux/actions/index.js";
import { useEffect } from "react";
import  icon  from "../../../img/star.png"; 
import "./Form.css";


const Form = ({createVg, getVgs, genres, getGenres}) => {
    
    let[input, setInput] = useState({name: '', description: '', img:'', dateRl: '', rating: 0, genres:[], platforms: []});
    let[warning, setWarning] = useState({name: '', description: '', img:'', dateRl: '', rating: '', genres:'', platforms: ''});
    let[fakeValue, setFake] = useState(0);
    let[incomplete, setIncomplete] = useState({name: 1, description: 1, platforms: 1});
    let[noSubmit, setnoSubmit] = useState(false);
    let[submited, setSubmited] = useState(false);
    
    let uncheck = () =>{
        var inputs = document.getElementsByTagName('input');
    
        for (var i=0; i<inputs.length; i++)  {
            if (inputs[i].type == 'checkbox')   {
            inputs[i].checked = false;
        }
    }

    }

    let handleChange = (evento) => {
        console.log(tools.url)
        if(submited === true) submited = false;
        
        if(evento.target.id){
            
            if(Number(evento.target.id) === parseInt(evento.target.id)){
                let copia = input;
                let cuenta = copia.genres.filter(p => {
                    if(p !== parseInt(evento.target.id)){
                        return parseInt(p);
                    };
                });
                if(cuenta.length !== input.genres.length){
                    copia.genres = cuenta;
                    setInput(copia);
                } else {
                    copia.genres.push(parseInt(evento.target.id));
                    setInput(copia);
                };
            } else {
                let validado = tools.validate(evento);
                tools.setter(evento, validado, warning, setIncomplete, setWarning);
                let copia = input;
                let cuenta = copia.platforms.filter(p => {
                    if(p !== evento.target.id){
                        return p;
                    };
                });
                if(cuenta.length !== input.platforms.length){
                    copia.platforms = cuenta;
                    setInput(copia);
                } else {
                    copia.platforms.push(evento.target.id);
                    setInput(copia);
                };
            };
            
        } else{

            let validado = tools.validate(evento);
            tools.setter(evento, validado, warning, setIncomplete, setWarning);
            if(evento.target.name === 'rating'){
                setFake(tools.transRating(evento.target.value));
            };
            setInput(previo => ({...previo, [evento.target.name]:evento.target.value}));

        }
        
    };
    
    let handleSubmit = (p,data) => {
        p.preventDefault();

        
        if(tools.incomplete(incomplete) === false && input.platforms.length > 0){
            let endData = data;
            if(tools.url.test(endData.img) === false){
                endData.img = 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png';
            };
            endData.rating = tools.transRating(endData.rating);
            endData.platforms = endData.platforms.join(' ');
            createVg(endData);
            getVgs();
            setnoSubmit(false);
            setSubmited(true);
            setFake(0);
            setInput({name: '', description: '', img:'', dateRl: '', rating: 0, genres:[], platforms: []}); 
            setWarning({name: '', description: '', img:'', dateRl: '', rating: '', genres:'', platforms: ''});
            setIncomplete({name: 1, description: 1, platforms: 1});
            uncheck();
        } else {
            p.preventDefault();
            setnoSubmit(true);
        };  

    };
    
    useEffect(() => {
        if(tools.incomplete(incomplete) === false){
            setnoSubmit(false);
        };
        if(genres.length === 0){
            getGenres();
        };
    });

    return (
        <div>
             <div className="but">
                <BHome/>
            </div>
            <form className="form" onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Name  *</label>
                    <input className="input" type = {'text'} placeholder="Name" name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {
                                warning.name 
                        }
                    </div>
                </div>
                <div>
                    <label>Description  *</label>
                    <textarea className="inputDes" type = {'text'} placeholder="..." name = {'description'} value = {input.description}
                    onChange = {(p => {handleChange(p)})}/>
                    <div className="warning">
                        {
                            warning.description  
                        }
                    </div>
                </div>
                <div>
                    <label>URl Image   </label>
                    <input  className="input" type = {'url'} placeholder="http://..." name = {'img'} value = {input.img}
                    onChange = {(p => handleChange(p))}/>
                </div>
                <div className="warning">
                        {
                            warning.img  
                        }
                    </div>
                <div>
                    <label>Date of Release   </label>
                    <input className="inputDate" type = {'date'} name = {'dateRl'} value = {input.dateRl}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {
                            warning.dateRl 
                        }
                    </div>
                </div>
                <div className="ratingg">
                    <div className="rating">
                        <label>Rating</label>
                        <input className="range" type = {'range'} min="0" max="50" name = {'rating'} value = {input.rating}
                        onChange = {(p => handleChange(p))}/>
                        <label>{fakeValue}</label>
                        <img src={icon}/>
                    </div>
                </div>
                <div className="warning"></div>
                <div>
                    <label>Genres</label>
                    <div className="down">
                        {
                            genres.map(p => {
                                return (
                                    <label className="lab" key={p.id}>
                                            <input className="check" type={"checkbox"}
                                            name = {'genres'}
                                            key={p.id}
                                            value = {p.name}
                                            id = {p.id}
                                            onChange = {(e) => {
                                                handleChange(e);
                                            }}
                                            />
                                            <label className="box"  htmlFor={p.id}>{p.name}</label>
                                    </label>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="down2">
                    <label>Platforms  *</label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="PC" name = {'platforms'} value = {'PC'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"PC"}>PC</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="PlayStation 3"name = {'platforms'} value = {'PlayStation 3'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"PlayStation 3"}>PlayStation 3</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="PlayStation 4"name = {'platforms'} value = {'PlayStation 4'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"PlayStation 4"}>PlayStation 4</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="PlayStation 5"name = {'platforms'} value = {'PlayStation 5'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"PlayStation 5"}>PlayStation 5</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="Xbox 360°" name = {'platforms'} value = {'Xbox 360°'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"Xbox 360°"}>Xbox 360°</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="Xbox Series" name = {'platforms'} value = {'Xbox Series'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"Xbox Series"}>Xbox Series</label>
                    </label>
                    <label className="lab">
                        <input className="check" type = {'checkbox'} id="Android" name = {'platforms'} value = {'Android'}
                        onChange = {(p => handleChange(p))}/>
                        <label className="box" htmlFor={"Android"}>Android</label>
                    </label>
                </div>
                <div>
                    <div className="warning">
                        {
                        <>
                            {noSubmit ? (<div>Complete the required fields</div>) : ( <> </> )}
                            {submited ? (<div>Succesfully created</div>):(<></>)}
                        </>
                        }
                    </div>
                    <div>
                        <input className="Buttonn" type = {'submit'} value = {'create'}/>
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

export default connect (mapStateToProps,{createVg, getGenres, getVgs})(Form);