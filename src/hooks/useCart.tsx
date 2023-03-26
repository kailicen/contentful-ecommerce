import { useRecoilState } from "recoil";
import { cartState } from "@/atoms/cartAtom";
import { Service } from "@/pages";

const useCart = () => {
  const [cartStateValue, setCartStateValue] = useRecoilState(cartState);

  const addToCart = (service: Service) => {
    if (
      service &&
      !cartStateValue.items.find((item) => item.sys.id === service.sys.id)
    ) {
      setCartStateValue((prev) => ({
        items: [...prev.items, service],
      }));
    }
  };

  const removeFromCart = (service: Service) => {
    setCartStateValue((prev) => ({
      items: prev.items.filter((item) => item.sys.id !== service.sys.id),
    }));
  };

  return {
    cartStateValue,
    addToCart,
    removeFromCart,
  };
};
export default useCart;
