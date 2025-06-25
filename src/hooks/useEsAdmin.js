import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export function useEsAdmin(user) {
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      const q = query(
        collection(db, "miembros"),
        where("email", "==", user.email.trim().toLowerCase()),
        where("acceso", "==", "admin")
      );
      getDocs(q).then(snapshot => {
        setEsAdmin(!snapshot.empty);
      });
    } else {
      setEsAdmin(false);
    }
  }, [user]);

  return esAdmin;
}