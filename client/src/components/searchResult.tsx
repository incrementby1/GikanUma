import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuBar from './menuBar.tsx';
import ProductCard from './productListChip';

interface Product {
  farmer: string;
  location: string;
  product: string;
  rating: number;
  number_of_ratings: number;
  image: string;
  farmgate_price: number;
  market_price: number;
}

interface Props {
  isSearchResult?: boolean;
}

function searchResult({ isSearchResult }: Props) {
  const [results, setResults] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    let query = '';
    if (isSearchResult) {
      const params = new URLSearchParams(location.search);
      query = params.get('q') || '';
    }

    const fetchData = async () => {
      const url = query
        ? `http://localhost:5000/search?q=${query}`
        : `http://localhost:5000/products`;
      const res = await fetch(url);
      const data: Product[] = await res.json();
      setResults(data);
    };

    fetchData();
  }, [isSearchResult, location.search]);

  console.log(results);

  return (
    <div className="product-listing">
      <MenuBar />

      <p className="t1">
        <b>Ang tinda karun</b>
      </p>
      <div className="product-list-container">
        {results.map((item, index) =>
          item ? <ProductCard key={index} product={item} /> : null
        )}
      </div>
    </div>
  );
}

export default searchResult;
