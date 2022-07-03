import React from "react";
import {connect} from "react-redux";

const filtGenre = () => {

    return (
        <div>
            {
                genres && genres.map(p => {
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
                        <label key ={p.id} htmlFor={p.id}>{p.name}</label>
                    </div>
                })
            }
        </div>
    )

};
function mapStateToProps(state) {
    return {
        genres: state.genres,
    };
}

export default connect(mapStateToProps,{})(filtGenre);