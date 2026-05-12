// Vercel Serverless Function for AVORA leads via Resend.
// Set these environment variables in Vercel/hosting:
// RESEND_API_KEY=re_xxxxxxxxx
// LEAD_TO_EMAIL=avora.contacto@gmail.com
// LEAD_FROM_EMAIL=AVORA Leads <onboarding@resend.dev>  // replace after domain verification

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'avora.contacto@gmail.com';
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'AVORA Leads <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar RESEND_API_KEY en el servidor.' });
  }

  const lead = req.body || {};
  const safe = (value) => String(value || '').replace(/[<>]/g, '');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2>Nuevo lead de AVORA Business Growth</h2>
      <p><strong>Nombre:</strong> ${safe(lead.nombre)}</p>
      <p><strong>Email:</strong> ${safe(lead.email)}</p>
      <p><strong>Teléfono / WhatsApp:</strong> ${safe(lead.telefono)}</p>
      <p><strong>Hotel:</strong> ${safe(lead.hotel)}</p>
      <p><strong>Ciudad / ubicación:</strong> ${safe(lead.ciudad)}</p>
      <p><strong>Número de habitaciones:</strong> ${safe(lead.habitaciones)}</p>
      <p><strong>Tipo de hotel:</strong> ${safe(lead.tipo)}</p>
      <p><strong>Reto actual:</strong> ${safe(lead.reto)}</p>
      <p><strong>Membresía de interés:</strong> ${safe(lead.membresia)}</p>
      <p><strong>Mayor reto operativo:</strong><br/>${safe(lead.mensaje).replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p style="font-size:12px;color:#555;">Lead enviado desde el formulario web de AVORA.</p>
    </div>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: safe(lead.email),
        subject: `Nuevo lead AVORA - ${safe(lead.hotel) || safe(lead.nombre) || 'Solicitud de diagnóstico'}`,
        html,
      }),
    });

    const data = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      return res.status(resendResponse.status).json({ error: data?.message || 'Resend rechazó el envío.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (error) {
    return res.status(500).json({ error: 'Error enviando el lead.' });
  }
}
