import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  product: string;
}

function searchBar() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/result?q=${encodeURI(query)}`);
  };

  useState(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  });

  return (
    <section className="searchContainer">
      <form onSubmit={handleSearch}>
        <button type="submit" className="icon1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_68_11508)">
              <path
                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                stroke="#EFFFBC"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_68_11508">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <input
          className="searchBar"
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="icon2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#EFFFBC" />
            <g clip-path="url(#clip0_68_11509)">
              <path
                d="M16.4744 5.67308H4.29489L9.16669 11.434V15.4167L11.6026 16.6346V11.434L16.4744 5.67308Z"
                stroke="#97A95C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_68_11509">
                <rect
                  width="14.6154"
                  height="14.6154"
                  fill="white"
                  transform="translate(3.07693 3.84616)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </section>
  );
}

export default searchBar;
