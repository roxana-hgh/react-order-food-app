import Cart from "../../cart/cart";

function Header(prop) {
    return ( 
        <header className="p-3  md:py-4 border-b">
            <div className=" flex justify-between">
            <strong className="block font-bold text-neutral-800 text-2xl ">React <span className="text-orange-600">Food</span></strong>
            <div className="">
               <Cart></Cart>
            </div>
            </div>

        </header>
     );
}

export default Header;