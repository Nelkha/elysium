import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, codigo } = req.body;

  try {
    // Busca el código válido
    const snapshot = await db
      .collection("codigos_registro")
      .where("codigo", "==", codigo)
      .where("usado", "==", false)
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(400).json({ success: false, error: "Código inválido, ya usado o email no coincide." });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Crea el miembro con los datos del código
    await db.collection("miembros").add({
      ...data,
      fechaingreso: Timestamp.now(),
      usado: undefined, // No copies el campo usado al miembro
      codigo: undefined, // Opcional: si no quieres guardar el código en miembros
      creado: undefined, // Opcional: si no quieres guardar la fecha de creación del código
    });

    // Marca el código como usado
    await doc.ref.update({ usado: true });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Error en el servidor" });
  }
}