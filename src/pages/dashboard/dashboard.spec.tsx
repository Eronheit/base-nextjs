import { render } from '@testing-library/react';
import Dashboard from '.';

describe('<Dashboard />', () => {
  it('Should render heading', () => {
    const sut = render(<Dashboard />);
    const heading = sut.getByRole('heading');

    expect(heading).toBeTruthy();
  });
});
