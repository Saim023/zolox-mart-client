import { useState, useMemo } from "react";
import toast from "react-hot-toast";

const CategoryFilters = ({
  brands,
  brandCounts = {},
  selectedBrands = [],
  featuredChecked,
  onBrandChange,
  onPriceChange,
  onStockChange,
  onFeaturedChange,
}) => {
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  // Handling brand
  const handleBrandToggle = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(updatedBrands);
  };

  // Handling price update
  const handlePriceUpdate = () => {
    const min = priceRange.min ? Number(priceRange.min) : null;
    const max = priceRange.max ? Number(priceRange.max) : null;

    if ((min !== null && min < 0) || (max !== null && max < 0)) {
      toast.error("Prices cannot be negative");
      return;
    }

    if (min !== null && max !== null && min > max) {
      toast.error("Minimum price cannot be greater than maximum price");
      return;
    }

    onPriceChange({ min, max });
    toast.success("Price range updated");
  };

  return (
    <div className="mb-5">
      <div className="mt-5 category-border">
        <h1 className="bg-[#f7f7f7] py-3 px-4 font-thin uppercase">Brand</h1>
        <div className="">
          <div className="px-4 py-2">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => onBrandChange([])}
                disabled={selectedBrands.length === 0}
                className={`text-xs px-2 py-1 border border-gray-300 hover:bg-gray-100 ${
                  selectedBrands.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Clear All
              </button>
              <button
                onClick={() => onBrandChange(brands)}
                disabled={selectedBrands.length === brands.length}
                className={`text-xs px-2 py-1 border border-gray-300 hover:bg-gray-100 ${
                  selectedBrands.length === brands.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Select All
              </button>
            </div>
          </div>
          <div className="w-full max-h-36 overflow-y-scroll">
            <div className="wrapper">
              {brands.map((brand) => (
                <div key={brand} className="mb-2 flex items-center">
                  <label
                    htmlFor={`brand-${brand}`}
                    className="custom-checkbox-label flex items-center w-full"
                  >
                    <input
                      id={`brand-${brand}`}
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                    />
                    <span className="checkbox-label-text ml-2 flex justify-between w-full">
                      <span>{brand}</span>
                      <span className="text-gray-500 text-xs">
                        ({brandCounts[brand] || 0})
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 category-border">
        <h1 className="bg-[#f7f7f7] py-3 px-4 font-thin uppercase">Price</h1>
        <div className="flex items-center gap-3 py-3 px-4">
          <input
            type="number"
            placeholder="Min."
            className="w-14 category-input"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            min="0"
          />
          <input
            type="number"
            placeholder="Max."
            className="w-14 category-input"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            min={priceRange.min || "0"}
          />
          <button
            className="px-4 py-1 bg-[#c081c8] hover:bg-[#9740a3] text-white"
            onClick={handlePriceUpdate}
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-5 category-border">
        <h1 className="bg-[#f7f7f7] py-3 px-4 font-thin uppercase">Other</h1>
        <div className="wrapper px-4 py-2">
          <div className="mb-2">
            <label className="custom-checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={featuredChecked}
                onChange={(e) => onFeaturedChange(e.target.checked)}
              />
              <span className="checkbox-label-text">Featured Items</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="custom-checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={(e) => onStockChange(e.target.checked)}
              />
              <span className="checkbox-label-text">In Stock</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
