import { z } from 'zod';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // nodemailer requiere Node, no Edge

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.enum(['webmovil','software','ia','apis']).optional(),
  message: z.string().min(10),
  // honeypot anti-bots (debe venir vacío)
  website: z.string().optional().default(''),
});

function createTransport() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = (process.env.SMTP_SECURE ?? 'true') === 'true';
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = LeadSchema.safeParse(json);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    const { name, email, service, message, website } = parsed.data;
    // honeypot: si trae valor, ignoramos (probable bot), pero respondemos 200
    if (website && website.trim() !== '') return Response.json({ ok: true });

    const transport = createTransport();

    const to = process.env.LEAD_TO || process.env.SMTP_USER!;
    const from = process.env.LEAD_FROM || process.env.SMTP_USER!;
    const subject = `Nuevo lead — ${name} (${service ?? 'general'})`;

    const plain = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Servicio: ${service ?? 'No especificado'}`,
      '',
      'Mensaje:',
      message,
      '',
      `Origen: ${req.headers.get('referer') ?? ''}`,
    ].join('\n');

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,SegoeUI,Roboto,sans-serif;color:#0f172a">
        <h2 style="margin:0 0 8px">Nuevo lead</h2>
        <p style="margin:0 0 12px">Servicio: <b>${service ?? 'No especificado'}</b></p>
        <p><b>Nombre:</b> ${name}<br/>
           <b>Email:</b> ${email}</p>
        <p style="white-space:pre-wrap;background:#f1f5f9;padding:12px;border-radius:10px">${message}</p>
        <p style="margin-top:16px;color:#64748b">Origen: ${req.headers.get('referer') ?? ''}</p>
      </div>
    `;

    await transport.sendMail({
      from,
      to,
      subject,
      text: plain,
      html,
      replyTo: email, // para que al “Responder” vaya al cliente
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('lead error', err);
    return Response.json({ ok: false, error: 'MAIL_ERROR' }, { status: 500 });
  }
}
