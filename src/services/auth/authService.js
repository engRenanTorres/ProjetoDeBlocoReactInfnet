import { APIClient as apiClient } from "../../clients/apiClient.js";
import { tokenService } from "./tokenService.js";

export const authService = {
  async login({ username, password }) {
    return apiClient
      .post("/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (!response.ok) throw new Error("Usuário ou senha inválidos");
        const body = response.body;
        if (body.token) tokenService.save(body.token);
      })
      .catch((e) => {
        console.error(e);
        alert(e.message);
      });
  },
};
