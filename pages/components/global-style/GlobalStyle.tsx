import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import card from './styles/card';
import code from './styles/code';

export default createGlobalStyle`
    body {
        margin: 0;
    }
    
    ${ card }
    ${ code }
`;
