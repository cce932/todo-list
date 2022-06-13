import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import '../../styled/toDoList.css';
import fakeFetching from '../../utils/fakeFetching';
import { PlusIcon } from '../Icons';
import Spinner from '../Spinner';
import Item from './Item';

const LOCAL_STORAGE_KEY = '17live-pretest-todo-list';

function ToDoList() {
  const description = useRef();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (isInitialized) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const validate = useCallback(
    (currentDescription) => {
      if (!currentDescription.length) {
        return ({ result: false, errorMessage: t('emptyError') });
      }
      const isDescriptionDuplicate = todos.some((item) => item.description === currentDescription);
      if (isDescriptionDuplicate) {
        return ({ result: false, errorMessage: t('duplicateError') });
      }

      return ({ result: true, errorMessage: '' });
    },
    [todos],
  );

  const addTodoItem = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const currentDescription = description.current?.value;
    const validator = validate(currentDescription);

    if (validator.result) {
      await fakeFetching().then(() => {
        setTodos((prev) => [...prev, { checked: false, description: currentDescription }]);
      }).catch(() => {
        setError(t('commonError'));
      });
    } else {
      setError(validator.errorMessage);
    }
    setLoading(false);
  }, [todos]);

  return (
    <div className="todo-list-wrapper">
      <h3>{t('appTitle')}</h3>
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {todos.map((item) => <Item key={item.description} setTodos={setTodos} {...item} />)}
      </div>
      <div>
        <form onSubmit={addTodoItem}>
          <input type="text" ref={description} placeholder={t('todoInputPlaceholder')} />
          <button type="submit">{isLoading ? <Spinner className="small" /> : <PlusIcon className="small" /> }</button>
        </form>
        {Boolean(error.length) && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}

export default ToDoList;
