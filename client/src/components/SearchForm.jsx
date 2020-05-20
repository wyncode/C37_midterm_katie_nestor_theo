import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import BookList from './BookList';
import ContextDemo from './ContextDemo';

function SearchForm() {
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState([]);
  const [isFree, setIsFree] = useState(false);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isFree ? `/books/${search}/free` : `/books/${search}`;
    axios.get(url).then((response) => {
      setApiData(response.data.items);
    });
  };

  const toggleAllBooks = () => setIsFree(false);

  const toggleOnlyFreeBooks = () => setIsFree(true);

  useEffect(() => {
    console.log('begin use effect');
    if (apiData.length === 0) {
      return;
    }
    console.log('making request');
    const url = isFree ? `/books/${search}/free` : `/books/${search}`;
    axios.get(url).then((response) => setApiData(response.data.items));
  }, [isFree]);

  return (
    <div className="Home">
      <h1>How are you feeling today?</h1>
      <div>
        <div>
          <Form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
            <Form.Group>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Tell us all your secrets..."
                value={search}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <Button
            className="home-button"
            onClick={toggleAllBooks}
            style={
              isFree
                ? { backgroundColor: '#e3dad0', borderColor: '#e3dad0' }
                : { backgroundColor: '#344960', borderColor: '#344960' }
            }
          >
            All
          </Button>
          <Button
            className="home-button"
            onClick={toggleOnlyFreeBooks}
            style={
              isFree
                ? { backgroundColor: '#344960', borderColor: '#344960' }
                : { backgroundColor: '#e3dad0', borderColor: '#e3dad0' }
            }
          >
            Only Free
          </Button>
        </div>
      </div>
      <BookList books={apiData} />
      <ContextDemo data={apiData} />
    </div>
  );
}

export default SearchForm;
