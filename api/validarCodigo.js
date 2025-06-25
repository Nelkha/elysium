import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let db;
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const app =
    getApps().length === 0
      ? initializeApp({ credential: cert(serviceAccount) })
      : getApps()[0];
  db = getFirestore(app);
} catch (e) {
  console.error("Error inicializando Firebase Admin:", e);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;
  console.log("Código recibido:", codigo);

  if (!db) {
    console.error("Firestore no inicializado");
    return res.status(500).json({ valido: false, error: "Firestore no inicializado" });
  }

  try {
    const snapshot = await db
      .collection("solicitudes")
      .where("codigoRegistro", "==", codigo)
      .where("estado", "==", "aprobada")
      .where("codigoUsado", "==", false)
      .limit(1)
      .get();

    console.log("Snapshot size:", snapshot.size);

    if (!snapshot.empty) {
      return res.status(200).json({ valido: true });
    } else {
      return res.status(200).json({ valido: false });
    }
  } catch (error) {
    console.error("Error en la consulta:", error);
    return res.status(500).json({ valido: false, error: "Error en el servidor" });
  }
}