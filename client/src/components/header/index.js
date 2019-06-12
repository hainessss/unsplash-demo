import styled from 'styled-components';
import React from 'react';

import Row from 'zero-component-library/Row';
import Col from 'zero-component-library/Col';

const Header = styled(Row)`
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #cccccc;
`;

export default ({children}) => (
  <Header justifyContent='center'>
    <Col xs={10} md={6}>
      { children }
    </Col>
  </Header>
)