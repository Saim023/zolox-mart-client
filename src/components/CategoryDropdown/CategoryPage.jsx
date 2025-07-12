import {
  useParams,
  useLocation,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import "../../../src/Global.css";
import CategoryFilters from "./CategoryFilters";
import { useContext, useEffect, useMemo, useState } from "react";
import ProductCard from "../Card/ProductCard";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import MobileFilters from "./MobileFilters";

const toTitleCase = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const CategoryPage = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { category, item } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const baseRoute = location.pathname.split("/")[1];
  const [filters, setFilters] = useState({
    brands: [],
    minPrice: null,
    maxPrice: null,
    inStock: false,
    featuredOnly: false,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || "",
    max: filters.maxPrice || "",
  });

  useEffect(() => {
    fetch(`https://zolox-mart-server.onrender.com/${baseRoute}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseRoute, category, item]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Add to cart
  const handleAddToCart = (product) => {
    if (!user?.email) {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        width: "350px",
        background: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        customClass: {
          popup: "my-swal-shadow",
          title: "my-swal-title",
          htmlContainer: "text-msg",
          confirmButton: "my-swal-confirm",
          cancelButton: "my-swal-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed)
          navigate("/login", { state: { from: location } });
      });
    } else {
      console.log("Adding to cart:", product);
    }
  };

  // Filtering and sorting products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (product.category[0].toLowerCase() !== baseRoute.toLowerCase()) {
        return false;
      }

      if (category) {
        const categoryMatch =
          product.category[1].toLowerCase().replace(/\s+/g, "-") === category;

        if (item) {
          if (
            !categoryMatch ||
            product.category[2].toLowerCase().replace(/\s+/g, "-") !== item
          ) {
            return false;
          }
        } else if (!categoryMatch) {
          return false;
        }
      }

      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.inStock && !product.inStock) {
        return false;
      }

      if (filters.featuredOnly && !product.featuredItem) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...result].sort((a, b) => b.name.localeCompare(a.name));
      case "featured":
      default:
        // Featured items first, then by name A-Z
        return [...result].sort((a, b) => {
          if (a.featuredItem && !b.featuredItem) return -1;
          if (!a.featuredItem && b.featuredItem) return 1;
          return a.name.localeCompare(b.name);
        });
    }
  }, [products, baseRoute, category, item, filters, sortOption]);

  // All brands
  const allBrands = useMemo(
    () => [...new Set(products.map((product) => product.brand))].sort(),
    [products]
  );

  // Brands count
  const brandCounts = useMemo(() => {
    const counts = {};
    allBrands.forEach((brand) => {
      counts[brand] = products.filter((p) => {
        if (p.category[0].toLowerCase() !== baseRoute.toLowerCase())
          return false;
        if (category) {
          const categoryMatch =
            p.category[1].toLowerCase().replace(/\s+/g, "-") === category;
          if (item) {
            if (
              !categoryMatch ||
              p.category[2].toLowerCase().replace(/\s+/g, "-") !== item
            )
              return false;
          } else if (!categoryMatch) return false;
        }

        if (filters.minPrice !== null && p.price < filters.minPrice)
          return false;
        if (filters.maxPrice !== null && p.price > filters.maxPrice)
          return false;
        if (filters.inStock && !p.inStock) return false;
        if (filters.featuredOnly && !p.featuredItem) return false;

        return p.brand === brand;
      }).length;
    });
    return counts;
  }, [products, allBrands, baseRoute, category, item, filters]);

  if (!category) {
    return (
      <div>
        <div className="bg-[#f7f7f7] py-4 text-center font-thin">
          <h1 className="mb-3 text-2xl uppercase font-thin">
            {toTitleCase(baseRoute)}
          </h1>
          <NavLink className="hover:text-[#9749a3]" to="/">
            Home
          </NavLink>{" "}
          /{" "}
          <NavLink className="hover:text-[#9749a3]">
            {toTitleCase(baseRoute)}
          </NavLink>
        </div>
        {/* Sorting Controls */}
        <div className="w-4/5 mx-auto mt-2 font-thin">
          <div className="flex justify-end items-center px-2 sm:px-0">
            {/* <p className="text-sm text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p> */}
            <select
              className="text-sm p-1"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
            >
              <option className="font-thin" value="featured">
                Featured
              </option>
              <option className="font-thin" value="price-low">
                Price: Low to High
              </option>
              <option className="font-thin" value="price-high">
                Price: High to Low
              </option>
              <option className="font-thin" value="name-asc">
                Name: A-Z
              </option>
              <option className="font-thin" value="name-desc">
                Name: Z-A
              </option>
            </select>
          </div>
        </div>

        <div className="w-4/5 mx-auto mt-2 font-thin">
          <div className="flex flex-col md:flex-row">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block min-h-screen w-64">
              <div className="category-border">
                <h1 className="bg-[#f7f7f7] px-4 py-3 uppercase">
                  {toTitleCase(baseRoute)}
                </h1>
                <div className="px-4 py-2">
                  {data.map((cat) => {
                    const categorySlug = cat.category
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return (
                      <div
                        className="py-1 text-[#515151] font-thin"
                        key={cat.category}
                      >
                        <Link
                          to={`/${baseRoute}/${categorySlug}`}
                          className="hover:text-[#9740a3]"
                        >
                          {cat.category}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <CategoryFilters
                brands={allBrands}
                brandCounts={brandCounts}
                selectedBrands={filters.brands}
                products={filteredProducts}
                onBrandChange={(selectedBrands) =>
                  handleFilterChange("brands", selectedBrands)
                }
                onPriceChange={(range) => {
                  handleFilterChange("minPrice", range.min);
                  handleFilterChange("maxPrice", range.max);
                }}
                onStockChange={(checked) =>
                  handleFilterChange("inStock", checked)
                }
                onFeaturedChange={(checked) =>
                  handleFilterChange("featuredOnly", checked)
                }
              />
              <button
                onClick={() =>
                  setFilters({
                    brands: [],
                    minPrice: null,
                    maxPrice: null,
                    inStock: false,
                    featuredOnly: false,
                  })
                }
                className="px-4 py-1 mb-5 bg-[#c081c8] hover:bg-[#9740a3] text-white"
              >
                Reset Filters
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:pl-4">
              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 sm:px-0">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      item={product}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <p className="px-2">No products found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryData = data.find(
    (cat) => cat.category.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (!categoryData) return <h2 className="p-6">Category not found.</h2>;

  const selectedItem = item
    ? categoryData.items.find(
        (i) => i.toLowerCase().replace(/\s+/g, "-") === item
      )
    : null;

  if (item && !selectedItem) {
    return <h2 className="p-6">Item not found in this category.</h2>;
  }

  return (
    <div>
      <section>
        <div className="bg-[#f7f7f7] py-4 text-center">
          <h1 className="text-2xl mb-3 uppercase font-thin">
            {item ? toTitleCase(item) : toTitleCase(category)}
          </h1>
          <div className="font-thin">
            <NavLink to="/" className="hover:text-[#9749a3] font-thin">
              Home
            </NavLink>{" "}
            /{" "}
            <NavLink
              to={`/${baseRoute}`}
              className="hover:text-[#9749a3] font-thin"
            >
              {toTitleCase(baseRoute)}
            </NavLink>
            {category && (
              <>
                /{" "}
                <NavLink
                  to={`/${baseRoute}/${category}`}
                  className="hover:text-[#9749a3] font-thin"
                >
                  {toTitleCase(category)}
                </NavLink>
              </>
            )}
            {item && (
              <>
                /{" "}
                <NavLink
                  to={`/${baseRoute}/${category}/${item}`}
                  className="hover:text-[#9749a3] font-thin"
                >
                  {toTitleCase(item)}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Sorting Controls */}
      <div className="w-4/5 mx-auto mt-2 font-thin">
        <div className="flex justify-end items-center px-2 sm:px-0">
          {/* <p className="text-sm text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p> */}
          <select
            className="text-sm p-1"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
          >
            <option className="font-thin" value="featured">
              Featured
            </option>
            <option className="font-thin" value="price-low">
              Price: Low to High
            </option>
            <option className="font-thin" value="price-high">
              Price: High to Low
            </option>
            <option className="font-thin" value="name-asc">
              Name: A-Z
            </option>
            <option className="font-thin" value="name-desc">
              Name: Z-A
            </option>
          </select>
        </div>
      </div>

      <section>
        <div className="w-4/5 mx-auto mt-2">
          <div className="flex flex-col md:flex-row">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block min-h-screen w-64 font-thin">
              <div className="category-border">
                <h1 className="bg-[#f7f7f7] py-3 px-4 font-thin uppercase">
                  {categoryData.category}
                </h1>
                <div>
                  <div className="px-4 py-3">
                    {categoryData.items.map((i) => {
                      const itemSlug = i.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <div className="py-1 text-[#515151] font-thin" key={i}>
                          <Link
                            to={`/${baseRoute}/${category}/${itemSlug}`}
                            className="hover:text-[#9740a3]"
                          >
                            {i}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <CategoryFilters
                brands={allBrands}
                brandCounts={brandCounts}
                selectedBrands={filters.brands}
                onBrandChange={(selectedBrands) =>
                  handleFilterChange("brands", selectedBrands)
                }
                products={filteredProducts}
                onPriceChange={(range) => {
                  handleFilterChange("minPrice", range.min);
                  handleFilterChange("maxPrice", range.max);
                }}
                onStockChange={(checked) =>
                  handleFilterChange("inStock", checked)
                }
                onFeaturedChange={(checked) =>
                  handleFilterChange("featuredOnly", checked)
                }
              />
              <button
                onClick={() =>
                  setFilters({
                    brands: [],
                    minPrice: null,
                    maxPrice: null,
                    inStock: false,
                    featuredOnly: false,
                  })
                }
                className="px-4 py-1 mb-5 bg-[#c081c8] hover:bg-[#9740a3] text-white"
              >
                Reset Filters
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:pl-4">
              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 sm:px-0">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      item={product}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <p className="px-2">
                  No products found matching your criteria.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters */}
      <MobileFilters
        brands={allBrands}
        brandCounts={brandCounts}
        selectedBrands={filters.brands}
        onBrandChange={(selectedBrands) =>
          handleFilterChange("brands", selectedBrands)
        }
        onPriceChange={(range) => {
          handleFilterChange("minPrice", range.min);
          handleFilterChange("maxPrice", range.max);
        }}
        onStockChange={(checked) => handleFilterChange("inStock", checked)}
        onFeaturedChange={(checked) =>
          handleFilterChange("featuredOnly", checked)
        }
        onResetFilters={() => {
          setFilters({
            brands: [],
            minPrice: null,
            maxPrice: null,
            inStock: false,
            featuredOnly: false,
          });
          setPriceRange({ min: "", max: "" });
        }}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        featuredChecked={filters.featuredOnly}
      />
    </div>
  );
};

export default CategoryPage;
