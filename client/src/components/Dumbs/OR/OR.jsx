import React from "react";
import {orderByR} from "../../../redux/actions/index";
import {connect, useDispatch, useSelector} from "react-redux";
import "./OR.css";

let switx = 2;
const OR = () => {
    
    let dispatch = useDispatch();
    let orderBy = useSelector(state => state.orderBy);
    
    let handleClick = () => {
            dispatch(orderByR(switx));
            switx === 1 ? switx = 0 : switx = 1
    };
    
    return (
        <button onClick={() => handleClick()}
            >XR</button>
    );

};

function mapStateToProps (state) {
    return {
        orderBy : state.orderBy
    }
};

export default connect(mapStateToProps,{orderByR})(OR);