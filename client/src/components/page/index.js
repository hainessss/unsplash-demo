import styled from 'styled-components';
import React from 'react';

import Row from 'zero-component-library/Row';

const View = styled(Row)`
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: scroll;
  width: 100%;
`;

const PageLayout = ({children}) => {
  return ( 
    <View flexWrap='nowrap' flexDirection='column'>
      { children }
    </View>
  )
};

export { Content };

export default PageLayout;
