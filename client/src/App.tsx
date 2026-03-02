import "./App.css";
import Header from "./components/header.tsx";
import SearchBar from "./components/searchBar.tsx";
import ProductType from "./components/productType.tsx";
import ProductList from "./components/productList.tsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* HEADER */}
      <div className="bg-oblong"></div>
      <Header />
      {/* SEARCHBAR */}
      <SearchBar />
      {/* PRODUCT GENRE */}
      <ProductType />
      {/* PRODUCT LISTING */}
      <ProductList />
    </>
  );
}

export default App;
