const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');

// Serve static files from the 'views' directory (assuming frontend files are in the 'views' directory)
app.use(express.static(path.join(__dirname, 'views')));

// Define the URLs of the backend services
const backendServices = {
    service0: 'http://localhost:3000', // Replace with the URL of your backend service 1
    service1: 'http://localhost:3001', // Replace with the URL of your backend service 2
    // Add more services as needed
};

// Function to fetch HTML content from a backend service
async function fetchHTMLFromBackend(serviceName, endpoint) {
    try {
        // console.log(`getting: ${backendServices[serviceName]}/${endpoint}`)
        const response = await axios.get(`${backendServices[serviceName]}/${endpoint}`);
        // console.log(`response: ${response.data}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching HTML from ${serviceName}, endpoint: ${endpoint}`, error);
        return ''; // Return empty string if an error occurs
    }
}

app.get('/sidebar', async (req, res) => {

    // const { service } = req.params;
    // const { '0': endpoint } = req.params;
    // console.log(`params: ${req.params}, service: ${service}, endpoint: ${endpoint}`)
    let content = "";
    for (let service in backendServices) {
        content += await fetchHTMLFromBackend(service, 'button');
    }
    // const htmlContent = await fetchHTMLFromBackend('service0', 'button');
    res.json({ "sidebar": content });
});

// Route to fetch HTML content from backend services
app.get('/:service', async (req, res) => {
    const service = req.params.service;
    const endpoint = "additional-content";
    console.log(`service: ${service}, endpoint: ${endpoint}`)
    const htmlContent = await fetchHTMLFromBackend(service, endpoint);

    res.render('index', { "content": htmlContent })

});

app.get('/listing', async (req, res) => {

    // const { service } = req.params;
    // const { '0': endpoint } = req.params;
    // console.log(`params: ${req.params}, service: ${service}, endpoint: ${endpoint}`)
    let content = "";
    for (let service in backendServices) {
        content += await fetchHTMLFromBackend(service, 'button');
    }
    // const htmlContent = await fetchHTMLFromBackend('service0', 'button');
    res.send(content);
});


// Route all other requests to serve the React app
app.get('/', async (req, res) => {

    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', { "content": "Welcome from core" })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
