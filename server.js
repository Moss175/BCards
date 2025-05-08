const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const resend = new Resend('re_KxkyJCNJ_EryNKc2384JvALLxp8Msx5WE');

app.use(express.static(path.join(__dirname)));

app.post('/send-email', async (req, res) => {
  const { name, title, mobile, desk, email, color } = req.body;

  const html = `
    <h2>New Business Card Order</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Desk:</strong> ${desk || 'N/A'}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Color:</strong> ${color}</p>
  `;

  try {
    await resend.emails.send({
      from: 'Business Cards <business@welcometognt.com>',
      to: ['mmoss@angstrom-usa.com'],
      subject: 'New Aluminum Business Card Order',
      html
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email failed:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
