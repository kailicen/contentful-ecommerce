import { Service } from "@/pages";
import { atom } from "recoil";

interface CartState {
  items: Service[];
}

const defaultCartState: CartState = {
  items: [],
};

export const cartState = atom<CartState>({
  key: "cartState",
  default: defaultCartState,
});
