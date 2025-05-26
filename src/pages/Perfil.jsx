import React, { useEffect, useState } from "react";
import { auth } from "../firebase";  // caminho correto do seu firebase.js
import { onAuthStateChanged } from "firebase/auth";

export const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isDefaultPhoto = (user) => {
    if (!user?.photoURL) return true;
    return user.photoURL.includes("default");
  };

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>

      <div className="flex items-center mb-4">
        {isDefaultPhoto(user) ? (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xl font-bold">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
          </div>
        ) : (
          <img
            src={user.photoURL}
            alt="Foto do usuário"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}

        <div className="ml-4">
          <p className="font-semibold">{user.displayName || "Sem nome"}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
