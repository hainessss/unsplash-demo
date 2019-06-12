import React from 'react';
import Row from 'zero-component-library/Row';
import Col from 'zero-component-library/Col';
import Image from 'zero-component-library/Image';
import get from 'lodash/get';

export default ({photos}) => {
  const numCols = 4;
  const photosPerCol = photos.length / numCols;
  const photoGrid = [];

  for (let i = 0; i < numCols; i++) {
    const startIndex = i * photosPerCol;
    const endIndex = startIndex + photosPerCol;
    photoGrid.push(photos.slice(startIndex, endIndex))
  }

  return (
    <Row alignItems='flex-start'>
      {
        photoGrid.map((photoCol, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            {
              photoCol.map(photo => (
                <div key={photo.id} style={{padding: '8px'}}>
                  <Image
                    alt={get(photo, 'alt_description')}
                    naturalHeight={get(photo, 'height')} 
                    naturalWidth={get(photo, 'width')} 
                    src={get(photo, 'urls.regular')} />
                </div>
              ))
            }
          </Col>
        ))
      }
    </Row>
  );
}