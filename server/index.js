    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000; // Define the port

    // Define a basic route
    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });