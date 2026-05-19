import OrderDetails from "./OrderDetails/OrderDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import EmptyState from "./EmptyState/EmptyState";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

import "./Order.css";

const Order = () => {
  let { store } = useGlobalContext();
  const cartHasItems = store.state.cart.length > 0;

  return (
    <section className="main-order-container">
      <div className="view-order">
        <div className="order-title">
          <div>
            <h2>Shopping Cart</h2>
            <p>Review your items before checkout</p>
          </div>
          <span className="order-item-pill">{store.state.cartQuantity} items</span>
        </div>
        <div className="order-container">
          {(cartHasItems &&
            store.state.cart.map((product) => {
              return (
                <OrderDetails key={product.id} product={product}></OrderDetails>
              );
            })) || <EmptyState></EmptyState>}
        </div>
      </div>
      <aside className="order-summary-panel">
        <h2>Order Summary</h2>
        <OrderSummary></OrderSummary>
      </aside>
    </section>
  );
};
export default Order;
