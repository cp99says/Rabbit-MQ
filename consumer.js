const amqp = require("amqplib");

require('dotenv/config')

connect();
async function connect() {

    try {
        // const amqpServer = process.env.rabbitRemote
        // const amqpServer = "amqp://localhost:5672"
        const amqpServer = process.env.rabbitServer
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("tm queue");
        
        channel.consume("tm queue", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            //"7" == 7 true
            //"7" === 7 false

            if (input.number == 7891 ) 
                channel.ack(message);
            // channel.ack(message)
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}