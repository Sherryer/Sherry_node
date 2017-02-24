var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var _ = require('underscore');
app.listen(3000);
var hashName = new Array();

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function(socket){
    console.log(io.sockets.sockets);
    console.log('connection is established!');
    var name;
    socket.on('setName',function (data) {
        name = data;
        hashName[name] = socket.id;
        console.log(hashName);
    });
    socket.on('sayTo',function (data) {
        var toName = data.to;
        var toId;
        if(toId = hashName[toName]){
            var toSocket = _.findWhere(io.sockets.sockets,{id:toId});
            toSocket.emit('message',data.msg);
        }
    })
    socket.on('disconnect', function(){
        console.log('connection is disconnect!');
        delete hashName[name]
    });
});


// 参考地址
// http://blog.csdn.net/koastal/article/details/53677766