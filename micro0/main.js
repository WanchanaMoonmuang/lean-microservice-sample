const express = require('express');
const cors = require('cors');
const app = express();

const frontendUrl = 'http://localhost:8000'
const serviceName = 'service0'

// Configure CORS
const corsOptions = {
    origin: frontendUrl, // Replace with the origin of your main website
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));


// Define routes to serve HTML content
app.get('/button', (req, res) => {
    // HTML content for the button
    const buttonHtml = `<a href="${frontendUrl}/${serviceName}" class="w3-bar-item w3-button">Click Me I am from #0</a>`;

    // Send the HTML content as response
    res.send(buttonHtml);
});

app.get('/additional-content', (req, res) => {
    // HTML content to be loaded when the button is clicked
    const additionalContentHtml = `<p>This is additional content loaded from the microservice #0.</p>`;

    // Send the HTML content as response
    res.send(additionalContentHtml);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Microservice running on port ${port}`);
});