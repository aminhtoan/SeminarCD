import "./OrderDetails.css";

import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const OrderDetails = ({ product }) => {
  const { store } = useGlobalContext();
  const formattedPrice = Number(product.price || 0).toLocaleString();

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          <img src={product.image} alt={product.name || "Cart product"} />
        </div>
        <div className="right-side">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="order-price">
        <p className="order-label">Price</p>
        <h3>${formattedPrice}</h3>
      </div>
      <div className="quantity">
        <p className="order-label">Quantity</p>
        <div className="increase-quantity">
          <button
            aria-label="Decrease quantity"
            onClick={() => {
              store.reduceQuantity(product.id);
            }}
          >
            -
          </button>
          <p>{product.quantity || 1}</p>
          <button
            aria-label="Increase quantity"
            onClick={() => {
              store.addQuantity(product.id);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="remove">
        <button
          onClick={() => {
            store.removeFromCart(product?.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default OrderDetails;
