import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedBrands, setSelectedModels, setSelectedSort } from '../../redux/slices/productSlice';
import { Product } from '../../Type/type';
import FilterOption from '../FilterOption/FilterOption';
import './Filter.css';

interface FilterProps {
  products: Product[];
}

const Filter: React.FC<FilterProps> = ({ products }) => {
  const dispatch = useDispatch();
  
  const [selectedBrands, setSelectedBrandsState] = useState<string[]>([]);
  const [selectedModels, setSelectedModelsState] = useState<string[]>([]);
  const [selectedSort, setSelectedSortState] = useState<string>(""); 

  const brands = Array.from(new Set(products?.map(item => item?.brand)));
  const models = Array.from(new Set(products?.map(item => item?.model)));

  useEffect(() => {
    dispatch(setSelectedBrands(selectedBrands));
    dispatch(setSelectedModels(selectedModels));
    dispatch(setSelectedSort(selectedSort)); 
  }, [selectedBrands, selectedModels, selectedSort, dispatch]);

  const toggleSelection = (type: 'brand' | 'model' | 'sort', value: string) => {
    if (type === 'brand') {
      setSelectedBrandsState(prev => 
        prev?.includes(value) ? prev.filter(b => b !== value) : [...prev, value]
      );
    } else if (type === 'model') {
      setSelectedModelsState(prev => 
        prev?.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
      );
    } else if (type === 'sort') {
      setSelectedSortState(prev => (prev === value ? "" : value));
    }
  };

  const sortOptions = ['Old to new', 'New to old', 'Price high to low', 'Price low to high'];

  return (
    <div className="filter-panel">
      <FilterOption
        title="Sort By"
        type='radio'
        options={sortOptions}
        selectedOptions={selectedSort ? [selectedSort] : []} 
        onToggleOption={(option) => toggleSelection('sort', option)}
      />
      <FilterOption
        title="Brands"
        type='checkbox'
        options={brands}
        selectedOptions={selectedBrands}
        onToggleOption={(brand) => toggleSelection('brand', brand)}
      />
      <FilterOption
        title="Model"
        type='checkbox'
        options={models}
        selectedOptions={selectedModels}
        onToggleOption={(model) => toggleSelection('model', model)}
      />
    </div>
  );
};

export default Filter;
