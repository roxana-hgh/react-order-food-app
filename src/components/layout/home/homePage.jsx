import React from "react";
import Menu from "../../foods-menu/menu/menu";

function HomePage() {
    return ( 
    <div className="p-3 lg:py-8">
        {/* <h1 className="font-bold text-xl mb-3">Menu</h1> */}
        <Menu></Menu>

    </div>
    );
}

export default HomePage;