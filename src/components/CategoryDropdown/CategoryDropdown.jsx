import { NavLink } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";

// Tops Data
export const topsData = [
  {
    category: "Formal",
    items: ["Metallic Halter", "Scoop Neck", "Sheer Tops"],
  },
  {
    category: "Batwing",
    items: ["Dolan Batwing", "Magyar Batwing", "Echo Cropped"],
  },
  {
    category: "Off Shoulders",
    items: ["Guipure Midi", "Asymmetric", "Flecked Linen"],
  },
  {
    category: "Sleeveless",
    items: ["Peasant Sleeve", "Puff Sleeves", "Short Sleeve"],
  },
];

// Denims Data
export const denimsData = [
  {
    category: "Capri Jeans",
    items: ["Printed Denim", "Washed Denim"],
  },
  {
    category: "Mid Rise Jeans",
    items: ["Embroidered", "Patched Denim"],
  },
  {
    category: "High Rise Jeans",
    items: ["Colored Denim", "Painted Denim"],
  },
  {
    category: "Flare Jeans",
    items: ["Crochet Work", "Shiny Denim"],
  },
];

const CategoryDropdown = ({
  label,
  basePath,
  data,
  leftOffset = "left-52",
}) => {
  return (
    <li className="group relative flex items-center gap-1">
      <NavLink to={`/${basePath}`} className="group-hover:text-[#9740a3]">
        {label}
      </NavLink>
      <GoChevronDown className="group-hover:text-[#9740a3]" />
      <div
        className={`absolute hidden group-hover:block bg-white z-[100] w-[430px] top-full ${leftOffset} -translate-x-1/2 shadow-lg pl-6 py-4 text-xs tracking-wider`}
      >
        <ul className="grid md:grid-cols-3 gap-3">
          {data.map((section) => (
            <li key={section.category}>
              <NavLink
                to={`/${basePath}/${section.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="font-medium my-4 block hover:text-[#9740a3]"
              >
                {section.category}
              </NavLink>
              <ul>
                {section.items.map((subItem) => (
                  <li key={subItem}>
                    <NavLink
                      to={`/${basePath}/${section.category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${subItem
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="my-3 block hover:text-[#9740a3]"
                    >
                      {subItem}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default CategoryDropdown;
