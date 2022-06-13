import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '../Icons';
import '../../styled/item.css';
import fakeFetching from '../../utils/fakeFetching';
import Spinner from '../Spinner';

function Item({ checked, description, setTodos }) {
  const [isLoading, setLoading] = useState(false);

  const removeTodoItem = useCallback(() => {
    setLoading(true);
    fakeFetching().then(() => {
      setLoading(false);
      setTodos((prev) => prev.filter((item) => item.description !== description));
    });
  }, []);

  const toogleItem = (event) => {
    setTodos((prev) => prev.map((item) => {
      if (item.description === description) return ({ ...item, checked: event.target.checked });
      return item;
    }));
  };

  return (
    <div className="item-wrapper">
      <input id={`styled-checkbox-${description}`} type="checkbox" checked={checked} onChange={toogleItem} />
      <label htmlFor={`styled-checkbox-${description}`} />
      <div className={`item__description ${checked ? 'item__description--checked' : ''}`}>{description}</div>
      <div>
        <button type="button" onClick={removeTodoItem}>{isLoading ? <Spinner className="small" /> : <TrashIcon />}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Item;
