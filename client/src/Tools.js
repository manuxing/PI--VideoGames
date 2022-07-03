let tools = {};
let filter_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
let url = new RegExp(filter_url);
tools.url = url;

tools.display = (array) => {
    // console.log(array)
    let arr = array.map(p => p.name);
    arr = arr.join(', ').trimEnd();
    return arr;

};

tools.displayPlat = (array) => {
    console.log('q',array)
    let arr = array.map(p => p.platform.name);
    arr = arr.join(', ').trimEnd();
    return arr;

};

tools.validate = (cambio) => {
    let target = cambio.target;
    let filter_name = /^(?!.*\.\.)(?!.*\.$)[^\W\s,."()&][\w.\s,."()&]{0,60}$/;
    let filter_desc = /^(?!.*\.\.)(?!.*\.$)[^\W\s,."()&][\w.\s,."()&]{0,730}$/;
    let filter_date = /^(?:(?:19[0-9]{2}|200[0-9]|2010)([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:19(?:0[48]|[2648][048]|[13579][26])|2000|200[48])([-/.]?)0?2\2(?:29))$/;

    switch (target.type) {  
        case 'text' || "checkbox" :{
            if(target.name === 'name' && filter_name.test(target.value) === false){
                
                return {incomplete: true, name: target.name, message: 'Only this special characters are allowed .,"()&, the limit of characters is 60'};
                
            } else if (target.name === 'platforms') {
                
                return {name: target.name, message:''};
                
            };
            return {name: target.name, message: ''};
            
        }
        case "url":{
            if(url.test(target.value) === false){
                console.log(0);
                return {name: target.name, message: 'invalid url'};
            };
            return {name: target.name, message:''};
        }
        case "textarea":{
            if (target.name === 'description' && filter_desc.test(target.value) === false) {
                
                return {incomplete: true, name: target.name, message: 'Only this special characters are allowed .,"()&, the limit of characters is 730'};
                
            }
            return {name: target.name, message: ''};
        }
        case 'date':{
            if(target.value.length > 0){
                target.value = target.value.toString();
                if(filter_date.test(target.value) === false) return {name: target.name, message:'Invalid date, must be D/M/YYYY or DD/MM/YYYY'};
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
        newWarning[a] = validado.message;
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

tools.order = (array) => {
    let arr = array;
    for (let i = 1; i < arr.length; i++) {
     for (let k = 0; k < i; k++) {
      while(arr[i].rating < arr[k].rating){
        let i1 = arr[i];
        let k1 = arr[k];
        arr[i] = k1;
        arr[k] = i1;
      };
     };
    }
    return arr;
};

tools.transRating = (rating) => {
    let x = rating.toString();
    let inicio = x[0];
    let final = x[1];
    let res = `${inicio}.${final}`;
    if(res > 5) res = `5`;
    return parseFloat(res);
};

tools.alpha = (results) => {
    return results.sort((a, b) =>
     a.name.localeCompare(b.name)
    );
};

tools.handleClickAlpha = (switx, setSwitx, dispatch, orderByR) => {
    dispatch(orderByR(switx))
    switx === 1 ? setSwitx(1.5) : setSwitx(1)
};

tools.handleClickRanking = (switxR, setSwitxR, dispatch, orderByR) => {
    dispatch(orderByR(switxR))
    switxR === 2 ? setSwitxR(2.5) : setSwitxR(2)
}

export default tools;