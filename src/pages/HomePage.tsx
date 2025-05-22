import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const selectedCategories = searchParams.getAll("category");
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let allProducts: Product[] = [];

        if (selectedCategories.length > 0) {
          const categoryRequests = selectedCategories.map((cat) =>
            axios.get(`https://fakestoreapi.com/products/category/${cat}`)
          );
          const responses = await Promise.all(categoryRequests);
          allProducts = responses.flatMap((res) => res.data);
        } else {
          const res = await axios.get("https://fakestoreapi.com/products");
          allProducts = res.data;
        }

        const uniqueProducts = Array.from(
          new Map(allProducts.map((item) => [item.id, item])).values()
        );

        if (sort === "asc") {
          uniqueProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
          uniqueProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    const current = new Set(selectedCategories);
    current.has(category) ? current.delete(category) : current.add(category);

    const params = new URLSearchParams(searchParams);
    params.delete("category");
    current.forEach((cat) => params.append("category", cat));
    setSearchParams(params);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  return (
    <main aria-label="Product listing page">
      <section className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar Filters */}
        <aside aria-label="Filter by category" className="space-y-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          {categories.map((cat) => (
            <div key={cat}>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  aria-label={`Filter by ${cat}`}
                />
                <span>{cat}</span>
              </label>
            </div>
          ))}
          <div className="mt-4">
            <label htmlFor="sort" className="block text-sm font-medium mb-1">
              Sort by price
            </label>
            <select
              id="sort"
              value={sort}
              onChange={handleSortChange}
              className="border rounded px-2 py-1 w-full"
              aria-label="Sort products"
            >
              <option value="">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <section aria-label="Product grid">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition"
                  aria-label={`Product: ${product.title}`}
                >
                  <Link
                    to={`/product/${product.id}`}
                    aria-label={`View details for ${product.title}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-contain mb-2"
                    />
                    <h3 className="text-sm font-medium mb-1">
                      {product.title}
                    </h3>
                    <p className="font-semibold text-gray-700">
                      ${product.price}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default HomePage;
