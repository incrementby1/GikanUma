import ProductChip from "./productListChip.tsx";
import products from "../../../backend/demogen.json"

function prodList() {
  return (
    <>
      <div className="product-listing">
          <p className="t1"><b>Ang tinda karun</b></p>
          <div className="product-list-container">
            {
              products.map((product, index) => (

                <ProductChip key={index} product={product}/>
              )
            )
            }
          </div>
      </div>
    </>
  );
}

export default prodList;
