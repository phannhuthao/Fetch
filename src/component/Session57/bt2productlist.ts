// src/components/ProductListOne.tsx
import React, { useEffect, useState } from 'react';
import getAllProduct from '../Session57/bt2';

function ProductListOne() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProduct();
            setProducts(data);
        };

        fetchProducts();
    }, []);
}

export default ProductListOne;
