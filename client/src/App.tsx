import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.tsx";
import SearchBar from "./components/searchBar.tsx";
import ProductType from "./components/productType.tsx";
import ProductList from "./components/productList.tsx";
import SearchResult from "./components/searchResult.tsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
        {/* HEADER */}
        <Header />
        <Routes>
          <Route path="/" element={
            <>
                <div className="bg-oblong"></div>
                <SearchBar />
                <ProductType />
                <ProductList />
              </>
          }>
          </Route>

          <Route path="/result" element={
            <>
                <SearchBar />
                <SearchResult isSearchResult />
            </>
          }>
          </Route>
          </Routes>
    </Router>
  );
}

export default App;
