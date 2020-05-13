

const net = require('net');


class ResponseParse{
    constructor(){
        this.WAITING_STATUS_LINE=0; //等待响应行首(status line)
        this.WAITING_STATUS_LINE_END=1; //等待 \r\n
        this.WAITING_HEADER_NAME=2; //等待headerName
        this.WAITING_HEADER_SPACE=3; //等待value前的空格
        this.WAITING_HEADER_VALUE=4; //等待headerValue
        this.WAITING_HEADER_LINE_END=5; //等待header结尾,也就是\r
        this.WAITING_HEADER_BLOCK_END=6; //空行，下一行就是body
        
        this.WAITING_BODY=7;    //切换到bodyParse

        this.current = this.WAITING_STATUS_LINE;    //当前状态，初始状态
        this.statusLine=""; //存储首行
        this.headers={};    //存储headers
        this.headerName="";  //存储headerName
        this.headerValue=""; //存储headerValue
        this.bodyParser=null;
 

    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response() {
        console.log('respon');
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return{
            statusCode:RegExp.$1,
            statusText:RegExp.$2,
            headers:this.headers,
            body:this.bodyParser.content.join('')

        }
    }

    receive(string){
        for(let i=0;i<string.length;i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){
       
        if(this.current===this.WAITING_STATUS_LINE){
            //console.log(char.charCodeAt());
           
            if(char==='\r'){
                this.current= this.WAITING_STATUS_LINE_END;
            }
            if(char==='\n'){
                this.current=this.WAITING_HEADER_NAME;
            }
            else{
                this.statusLine+=char;
            }
            //this.statusLine+=char;
        }
        
        else if(this.current===this.WAITING_STATUS_LINE_END){
          
            if(char==='\n'){
                this.current=this.WAITING_HEADER_NAME;
            }
        }
        else if(this.current===this.WAITING_HEADER_NAME){
            if(char===':'){
                this.current=this.WAITING_HEADER_SPACE;
            }
            else if(char==='\r'){
                this.current=this.WAITING_HEADER_BLOCK_END;
                if(this.headers['Transfer-Encoding']==='chunked'){
                    this.bodyParser=new TrunkedBodyParser();
                }
                
            }
            else{
                this.headerName+=char;
            }
        }
        else if(this.current===this.WAITING_HEADER_SPACE){
            if(char===' '){
              this.current=this.WAITING_HEADER_VALUE;   
            }
        }
        else if(this.current===this.WAITING_HEADER_VALUE){
            if(char==='\r'){
                this.current=this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName]=this.headerValue;
                this.headerValue="";
                this.headerName="";
                
            }else{
                this.headerValue+=char;
            }
        }
        else if(this.current===this.WAITING_HEADER_LINE_END){
            if(char==='\n'){
                this.current=this.WAITING_HEADER_NAME;
            }
        }
        else if(this.current===this.WAITING_HEADER_BLOCK_END){
            if(char==='\n'){
                this.current=this.WAITING_BODY;
            }
            
        }
        else if(this.current===this.WAITING_BODY){
           
            this.bodyParser.receiveChar(char);
        }
    }
}

/*body解析 */
class TrunkedBodyParser{
    constructor(){
        this.WATING_LENGTH=0;
       
        this.WATING_LENGTH_LINE_END=1;
        this.READING_TRUNK=2;
        this.WATING_NEW_LINE=3;
        this.WATING_NEW_LINE_END=4;
        this.isFinished=false;
        this.length=0;
        this.content=[];
        this.current=this.WATING_LENGTH;
    
    }

    receive(string){
        for(let i=0;i<string.length;i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){
        // console.log(JSON.stringify(char));
        if(this.current===this.WATING_LENGTH){
            if(char==='\r'){
                if(this.length===0){
                    
                    this.isFinished=true;
                }
                this.current=this.WATING_LENGTH_LINE_END
            }else{
                this.length*=10;
                this.length+=char.charCodeAt(0) - '0'.charCodeAt(0);
            }
        }
        else if(this.current===this.WATING_LENGTH_LINE_END){
            if(char==='\n'){
                this.current=this.READING_TRUNK;
            }
        }
        else if(this.current===this.READING_TRUNK){
            this.content.push(char);
            this.length--;
            if(this.length===0){
                this.current=this.WATING_NEW_LINE;
            }
        }
        else if(this.current===this.WATING_NEW_LINE){
            if(char==='\r'){
                this.current=this.WATING_NEW_LINE_END;
            }
        }

        else if(this.current===this.WATING_NEW_LINE_END){
            if(char==='\n'){
                this.current=this.WATING_LENGTH;
            }
        }
    }
}


class Request{
    constructor(options){
        this.method=options.method||"GET",
        this.host=options.host;
        this.port=options.port||80;
        this.path=options.path||'/';
        this.body=options.body||{};
        this.headers=options.headers||{};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"]="application/x-www-form-urlencoded";
        }
        const ContentType=this.headers["Content-Type"];
        if(ContentType==='application/json'){
            this.bodyText=JSON.stringify(this.body);
        }
        else if(ContentType==='application/x-www-form-urlencoded'){
            this.bodyText=Object.keys(this.body)
            .map(key=>`${key}=${encodeURIComponent(this.body[key])}`)
            .join('&')
        }
        this.headers["Content-Length"]=this.bodyText.length;
    }
    toString(){
        return`${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}:${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }
    send(connection){
        return new Promise((resolve,reject)=>{
            const parser= new ResponseParse();

            if(connection)
            connection.write(this.toString());
            else{
                connection = net.createConnection({
                    host:this.host,
                    port:this.port,
                    
                },()=>{
                    connection.write(this.toString());

                })
            }
            connection.on('data',(data)=>{
                parser.receive(data.toString());
                if(parser.isFinished){
                    console.log('完成了');
                    resolve(parser.response);
                }

                // console.log('statusLine',parser.statusLine);
                // console.log('header',parser.headers);
                // resolve(data.toString());
                connection.end();
            })

            connection.on('err',(err)=>{
                reject(err)
                client.end();
            })
            
        })

        
    }
}

void async function(){
    const req=new Request({
        method:"POST",
        host:"127.0.0.1",
        port:"8088",
        path:"/",
        headers:{
            ["X-Foo"]: "customed"  
        },
        body:{
            name:'winter'
        }
    })
    
    const response=await req.send();
    console.log(response);
    
}();


class Response{

}




// const client=net.createConnection({
//     host:"127.0.0.1",
//     port:8088
// },()=>{
//     // client.write(`
//     // POST/ HTTP/1.1\r
//     // Content-Type: appliaction/x-www.form-urlencoded\r
//     // Content-Length: 11\r
//     // \r
//     // name=winter`)

//     const req=new Request({
//         method:"POST",
//         host:"127.0.0.1",
//         port:"8088",
//         path:"/",
//         headers:{
//             ["X-Foo"]: "customed"  
//         },
//         body:{
//             name:'winter'
//         }
//     })

//     console.log(req.toString());
//     client.write(req.toString());
    
// })

// client.on('data', (data)=>{
//     console.log(data.toString());
//     client.end();
// })

// client.on('end',()=>{
//  console.log('disconnected from server');
// })

// client.on('error',(err)=>{
//     console.log(err);
//     client.end();
// })