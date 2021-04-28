//FS MODULE 
const fs_ = require('fs');
fs_.writeFileSync('Text1.txt','Hello world, This is the first code from Node.Js');


// Use './__' for local files & for global modules '__'
// console.log(__filename);
// console.log(__dirname);


//PATH MODULE
const path_ = require('path');
//File name
console.log(path_.basename(__filename));
//Directory name
console.log(path_.dirname(__filename));
//Path extension
console.log(path_.extname(__filename));
//Path Object
console.log(path_.parse(__filename));
console.log(path_.parse(__filename).base);
//Concatenate 
console.log(path_.join(__dirname,'test','hi.html'));


//HTTP MODULE & ROUTING 
const http_ = require('http');

const routes_ = require('./routes');
console.log(routes_.someText);
const server_ = http_.createServer(routes_.handler);

server_.listen(3000);