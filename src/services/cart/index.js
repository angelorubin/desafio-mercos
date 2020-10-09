import http from "config/api";

export const fetchItems = async () => {
  return await http.get("carrinho", (items) => items);
};

export const fetchDiscountPolicies = async () => {
  return await http.get("politicas-comerciais", (policies) => policies.data);
};
