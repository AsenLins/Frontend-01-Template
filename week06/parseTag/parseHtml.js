
const EOF=Symbol('EOF'); //End OF file
let currentToken={

}
function data(c){
    if(c==='<'){
        return tagOpen;
    }else if(c===EOF){
        return;
    }else{
        return data;
    }
}

function parseHTML(html){
    let state=data;
    for(var char of html){
        state=state(char)
    }

    state=state(EOF);
}

function tagOpen(c){
    if(c==='/'){
        return tagEnd;
    }else if(c.match(/^[a-zA-z]$/)){
        return tagName(c)
    }else{
        return;
    }
}

function tagEnd(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken={
            type:'endTag',
            tagName:""
        }
        return tagName(c);
    }else if(c===">"){
        
    }else if(c===EOF){

    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }
    else if(c==='/'){
        return selfCloseingStartTag;
    }
    else if(c.match(/^[a-zA-z]$/)){
        return tagName
    }
    else if(c==='>'){
        return data;
    }
    else{
        return tagName
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c==">"){
        return data;
    }else if(c==="="){
        return beforeAttributeName;
    }else{
        return beforeAttributeName;
    }
}

function selfCloseingStartTag(){
    if(c==='>'){
        currentToken.isSelfClosing=true;
        return data;
    }else if(c==="EOF"){

    }else{

    }
}


let testHtml=`<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>    
`

console.log(parseHTML(testHtml));


module.exports.parseHTML=parseHTML;