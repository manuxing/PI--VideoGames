import React from "react";
import {orderByR} from "../../../redux/actions/index";
import {connect} from "react-redux";
import "./OA.css";

let switx = 1;
const OA = ({orderByR, orderBy}) => {
    
    return (
        <button onClick={() => {
            orderByR(switx)
            switx === 1 ? switx = 0 : switx = 1
            }}
            >XA</button>
    );
};

function mapStateToProps (state) {
    return {
        orderBy : state.orderBy
    }
};

export default connect(mapStateToProps,{orderByR})(OA);