interface Product {
  id: number;
  product: string;
}

interface Props {
  product: Product;
}

function productTypeChip({ product }: Props) {
  if (!product) return null;
  return (
    <div className="product-type-card">
      <h1>{product.product}</h1>
    </div>
  );
}

export default productTypeChip;