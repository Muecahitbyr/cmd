import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, date, time, message } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  const lines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone}`,
    service && `Dienstleistung: ${service}`,
    date && `Wunschdatum: ${date}`,
    time && `Uhrzeit: ${time}`,
    '',
    message || '',
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from: `"CMD Website" <${process.env.BREVO_SENDER}>`,
      to: process.env.BREVO_RECEIVER,
      replyTo: email,
      subject: `Terminanfrage von ${name}`,
      text: lines.join('\n'),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Booking email failed', err);
    return res.status(500).json({ error: 'Send failed' });
  }
}
