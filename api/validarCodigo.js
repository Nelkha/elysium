import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializa Firebase Admin solo una vez
const app = initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;

  try {
    // Busca una solicitud aprobada con ese código y que no esté usada
    const snapshot = await db
      .collection("solicitudes")
      .where("codigo", "==", codigo)
      .where("estado", "==", "aprobada")
      .where("codigoUsado", "==", false)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return res.status(200).json({ valido: true });
    } else {
      return res.status(200).json({ valido: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ valido: false, error: "Error en el servidor" });
  }
}