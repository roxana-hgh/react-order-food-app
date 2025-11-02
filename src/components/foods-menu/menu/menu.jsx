import FoodCard from "../food-card/foodCard";
import { useState, useEffect, Fragment } from "react";
import useHttp from "../../../hooks/http-request-hook";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  const { isLoading, error, sendRequest: fetchFoods } = useHttp();

  useEffect(() => {
    const transformMenu = (FoodObj) => {
      const loadedFoods = [];

      for (const foodKey in FoodObj) {
        loadedFoods.push({
          id: foodKey,
          name: FoodObj[foodKey].name,
          price: FoodObj[foodKey].price,
          image: FoodObj[foodKey].image,
        });
      }

      setMenuItems(loadedFoods);
    };

    fetchFoods({ url: "/foods.json" }, transformMenu);
  }, [fetchFoods]);

  return (
    <Fragment>
      {!isLoading && !error && (
        <div className="grid grid-cols-4 gap-3">
          {menuItems.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            ></FoodCard>
          ))}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>There was an Error loading Data</p>}
    </Fragment>
  );
}

export default Menu;
