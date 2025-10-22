import FoodCard from "../food-card/foodCard";

function Menu() {
    const menuItems = [
        {
            id: "1",
            name: "Pizza",
            price: "17",
            image: "./images/Pizza.jpg"
        },
        {
            id: "2",
            name: "Burger",
            price: "12",
            image: "./images/Burger.jpg"
        },
        {
            id: "3",
            name: "Pasta",
            price: "14",
            image: "./images/Pasta.jpg"
        },
        {
            id: "4",
            name: "Fried Chicken",
            price: "15",
            image: "./images/kfc.jpg"
        }
    ]
    return ( 
        <div className="grid grid-cols-4 gap-3">
            {menuItems.map((item) => (
                <FoodCard key={item.id} id={item.id} name={item.name} price={item.price} image={item.image}></FoodCard>
            ))}

        </div>
     );
}

export default Menu;