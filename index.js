import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 2137 });
  
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        const opcode = data.split(".")[0];
        const content = data.split(".").slice(1).join(".");
        console.log('received: %s', data);
        switch(opcode)
        {
            case 0:
                ws.send(`1.${content}`);
                break;
        }
    });

    ws.send('something');
});