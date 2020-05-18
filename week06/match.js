/**
 * 匹配abababx
*/

 function match(string){
    let state=start;
    for(var char of string){
        state=state(char);
    }

    return state===end;
 }
 function start(c){
     if(c==='a'){
        return foundA
     }else{
         return start
     }
 }
 function foundA(c){
    if(c==='b'){
        return foundB
    }else{
        return start
    }
 }
 function foundB(c){
    if(c==='a'){
        return foundA2
    }else{
        return start
    }
 }

function foundA2(c){
    if(c==='b'){
        return foundB2
    }else{
        return start
    }
}
function foundB2(c){
    if(c==='x'){
        return end;
    }
    else if(c==='a'){
         return foundA2
    }
    else if(c==='b'){
        return foundB2
    }
    else{
        return start
    }
}


function end(c){
    return end
}

console.log(match('abababababx'));