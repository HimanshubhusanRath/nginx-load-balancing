const express = require("express")
const os = require('os')
const app = express()

app.get("/", (req, res) => {

    // Find the IP address of the server (This is needed to distinguish a server instance when used in containers)
    const getIpAddress = () => Object.values(os.networkInterfaces())
    .flat()
    .find(({ family, internal }) => family === 'IPv4' && !internal)
    ?.address || 'Unable to determine IP address';

    // Example usage
    const ipAddress = getIpAddress();
    console.log('IP Address:', ipAddress);
    res.send("I am an endpoint with IP "+" "+ipAddress);
})


app.listen(7777, () => {
    console.log("Server runnning at port 7777");
})

