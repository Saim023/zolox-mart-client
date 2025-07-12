import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const MobileFilters = ({
  brands,
  brandCounts,
  selectedBrands,
  onBrandChange,
  onPriceChange,
  onStockChange,
  onFeaturedChange,
  onResetFilters,
  priceRange,
  setPriceRange,
  featuredChecked,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#9740a3] text-white p-3 rounded-full shadow-lg"
      >
        <FiFilter size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-[#f7f7f7] opacity-95 p-4 max-h-[80vh] overflow-y-auto shadow-md font-thin">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <FiX size={24} />
              </button>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        const updatedBrands = selectedBrands.includes(brand)
                          ? selectedBrands.filter((b) => b !== brand)
                          : [...selectedBrands, brand];
                        onBrandChange(updatedBrands);
                      }}
                      className="custom-checkbox mr-2"
                    />
                    <span>
                      {brand} ({brandCounts[brand] || 0})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min || ""}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="border p-2 w-1/2"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max || ""}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="border p-2 w-1/2"
                />
              </div>
              <button
                onClick={handlePriceUpdate}
                className="mt-2 bg-[#c081c8] hover:bg-[#9740a3] text-white transition-colors duration-200 uppercase px-4 py-1"
              >
                Apply
              </button>
            </div>

            {/* Other Filters */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Other</h3>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={featuredChecked}
                  onChange={(e) => onFeaturedChange(e.target.checked)}
                  className="custom-checkbox mr-2"
                />
                <span>Featured Items</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => onStockChange(e.target.checked)}
                  className="custom-checkbox mr-2"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onResetFilters}
                className="flex-1 bg-white hover:bg-[#f7f7f7] border border-gray-300 transition-colors duration-200 py-2 uppercase"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-[#c081c8] hover:bg-[#9740a3] text-white transition-colors duration-200 uppercase py-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilters;
