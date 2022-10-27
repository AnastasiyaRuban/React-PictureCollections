import React from 'react';
import './index.scss';
import { Collection } from './Collection';
import { useState } from 'react';
import { useEffect } from 'react';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    fetch(
      `https://6356965d9243cf412f888d18.mockapi.io/collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
        alert('Something is wrong');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(isLoading);

  return (
    <div className='App'>
      <h1>Моя коллекция фотографий</h1>
      <div className='top'>
        <ul className='tags'>
          {cats.map((item, index) => (
            <li
              className={categoryId === index ? 'active' : ''}
              key={index}
              onClick={() => setCategoryId(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          onChange={onChangeSearchValue}
          value={searchValue}
          className='search-input'
          placeholder='Поиск по названию'
        />
      </div>
      <div className='content'>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Collection
                // isLoading={isLoading}
                key={index}
                name={item.name}
                images={item.photos}
              />
            ))
        )}
      </div>
      <ul className='pagination'>
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className={index === page - 1 ? 'active' : ''}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
