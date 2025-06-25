export async function sendEmail({ to, subject, text, html }) {
  try {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text, html }),
    });
    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Error enviando email:", error);
    return false;
  }
}

await sendEmail({
  to: solicitud.email,
  subject: "¡Solicitud aprobada!",
  html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #18181b; color: #fff; padding: 24px; border-radius: 12px;">
      <h2 style="color: #a78bfa;">¡Saludos, aventurero!</h2>
      <p>
        ¡Felicitaciones! Tu solicitud fue aprobada.<br>
        Usa este código único para registrarte: <b>${codigo}</b>
      </p>
      <hr style="border: none; border-top: 1px solid #a78bfa; margin: 24px 0;">
      <p style="color: #a78bfa;">Equipo Elysium</p>
    </div>
  `
});