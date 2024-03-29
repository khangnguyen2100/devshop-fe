import { AutoComplete, Button, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SHOP } from 'constants/common';
import { getProductsByCategory } from 'utils/shopUtils';
import useDebounce from 'hooks/useDebound';
import {
  setGlobalCategory,
  setGlobalSearch,
} from 'redux/actions/globalActions';
import { setSubCategory } from 'redux/actions/shopActions';
function SearchBarMobile({ fillData, placeholder }) {
  const { Option } = Select;
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const globalState = useSelector(state => state.globalReducer);
  const deboundValue = useDebounce(search, 300);
  useEffect(() => {
    dispatch(setGlobalSearch(deboundValue));
  }, [deboundValue]);
  const renderAutoFillItem = () => {
    let product = getProductsByCategory(fillData, globalState.category);
    return product.map(item => ({
      value: item.name,
    }));
  };
  const onSelectCateory = value => {
    dispatch(setGlobalCategory(value));
    dispatch(setSubCategory(''));
  };
  const openDropdownOption = value => {
    setShowDropdownOptions(true);
    setSearch(value);
  };
  const closeDropdownOption = () => {
    setShowDropdownOptions(false);
  };
  const onSelectOption = (value, option) => {
    setSearch(value);
    closeDropdownOption();
  };
  const onSearch = () => {
    if (!search || search === '') {
      router.push('/');
    } else {
      router.push({
        pathname: '/',
        query: { q: search },
      });
    }
  };
  return (
    <div className='menu-search'>
      <div className='menu-search__form'>
        <Select
          className='menu-search__form-select'
          defaultValue={globalState.category}
          style={{ width: 150 }}
          onChange={onSelectCateory}
          value={globalState.category}
        >
          {SHOP.category.map((item, index) => (
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        <div className='menu-search__form-input'>
          <AutoComplete
            allowClear
            backfill={true}
            open={showDropdownOptions}
            onSearch={openDropdownOption}
            onBlur={closeDropdownOption}
            onSelect={onSelectOption}
            options={renderAutoFillItem()}
            placeholder={placeholder}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
          <Button onClick={onSearch}>
            <i className='icon_search' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBarMobile);
