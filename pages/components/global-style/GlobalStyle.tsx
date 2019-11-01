import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import card from './styles/cards';
import code from './styles/code';
import buttons from './styles/buttons';

export default createGlobalStyle`
    body {
        margin: 0;
    }
    
    ${ card }
    ${ code }
    ${ buttons }
`;
