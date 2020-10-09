import http from "config/api";

export const postItems = async (data) => {
  return await http.post("carrinho", data);
};
