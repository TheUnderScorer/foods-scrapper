import * as React from 'react';
import { ReactElement } from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

const mountWithStore = <P, S extends object>( component: ReactElement<P>, initialState: S ) => {
    const storeCreator = configureStore( [ thunk ] );
    const mockStore = storeCreator( initialState );

    const mountedComponent = mount(
        <Provider store={ mockStore }>
            { component }
        </Provider>,
    );

    return {
        component: mountedComponent,
        store: mockStore,
    };
};

export default mountWithStore;
