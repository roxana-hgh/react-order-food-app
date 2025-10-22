import { Fragment , useRef, useState } from "react";

function CardForm(prop) {
    const amountValueRef = useRef()
    const [amountIsValid , setAmountIsValid] = useState(true)
    

    const SubmitHandler = (event) => {
        event.preventDefault()
        const amount = +amountValueRef.current.value
        if( amount < 1 && amount > 5 ) {
            setAmountIsValid(false)
            return
        }
        prop.onFormSubmit(amount)
    }
    return ( 
        <Fragment>
            <form action="" className="" onSubmit={SubmitHandler}>
                 <label className="text-sm px-1 mb-1 font-bold" htmlFor={`amount-${prop.id}`}>Amount</label>
                <div className="flex items-center gap-2">

                    <div className="w-1/4 block">
                       
                        <input ref={amountValueRef} id={`amount-${prop.id}`}  type="number" min='1' defaultValue='1'  className="border w-full rounded-full px-2 m-0  " />
                    </div>
                <button className="px-4 py-1 bg-orange-600 text-orange-50 border-orange-600 rounded-full w-3/4 block ">Add to card</button>
                </div>
                {!amountIsValid && <span>Pleas Enter a valid amount!</span> }
            </form>

        </Fragment>
     );
}

export default CardForm;