const amqp = require('amqplib') //promise based library


async function connect(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");
        channel.consume("jobs",message =>{
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);

            if(input.number == 7){
                channel.ack(message);
            }

        })
        console.log("waiting for message")
    } catch (error) {
        console.log(error);
    }
}
connect();