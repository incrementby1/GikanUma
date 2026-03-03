import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  product: string;
}

function searchBar() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    navigate(`/result?q=${encodeURI(query)}`);
  };

  useState(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  });

  //   try {
  //     const res = await fetch(`http://localhost:5000/search?q=${query}`);
  //     if (!res.ok) throw new Error("Network response was not ok");
      
  //     const data: Product[] = await res.json();
  //     setResults(data);
  //   }  catch (err) {
  //     console.error("Caught error: ", err)
  //     setResults([]);
  //   }
  // }

  return (
      <section className="searchContainer">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search here..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </section>
  );
}

export default searchBar;
