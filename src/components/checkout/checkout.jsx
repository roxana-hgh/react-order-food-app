import { useContext, useState } from "react";
import styles from "./checkout.module.css";
import CartContext from "../../store/cart-context";

function CheckOut() {
  const ctx = useContext(CartContext);
  const isActive = !!ctx.checkoutActive;
  const [formError , setFormError] = useState(null);

  const closeModalHandler = () => {
    if (ctx.closeCheckout) ctx.closeCheckout();
  };

  const OrderHandler = async (event) => {
    event.preventDefault();
    const orderPayload = {
      items: ctx.items || [],
      totalAmount: ctx.totalAmount || 0,
      customer: {
        name: event.target.customerName.value,
        phone: event.target.customerPhone.value,
        address: event.target.customerAdress.value,
      },
    };

    // Basic client-side validation (example)
    if (!orderPayload.customer.name || !orderPayload.customer.phone || !orderPayload.customer.address) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const result = await ctx.submitOrder(orderPayload);
      // optional: show success toast or use result
      console.log("Order success:", result);
    } catch (err) {
      console.error("Order failed:", err);
      // submitError from context will be set; you can show it
    }
  };

  return (
    <div className="checkout">
      <div
        className={`${styles["checkout-modal"]} ${
          isActive ? "block" : "hidden"
        }`}
      >
        <div className={styles["checkout-modal-content"]}>
          <div className={`${styles["checkout-modal-body"]} relative h-full`}>
            <div className="modal-header flex justify-between border-b mb-2 pb-3">
              <h3 className="font-bold text-lg">checkout</h3>
              <button
                onClick={closeModalHandler}
                className="bg-transparent border-0  text-xl"
              >
                X
              </button>
            </div>

    <div className="checkout-sec">
      <form onSubmit={OrderHandler} className="py-4">
                <div className="form-control mb-3">
                  <label
                    htmlFor="customerName"
                    className="block font-bold mb-2 px-1 text-sm"
                  >
                    Full Name
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    className="block w-full py-1 px-2 border rounded-full "
                  />
                </div>
                <div className="form-control mb-3">
                  <label
                    htmlFor="customerPhone"
                    className="block font-bold mb-2 px-1 text-sm"
                  >
                    Phone
                  </label>
                  <input
                    id="customerPhone"
                    type="text"
                    className="block w-full py-1 px-2 border rounded-full "
                  />
                </div>
                <div className="form-control">
                  <label
                    htmlFor="customerAdress"
                    className="block font-bold mb-2 px-1 text-sm"
                  >
                    Address
                  </label>
                  <textarea
                    id="customerAdress"
                    type="text"
                    className="block w-full py-1 px-2 border rounded-lg "
                  ></textarea>
                </div>
                {formError && (
                  <p className="text-red-600 font-bold mt-2">{formError}</p>
                )}
                {/* {(!ctx.isSubmitting && !ctx.submitError) && 
                <p className="text-green-600 font-bold mt-2">Order submitted successfully!</p> } */}
                <div className="py-3 border-t absolute w-full bottom-0 right-0">
                  <button
                    type="submit"
                    className="px-5 py-1 mt-3 bg-orange-600 text-orange-50 border-orange-600 rounded-full w-full disabled:bg-orange-400"
                  >
                    {ctx.isSubmitting
                      ? "Submitting, pleas wait ..."
                      : ctx.submitError
                      ? "Try Again"
                      : "Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
