/**
 * Cloudflare Pages Function — POST /api/cotizacion
 * Recibe el formulario de contacto de streetvision.cl y, vía ZeptoMail:
 *   1) Notifica a contacto@streetvision.cl (con reply-to al visitante)
 *   2) Manda un auto-reply branded al visitante
 *
 * Requiere variable de entorno en Cloudflare Pages:
 *   ZEPTO_TOKEN = "Zoho-enczapikey xxxxxxxx"   (Settings → Environment variables, cifrada)
 */

const ZEPTO_API = 'https://api.zeptomail.com/v1.1/email';
const FROM = { address: 'contacto@streetvision.cl', name: 'Street Vision' };
const NOTIFY_TO = 'contacto@streetvision.cl';
const LOGO = 'https://streetvision.cl/logo-correo.png';
const WA = 'https://wa.me/56951015652';

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const form = await request.formData();
    const d = {
      nombre:   str(form.get('nombre')),
      empresa:  str(form.get('empresa')),
      email:    str(form.get('email')),
      telefono: str(form.get('telefono')),
      servicio: str(form.get('servicio')),
      mensaje:  str(form.get('mensaje')),
      botcheck: form.get('botcheck'),
    };

    if (d.botcheck) return json({ success: true });                 // honeypot → finge éxito
    if (!d.email || d.email.indexOf('@') < 0) return json({ success: false, message: 'Email inválido' }, 400);
    if (!env.ZEPTO_TOKEN) return json({ success: false, message: 'Servicio no configurado' }, 500);

    const headers = {
      'Authorization': env.ZEPTO_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // 1) Notificación interna (con reply-to al visitante para responder directo)
    const notify = await fetch(ZEPTO_API, { method: 'POST', headers, body: JSON.stringify({
      from: FROM,
      to: [{ email_address: { address: NOTIFY_TO, name: 'Street Vision' } }],
      reply_to: [{ address: d.email, name: d.nombre || d.email }],
      subject: 'Nueva cotización web · ' + (d.empresa || d.nombre || d.email),
      htmlbody: notifyHtml(d),
    }) });
    if (!notify.ok) {
      const t = await notify.text();
      return json({ success: false, message: 'No se pudo enviar (' + notify.status + ')', detail: t }, 502);
    }

    // 2) Auto-reply branded al visitante (no bloqueante)
    await fetch(ZEPTO_API, { method: 'POST', headers, body: JSON.stringify({
      from: FROM,
      to: [{ email_address: { address: d.email, name: d.nombre || '' } }],
      subject: '¡Recibimos tu solicitud, ' + firstName(d.nombre) + '! · Street Vision',
      htmlbody: replyHtml(d),
    }) });

    return json({ success: true });
  } catch (e) {
    return json({ success: false, message: 'Error: ' + (e && e.message) }, 500);
  }
}

/* ---------- helpers ---------- */
function str(v) { return (v == null ? '' : v.toString()).trim(); }
function firstName(n) { return ((n || '').split(' ')[0]) || 'hola'; }
function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/* ---------- correo interno (para Matias) ---------- */
function notifyHtml(d) {
  function row(k, v) {
    return v ? '<tr><td style="padding:6px 12px;color:#5E709A;font-size:13px;white-space:nowrap;">' + k +
      '</td><td style="padding:6px 12px;color:#15224A;font-size:14px;font-weight:600;">' + esc(v) + '</td></tr>' : '';
  }
  return [
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:auto;">',
    '<h2 style="color:#0F1A36;">Nueva cotización desde streetvision.cl</h2>',
    '<table role="presentation" style="border-collapse:collapse;background:#F4F7FC;border-radius:10px;width:100%;">',
    row('Nombre', d.nombre), row('Empresa', d.empresa), row('Email', d.email),
    row('Teléfono', d.telefono), row('Plan de interés', d.servicio),
    '</table>',
    d.mensaje ? '<p style="color:#15224A;font-size:14px;margin-top:16px;"><b>Mensaje:</b><br>' + esc(d.mensaje).replace(/\n/g, '<br>') + '</p>' : '',
    '<p style="color:#5E709A;font-size:12px;margin-top:18px;">Responde directo a este correo para contactar al cliente.</p>',
    '</div>',
  ].join('');
}

/* ---------- auto-reply al visitante (branded) ---------- */
function replyHtml(d) {
  var planLine = d.servicio
    ? '<table role="presentation" width="100%" style="border-top:1px solid #243466;border-bottom:1px solid #243466;font-size:14px;margin:8px 0 18px;">' +
      '<tr><td style="padding:8px 0;color:#9DB2D6;">Plan de interés</td>' +
      '<td style="padding:8px 0;color:#E8EEF9;font-weight:600;text-align:right;">' + esc(d.servicio) + '</td></tr></table>'
    : '';
  return [
    '<div style="background:#0A1228;padding:32px 0;font-family:Helvetica,Arial,sans-serif;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">',
    '<table role="presentation" width="540" cellpadding="0" cellspacing="0" style="background:#0F1A36;border-radius:16px;overflow:hidden;border:1px solid #243466;">',
    '<tr><td style="background:#0F1A36;padding:26px 32px;border-bottom:2px solid #FF8C2A;text-align:center;">',
    '<img src="' + LOGO + '" alt="Street Vision · La ciudad está mirando." width="200" style="display:inline-block;width:200px;max-width:62%;height:auto;border:0;">',
    '</td></tr>',
    '<tr><td style="padding:32px;">',
    '<p style="color:#E8EEF9;font-size:17px;margin:0 0 14px;">¡Hola, ' + esc(firstName(d.nombre)) + '! 👋</p>',
    '<p style="color:#9DB2D6;font-size:15px;line-height:1.6;margin:0 0 18px;">',
    'Recibimos tu solicitud' + (d.empresa ? ' para <b style="color:#E8EEF9;">' + esc(d.empresa) + '</b>' : '') + '. ',
    'Nuestro equipo la está revisando y te contactará a la brevedad (normalmente en menos de 24 horas) con una propuesta a tu medida para la pantalla LED del centro de Constitución.</p>',
    planLine,
    '<p style="color:#9DB2D6;font-size:15px;line-height:1.6;margin:0 0 22px;">¿Prefieres avanzar más rápido? Escríbenos por WhatsApp y lo vemos al tiro.</p>',
    '<a href="' + WA + '" style="display:inline-block;background:#FF8C2A;color:#0A1228;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:10px;">Hablar por WhatsApp</a>',
    '</td></tr>',
    '<tr><td style="background:#0A1228;padding:20px 32px;color:#5E709A;font-size:12px;line-height:1.6;">',
    'Street Vision · Publicidad LED · Constitución, Región del Maule<br>',
    'contacto@streetvision.cl · streetvision.cl',
    '</td></tr>',
    '</table></td></tr></table></div>',
  ].join('');
}
