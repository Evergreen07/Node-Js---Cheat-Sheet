const fs_ = require('fs');

const reqHandler = ( req, res ) => {
    // console.log(req);
    console.log(req.url, req.method, req.headers);
    // process.exit(); // It forces exit of Node js event loop, which in general we don't want. 

    const url_ = req.url;
    const method_ = req.method;

    if(url_ === '/')
    {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>First Node : Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if(url_ === '/message' && method_=== 'POST')
    {   const body_ = [];
        // on() is a type of event listenner 
        // Data event will be fired whenever a new chunk is ready to be read, acting as a buffer
        req.on('data', (chunk) => {
            console.log(chunk);
            body_.push(chunk);
            console.log(body_);
        }); 

        return req.on('end', () => {
            const parsedBody_ = Buffer.concat(body_).toString();
            console.log(parsedBody_);
            const message_ = parsedBody_.split('=')[1];
            // fs_.writeFileSync('Message.txt', message_); 
            //Sync is a method which will stop further code execution untill the block of code is executed.

            fs_.writeFile('Message.txt', message_, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });

            //This is an asynchronous method which takes a callback. Internally it tells the OS to perform the task, & comes back to execute the further lines of code in the block.
            
        });
        // Node on entering this if statement block, doesn't execute the on() listenners, rather registers a method internally and moves to other parts of the block. 
        // Hence doesn't wait for the thing that would slow down the server for other incoming requests.
        // If 'return' isn't added before end, then it would execute the next 'Content-Type' block.
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First Node</title></head>')
    res.write('<body><h1>Heyy Welcome !!! From Node Js server</h1></body>')
    res.write('</html>');
    res.end();
}

// module.exports =  reqHandler; // Single exports

// Multiple exports
module.exports = {
    handler : reqHandler,
    someText : 'Some dummy text here...'
}