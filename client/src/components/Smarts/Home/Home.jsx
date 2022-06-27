import { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../../../components/Smarts/NavBar/NavBar";
import { getVgs } from "../../../redux/actions";
import CardContainer from "../../Dumbs/CardContainer/CardContainer";
//cuando se monto hacer el pedido para las cartds, con un condicional sobre el estado de order puede ser 1 2 o 0
//no me acuerdo si se trae si o si desde aca pero creo que no
//van a estar en el estado pero al estado hay que llenarlo con acciones



export class Home extends Component {
    //usar useeffect

    // componentDidMount(){
    //     this.props.getVgs()
    // }
    // componentDidUpdate(){
    //     this.props.getVgs()
    //     console.log(this.props.data)
    // }

    render(){
        return (
            <>
                <NavBar/>
                <CardContainer/>
            </>
        );
    }
};

// function mapStateToProps (state) {
//     return {
//         orderBy : state.orderBy,
//         data: state.videoGames
//     }
// };


export default connect(null, {getVgs})(Home);