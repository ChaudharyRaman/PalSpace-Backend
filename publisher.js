const amqp = require('amqplib') //promise based library 

const msg = {
    number:process.argv[2]
}
async function connect(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));
        console.log(`Job send successfully ${msg.number}`);
    } catch (error) {
        console.log(error);
    }
}
connect();