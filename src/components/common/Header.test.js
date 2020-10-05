import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Shallow is lightweight and fast - you search for the React component tag
it('contains 3 NavLinks via shallow', () => {
    const numLinks = shallow(<Header />).find('NavLink').length;
    expect(numLinks).toEqual(3);
});

// Mount is slower - you search for the final HTML since it generates the final DOM
// We also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's props passed in
it('cotains 3 anchors via mount', () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find('a').length;
    expect(numAnchors).toEqual(3);
});
