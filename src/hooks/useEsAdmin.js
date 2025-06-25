import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export function useEsAdmin(user) {
  const [esAdmin, setEsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setVerificando(true);
    if (user && user.email) {
      const q = query(
        collection(db, "miembros"),
        where("email", "==", user.email.trim().toLowerCase()),
        where("acceso", "==", "admin")
      );
      getDocs(q).then(snapshot => {
        if (!cancelado) {
          setEsAdmin(!snapshot.empty);
          setVerificando(false);
        }
      });
    } else {
      setEsAdmin(false);
      setVerificando(false);
    }
    return () => { cancelado = true; };
  }, [user]);

  return { esAdmin, verificando };
}