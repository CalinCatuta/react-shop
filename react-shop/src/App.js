// components
import Nav from "./components/Nav";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  return (
    <main>
      {isOpen && <Modal />}
      <Nav />
      <CartContainer />
    </main>
  );
}
export default App;
