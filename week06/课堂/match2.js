
function match(string){
    let state=start;
    for(var c of string){
        state=state(c);
    }

    return state===end;
    
}


function start(c){
    if(c==='a'){
        return foundB
    }
    else{
        return start
    }
    
}

function foundB(c){
    if(c==='b'){
        return foundC
    }else{
        return start
    }
    
}

function foundC(c){
    if(c==='c'){
        return foundD
    }else{
        return start
    }
    
}

function foundD(c){
    if(c==='d'){
        return end
    }else{
        return start
    }
}

function end(c){
    return end
}

console.log(match('abcd'));