import { useContext } from "react";
import styles from "./foodCard.module.css"
import CardForm from "./foodCardForm";
import CartContext from "../../../store/cart-context";

function FoodCard(props) {
    const cartContext = useContext(CartContext)
    const classes = '' + props.className;
    const addToCartHandler = (SubmittedData) => {
        const data = {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            amount : SubmittedData
        }
        
       cartContext.addItem(data)
    }


    return ( 
        <div className={classes}>
            <div className="border rounded ">
                <img src={props.image} alt="" className={`rounded-t ${styles['foodCard--img']}`} />
                <div className="p-3">
                    <div className="flex items-center justify-between my-3">
                        <h5 className="font-bold text-lg">{props.name}</h5>
                        <span className="font-bold text-base bg-orange-100 rounded-full px-3 text-orange-900">${props.price}</span>
                    </div>
                    <CardForm onFormSubmit={addToCartHandler} id={props.id}></CardForm>
                </div>

            </div>
            
        </div>
     );
}

export default FoodCard;