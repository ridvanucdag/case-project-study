import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import "./FilterOption.css";

interface FilterOptionsProps {
  title: string;
  options: string[];
  type: string;
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
}

const FilterOption: React.FC<FilterOptionsProps> = ({
  title,
  options = [],
  type,
  selectedOptions = [],
  onToggleOption,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const rotation = useSpring({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    config: { tension: 200, friction: 10 },
  });

  const showSearchInput = options?.length > 10 || searchTerm?.length > 0;

  return (
    <div className="filter-options">
      <div className="filter-title" onClick={toggleOptions}>
        <div>{title}</div>
        <animated.div style={rotation}>
          <FaChevronDown />
        </animated.div>
      </div>
      {isOpen && (
        <div className="options-container">
          {showSearchInput && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FaSearch className="search-icon" />
            </div>
          )}

          {filteredOptions?.length > 0 ? (
            <div className="options-list">
              {filteredOptions?.map((option) => (
                <label key={option}>
                  <input
                    type={type}
                    checked={selectedOptions?.includes(option)}
                    onChange={() => onToggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <div>Seçenek yok</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterOption;
