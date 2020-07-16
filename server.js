const express = require('express');
const app = express();
const port = process.env.port || 8080;
const path = require('path');

app.use(express.static(path.join(__dirname, '')));
app.get('/*', (req, res) => {
    const destPath = path.join(__dirname, 'index.html');
    res.sendFile(destPath);
});
app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`);
});