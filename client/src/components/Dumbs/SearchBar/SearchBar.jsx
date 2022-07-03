import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { getVgs, search, all } from "../../../redux/actions";
import  searchIcon  from "../../../img/search/search.png"; 
import  resetIcon  from "../../../img/reset/reset.png"; 

import "./SearchBar.css";

const SearchBar = ({videoGames, page, search, all, getVgs}) => {

    let [name, setName] = useState('');

    let handleChange = (evento) => {
        let {value} = evento.target;
        setName(value);
    };

    let handleSubmit = (evento) => {
        evento.preventDefault();
        search(name);
        setName('');
    };

    return (
      <div className="nav">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="divv">
            <input
              className="inputt"
              type="text"
              id="title"
              autoComplete="off"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          <button className="button" type="submit">
            <img src={searchIcon}/>
          </button>
        <button className="button" onClick={()=>all()}>
          <img src={resetIcon}/>
        </button>
          </div>
        </form>
      </div>
    );
};

let mapStateToProps = (state) => {
    return {
        videoGames: state.videoGames,
    };
};

export default connect(mapStateToProps,{getVgs, search, all, search})(SearchBar);