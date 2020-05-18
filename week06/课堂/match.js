function match(string){
    let foundA=false
    let foundB=false;
    let foundC=false;
    for(var char of string){
        if(char==='a'){
            foundA=true
        }
        else if(foundA&&char==='b'){
            foundB=true;
        }
        else if(foundB&&char==='c'){
            return true;
        }
        else{
            foundA=false;
            foundB=false;
            foundC=false;
        }
    }
}


console.log(match('123456abc'));