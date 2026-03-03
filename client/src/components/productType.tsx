// import ProductTypeChip from "./productTypeChip.tsx";
import { use, useState } from "react";
import products from "../../../backend/product.json";

interface Product {
  id: number;
  product: string;
  image: string;
}

function productType() {
  const [inCebuano, setInCebuano] = useState<boolean>(false);
  // SQLITE THIS SETTING and just get from that endpoint
  return (
    <>
      <div className="product-list">
        <p className="t1">Pagkaun ug ang mga Mapalit</p>
        {/* map. */}
        {products.map((product: Product) => (
          <div key={product.id}>
            <p className="t2">{product.product}</p>
          </div>
        ))}
        {/* <ProductTypeChip /> */}
      </div>
    </>
  );
}

export default productType;
