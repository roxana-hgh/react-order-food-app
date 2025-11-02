import { useContext, useState } from "react";
import styles from "./cart.module.css"
import CartContext from "../../store/cart-context";

function Cart(prop) {
    const ctx = useContext(CartContext)
    const [isActive , setActive] = useState(false)
    const totalAmount = ctx.totalAmount.toFixed(2)
    const openCartHandler = () => {
        setActive(true)
    }
    const closeCartHandler = () => {
        setActive(false)
    }

    const OrderHandler = () => {
        // close the cart UI
        setActive(false)
        // open checkout via context and pass checkout data
        if (ctx.openCheckout) {
            ctx.openCheckout({ items: ctx.items, totalAmount: totalAmount })
        }
    }

    const removeItemHandler = (event) => {
        const itemId = event.target.dataset.id
       ctx.removeItem(itemId)
        
    }

    return ( 
        <div className="cart">
            <div className={styles.cartButton}>
                <div className={`${styles.cartButtonBadge} bg-orange-100 text-orange-900`}>{ctx.items.length}</div>
             <button onClick={openCartHandler} className={`px-5 py-1 bg-orange-600 text-orange-50 border-orange-600 rounded-full `}>Cart</button>
            </div>
             <div className={`${styles['cart-offcanvas']} ${isActive ? 'block' : 'hidden'}`}>
                <div className={styles['cart-offcanvas-content']}>
                    
                    <div className={`${styles['cart-offcanvas-body']} relative h-full`}>
                        <div className="offcanvas-header flex justify-between">
                        <h3 className="font-bold text-lg">Cart</h3>
                        <button onClick={closeCartHandler} className="bg-transparent border-0  text-xl">X</button>
                        
                    </div>
                        <ul className="m-0 px-0 py-3">
                            {ctx.items.map(item => (
                                <li key={item.id} className="border-b p-2">
                                <div className="flex gap-2 justify-between">
                                    <img src={item.image} alt="" className="block rounded max-w-full w-1/4" />
                                    <div className=" p-2 grow">
                                        <h5 className="font-bold">{item.name}</h5>
                                         <span className=" text-sm  rounded-full text-neutral-800">${item.price} x {item.amount}</span>
                                    </div>
                                    <div className="">
                                        <button data-id={item.id} className="bg-transparent border-0  text-xs" onClick={removeItemHandler}>remove</button>
                                        <span className="font-bold block text-lg mt-1 rounded-full text-orange-900">${item.price * item.amount} </span>
                                    </div>
                                </div>
                            </li>
                            ))}
                            
                        </ul>
                        {!ctx.items.length && <p className=" text-neutral-700 py-3 text-center">Your Cart is Empty!</p>}
                        <div className="py-3 border-t absolute w-full bottom-0 right-0">
                            <div className="flex text-xl justify-between items-center font-bold">
                                <span className="font-bold">Total:</span>
                                <span>${totalAmount}</span>
                            </div>
                            <button disabled={!ctx.items.length} onClick={OrderHandler}  className="px-5 py-1 mt-3 bg-orange-600 text-orange-50 border-orange-600 rounded-full w-full disabled:bg-orange-400">Order</button>
                        </div>
                    </div>

                </div>

             </div>
        </div>
     );
}

export default Cart;