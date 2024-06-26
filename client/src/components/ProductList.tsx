import { useEffect, useState } from "react"
import { Product, useCart } from "../context/CartContext"

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>()
    const [productLoading, setProductLoading] = useState(true)
    const { addToCart } = useCart()

    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3000/shop/products")
            const data = await response.json()
            setProducts(data.data)
            setProductLoading(false)
        }
        fetchProducts()
    }, [])


    return (
        <div>
            {!productLoading && products?.map((product: Product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.default_price?.unit_amount / 100} kr</p>
                    <button onClick={() => addToCart(product)}>Lägg till i kundvagn</button>
                </div>
            ))}
        </div>
    )
}

export default ProductList