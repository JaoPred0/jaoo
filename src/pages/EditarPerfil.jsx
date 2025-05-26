import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

export const EditarPerfil = () => {
  const [user, setUser] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setNovoNome(u?.displayName || "");
    });
    return () => unsubscribe();
  }, []);

  const handleSalvar = async () => {
    setMsg("");

    try {
      // Se for trocar a senha, precisa da senha atual e confirmação
      if (novaSenha || confirmarSenha || senhaAntiga) {
        if (!senhaAntiga) return setMsg("Digite a senha atual.");
        if (novaSenha !== confirmarSenha)
          return setMsg("A nova senha e a confirmação não coincidem.");
        if (novaSenha.length < 6)
          return setMsg("A nova senha deve ter no mínimo 6 caracteres.");

        const cred = EmailAuthProvider.credential(user.email, senhaAntiga);
        await reauthenticateWithCredential(user, cred);
        await updatePassword(user, novaSenha);
      }

      // Atualiza o nome se for diferente
      if (novoNome && novoNome !== user.displayName) {
        await updateProfile(user, { displayName: novoNome });
      }

      setMsg("Alterações salvas com sucesso!");
      setSenhaAntiga("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      setMsg("Erro: " + error.message);
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

      <label className="block mb-2 font-medium">Nome</label>
      <input
        type="text"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      <hr className="my-4" />

      <label className="block mb-2 font-medium">Senha atual (somente se for trocar)</label>
      <input
        type="password"
        value={senhaAntiga}
        onChange={(e) => setSenhaAntiga(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      <label className="block mb-2 font-medium">Nova senha</label>
      <input
        type="password"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      <label className="block mb-2 font-medium">Confirmar nova senha</label>
      <input
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      {msg && <p className="text-red-600 mb-4">{msg}</p>}

      <button
        onClick={handleSalvar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar alterações
      </button>
    </div>
  );
};
