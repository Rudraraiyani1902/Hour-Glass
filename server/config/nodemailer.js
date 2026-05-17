import nodemailer from 'nodemailer'
import brevoTransport from 'nodemailer-brevo-transport'
import 'dotenv/config';

const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_API || '';
let transporter;
let transportMode = 'unknown';

if (apiKey) {
    try {
        transporter = nodemailer.createTransport(
            new brevoTransport({ apiKey })
        );
        transportMode = 'brevo';
    } catch (e) {
        console.error('[nodemailer] Failed to create Brevo transport, falling back to jsonTransport', e && e.stack ? e.stack : e);
        transporter = nodemailer.createTransport({ jsonTransport: true });
        transportMode = 'json-fallback';
    }
} else {
    // Local/dev fallback: don't crash if BREVO key missing — use a JSON transport that prints messages
    console.warn('[nodemailer] BREVO_API_KEY not set — using jsonTransport fallback (emails will be printed, not delivered)');
    transporter = nodemailer.createTransport({ jsonTransport: true });
    transportMode = 'json-fallback';
}

// Attach mode for introspection
transporter.transportMode = transportMode;

export default transporter;