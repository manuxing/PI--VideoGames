import React from "react";
import {orderByR} from "../../../redux/actions/index";
import {connect} from "react-redux";


let switx = 2;
const OR = ({orderByR, orderBy}) => {
    
    let handleClick = () => {
            orderByR(switx)
            switx === 2 ? (switx = 0)
             : (switx = 2)
             console.log(switx)
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