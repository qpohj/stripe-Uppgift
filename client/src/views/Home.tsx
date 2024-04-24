import { useState, useEffect } from "react";

interface productData {
    id: string;
    image: string;
    name: string;
    price: number;
}


interface stripeProductData {
    images: string,
    name: string,
    default_price: { id: string, unit_amount: number }
}


const Home = () => {
    const [products, setProducts] = useState<productData[]>([]);


    const getAllProducts = async () => {
        const fetchData = await fetch(
            "http://localhost:3000/api/stripe/get-all-products",
            {
                method: "GET",
            }
        );
        const items = await fetchData.json();
        return items;
    }

    useEffect(() => {
        const fetchData = async () => {

            const items = await getAllProducts();
            console.log(items)

            setProducts(
                items.map((productData: stripeProductData) => ({
                    id: productData.default_price.id,
                    name: productData.name,
                    image: productData.images[0],
                    price: productData.default_price.unit_amount,
                }))
            );
        };
        fetchData();
    }, []);

    
    return (
        <div>
            {products.map((product, index) => (
                <div key={index}>
                    {/* Render each product item here */}
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    )
}

export default Home