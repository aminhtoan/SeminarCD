import "./OrderSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const shippingCost = deliveryType === "Standard" ? 5 : 10;
  const totalCost =
    store.state.cart.length > 0 ? store.state.cartTotal + shippingCost : 0;

  const setDelivery = (type) => {
    setDeliveryType(type);
  };

  const checkOut = async () => {
    let payload = {
      DeliveryType: deliveryType,
      DeliveryTypeCost: shippingCost,
      costAfterDelieveryRate:
          store.state.cartTotal + shippingCost,
      promoCode: "",
      phoneNumber: phone,
      paymentMethod: paymentMethod,
      user_id: auth.state.user?.id,
    };

    const response = await store.confirmOrder(payload);
    if (response.showRegisterLogin) {
      modal.openModal();
    }
  };

  return (
    <div className="order-summary-card">
      <div className="summary-row">
        <h4>Total Items ({store.state.cartQuantity})</h4>
        <h4>${Number(store.state.cartTotal || 0).toLocaleString()}</h4>
      </div>

      <div className="order-summary-field">
        <h4>Shipping</h4>
        <select
          className="order-summary-input"
          onChange={(item) => {
            setDelivery(item.target.value);
          }}
          value={deliveryType}
        >
          <option value="Standard" className="select">
            Standard ($5)
          </option>
          <option value="Express" className="select">
            Express ($10)
          </option>
        </select>
      </div>

      <div className="order-summary-field">
        <h4>Promo Code</h4>
        <div className="promo-row">
          <input
            className="order-summary-input"
            type="text"
            placeholder="SAVE10"
          />
          <button
            className="flat-button apply-promo"
            disabled={store.state.cartQuantity <= 0}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="order-summary-field">
        <h4>Phone Number</h4>
        <input
          className="order-summary-input"
          type="text"
          placeholder="Enter your phone number"
          onChange={(item) => {
            setPhone(item.target.value);
          }}
          value={phone}
        />
        <small className="phone-note">
          <em>Your number would be called to verify the order placement</em>
        </small>
      </div>

      <div className="order-summary-field payment-method">
        <h4>Payment Method</h4>
        <select
          className="order-summary-input"
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
        >
          <option value="CASH_ON_DELIVERY" className="select">
            Cash on Delivery
          </option>
          <option value="VNPAY" className="select">
            VNPay
          </option>
        </select>
      </div>

      <div className="final-cost">
        <h4>Total Cost</h4>
        <h4>${Number(totalCost).toLocaleString()}</h4>
      </div>

      <div className="final-checkout">
        <button
          className="flat-button checkout"
          onClick={() => {
            if (phone.length > 0) {
              checkOut();
              if (paymentMethod !== "VNPAY") {
                toast.info("Your order is being processed");
              }
              return;
            }
            toast.error("Please enter your phone number");
          }}
          disabled={store.state.cartQuantity <= 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default OrderSummary;
