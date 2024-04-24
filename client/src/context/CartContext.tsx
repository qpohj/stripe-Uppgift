import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface CartContextData {
    items: CartProducts[];
    getProductQuantity: (id: string) => number;
    addOneToCart: (product: ProductData) => void;
    deleteCartItem: (id: string) => void;
    removeOneFromCart: (product: ProductData) => void;
    getTotalCost: () => number;
}

interface CartProducts {
    product: ProductData;
    quantity: number;
}

interface ProductData {
    id: string;
    image: string;
    name: string;
    price: number;
}

export const CartContext = createContext<CartContextData>({
    items: [],
    getProductQuantity: () => 0,
    addOneToCart: () => { },
    deleteCartItem: () => { },
    removeOneFromCart: () => { },
    getTotalCost: () => 0
});

export function CartProvider({ children }: PropsWithChildren) {
    const [items, setItems] = useState<CartProducts[]>([]);

    useEffect(() => {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
            setItems(JSON.parse(localCart));
        } else {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    function getProductQuantity(id: string): number {
        return items.find(item => item.product.id === id)?.quantity || 0;
    }

    function addOneToCart(product: ProductData): void {
        const quantity = getProductQuantity(product.id);
        const updatedItems = quantity === 0 ? [...items, { product, quantity: 1 }] :
            items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        setItems(updatedItems);
    }

    function removeOneFromCart(product: ProductData): CartProducts[] {
        const quantity = getProductQuantity(product.id);
        let updatedItems: CartProducts[];
    
        if (quantity !== 1) {
            updatedItems = items.map(item => 
                item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            deleteCartItem(product.id);
            updatedItems = items.filter(item => item.product.id !== product.id);
        }
    
        return updatedItems;
    }

    function deleteCartItem(id: string): void {
        const updatedItems = items.filter(item => item.product.id !== id);
        setItems(updatedItems);
    }

    function getTotalCost(): number {
        return items.reduce((totalCost, { product, quantity }) =>
            totalCost + (product.price / 100) * quantity, 0);
    }

    const contextValue: CartContextData = {
        items,
        getProductQuantity,
        addOneToCart,
        deleteCartItem,
        removeOneFromCart,
        getTotalCost
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;