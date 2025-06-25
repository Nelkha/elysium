export async function sendEmail({ to, subject, text }) {
  try {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text }),
    });
    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Error enviando email:", error);
    return false;
  }
}