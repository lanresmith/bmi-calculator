import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('Commits once on initial render', () => {
    const AppWithProfiler = withProfiler(App);

    render(<AppWithProfiler />);

    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });

  it('Should have a total of 4 commits on new entry submission', () => {
    const AppWithProfiler = withProfiler(App);

    render(<AppWithProfiler />);

    expect(AppWithProfiler).toHaveCommittedTimes(1);

    const button = screen.getByRole('button', {name: /Calculate/i});
    const weightInput = screen.getByLabelText('Weight (in kg)');
    const heightInput = screen.getByLabelText('Height (in cm)');

    fireEvent.change(weightInput, { target: { value: "50" } });
    fireEvent.change(heightInput, { target: { value: "176" } });
    expect(AppWithProfiler).toHaveCommittedTimes(2);

    fireEvent.click(button);
    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });
});
