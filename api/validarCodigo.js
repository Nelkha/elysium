import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializa Firebase Admin solo si no está inicializado
const app =
  getApps().length === 0
    ? initializeApp({ credential: applicationDefault() })
    : getApps()[0];

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;

  try {
    // Busca una solicitud aprobada con ese código y que no esté usado
    const snapshot = await db
      .collection("solicitudes")
      .where("codigoRegistro", "==", codigo)
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