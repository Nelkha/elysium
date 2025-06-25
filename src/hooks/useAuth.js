import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Verifica si es miembro
        const q = query(collection(db, "miembros"), where("email", "==", firebaseUser.email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          await signOut(auth);
          setUser(null);
        } else {
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export async function loginSoloMiembros() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email;

  // Verifica si el email está en miembros
  const q = query(collection(db, "miembros"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    // No es miembro, cerrar sesión y mostrar mensaje
    await signOut(auth);
    throw new Error("Tu cuenta no está habilitada. Solicita acceso o espera aprobación.");
  }

  // Si pasa, el usuario puede continuar
}