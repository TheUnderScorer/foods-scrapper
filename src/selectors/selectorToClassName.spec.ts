import selectorToClassName from './selectorToClassName';

describe( 'selectorToClassName', () => {
    it( 'Removes first character from selector', () => {
        const selector = '.selector';
        const expected = 'selector';
        const result = selectorToClassName( selector );

        expect( result ).toEqual( expected );
    } );
} );
