let tools = {};

tools.display = (array) => {
    
    let arr = array.map(p => p.name);
    arr = arr.join(', ').trimEnd();
    return arr;

};

tools.validate = (cambio) => {
    let target = cambio.target;
    let filter_name = /^(?!.*\.\.)(?!.*\.$)[^\W\s,."()&][\w.\s,."()&]{0,60}$/;
    let filter_desc = /^(?!.*\.\.)(?!.*\.$)[^\W\s,."()&][\w.\s,."()&]{0,730}$/;
    let filter_plat = /^(?!.*\.\.)(?!.*\.$)[^\W\s,."()&][\w.\s,."()&]{0,30}$/;
    let filter_date = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/;
    let filter_rating = /(^(0{0,1}|([0-5][0-5]{0}))(\.[0-5]{0,1})?)$/;
    

    switch (target.type) {
        case 'text':{
            
            if(target.name === 'name' && filter_name.test(target.value) === false){

                return {incomplete: true, name: target.name, message: 'Only this special characters are allowed .,"()&, the limit of characters is 60'};

            } else if (target.name === 'description' && filter_desc.test(target.value) === false) {

                return {incomplete: true, name: target.name, message: 'Only this special characters are allowed .,"()&, the limit of characters is 730'};

            } else if (target.name === 'platforms' && filter_plat.test(target.value) === false) {

                return {incomplete: true, name: target.name, message:'Invalid platform'};

            };
            return {name: target.name, message: ''};
        }
        case 'date':{
            if(target.value.length > 0){
                if(filter_date.test(target.value) === false) return {name: target.name, message:'Invalid date, must be M/D/YYYY or MM/DD/YYYY'};
            };
            return {name: target.name, message: ''};
        }
        case 'number':{
            if(target.value.length > 0){
                if(filter_rating.test(target.value) === false) return {name: target.name, message:'Only numbers between 0 - 5 whit one decimal'};
            };
            return {name: target.name, message: ''};
        }
        default:
            return {name: target.name, message: ''};
    };
};

tools.setter = (evento, validado, warning, setIncomplete, setWarning) => {

    function change (warning, evento) {

        let newWarning = warning;
        let a = evento.target.name;
        if(newWarning[a]){
            newWarning[a] = validado.message;
        } else { 
            newWarning = {...newWarning, [validado.name]: validado.message};
        };
        return newWarning;

    };

    let newWarning = change(warning, evento);
    
    if(evento.target.name === 'name' || evento.target.name === 'description' || evento.target.name === 'platforms'){

        if(!validado.incomplete){
            setIncomplete(previo => ({...previo, [evento.target.name]: 0}));
            setWarning(newWarning);
        } else {
            setIncomplete(previo => ({...previo, [validado.name]: 1}));
            setWarning(newWarning);
        };

    } else {
       
            setWarning(newWarning);

    };

};

tools.incomplete = (p) => {
    if(p.name === 1 || p.description === 1 || p.platforms === 1) return true
    return false;
};



export default tools;