import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Masonry from './components/masonry';
import Page, { Content } from './components/page';
import Container from 'zero-component-library/Container';
import SearchBar from 'zero-component-library/SearchBar';
import VerticalContainer from 'zero-component-library/VerticalContainer';
import Text from 'zero-component-library/Text';

import AsyncSearchStream from './utils/async-search';
import get from 'lodash/get';

const fetchPhotos = () => {
  return fetch('http://localhost:3000/photos').then(response => response.json());
}

const searchPhotos = ({query}) => {
  return fetch(`http://localhost:3000/photos/search?query=${query}`).then(response => response.json());
}

let searchStream;

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');

  const handleChange = async ({event}) => {
    const query = event.target.value;

    searchStream.next(query);

    setQuery(query);
  }

  useEffect(() => {
    fetchPhotos().then((data) => {
      setPhotos(data);
      setIsLoading(false);
    });

    searchStream = new AsyncSearchStream(query => {
      return searchPhotos({query});
    });

    searchStream.subscribe(({data, suggestion}) => {
      const photos = get(data, 'results') || [];
      setPhotos(photos);
      setSuggestion(suggestion);
    });

    return searchStream.unsubscribe
  }, [])

  return (
    <Page>
      <Header>
        <SearchBar value={query} onChange={handleChange} />
      </Header>
      <Content>
        <Container style={{padding: '8px'}}>
          {
            suggestion && <Text align='center' size={14}>Showing results for <span style={{color: '#21C4CC'}}>{suggestion}</span></Text>
          }
          {
            photos.length 
              ? <Masonry photos={photos} />
              : <VerticalContainer height={'calc(100vh - 76px)'}>
                  {
                    !isLoading &&
                      <Text>
                        No Results.
                      </Text>
                  }
                </VerticalContainer>
          }
        </Container>
      </Content>
    </Page>
  );
}

export default App;
