import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { withProfiler } from 'jest-react-profiler';

import App from './App';

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Committed once on initial render', () => {
    const AppWithProfiler = withProfiler(App);

    render(<AppWithProfiler />);

    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });
});
