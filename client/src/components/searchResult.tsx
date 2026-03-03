import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./productTypeChip"

interface Product {
  id: number;
  product: string;
}

interface Props {
  isSearchResult?: boolean;
}

function searchResult({ isSearchResult } : Props) {
  const [results, setResults] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    let query = "";
    if (isSearchResult) {
      const params = new URLSearchParams(location.search);;
      query = params.get("q") || "";
    } 

    const fetchData = async () => {
      const url = query ? `http://localhost:5000/search?q=${query}` : `http://localhost:5000/products`
      const res = await fetch(url);
      const data: Product[] = await res.json()
      setResults(data);
    };

    fetchData();
  }, [isSearchResult, location.search])

  console.log(results);

  return (
  <div className="results">
    {results.map((item) =>
        item ? <ProductCard key={item.id} product={item} /> : null
    )}
  </div>
    );
}

export default searchResult;
