import { connect } from "react-redux";
import NavBar from "../../../components/Smarts/NavBar/NavBar";
import CardContainer from "../../Dumbs/CardContainer/CardContainer";
//cuando se monto hacer el pedido para las cartds, con un condicional sobre el estado de order puede ser 1 2 o 0
//no me acuerdo si se trae si o si desde aca pero creo que no
//van a estar en el estado pero al estado hay que llenarlo con acciones



const Home = ({data, orderBy}) => {

    return (
        <>
            <NavBar/>
            <p>{orderBy}</p>
            <CardContainer data = {data}/>
        </>
    );
};

function mapStateToProps (state) {
    return {
        orderBy : state.orderBy
    }
};


export default connect(mapStateToProps,null)(Home);