const amqp = require("amqplib");
require('dotenv/config')
const msg = {number: process.argv[2]}
connect();
async function connect() {

    try {
        // const amqpServer = process.env.rabbitRemote
        const amqpServer = process.env.rabbitServer
        // const amqpServer = "amqp://admin:password@rabbitmq.chetanpareek.tech"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("tm queue");
        // await channel.sendToQueue("tm queue", Buffer.from(JSON.stringify(msg)))        
        await channel.sendToQueue("tm queue", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}

