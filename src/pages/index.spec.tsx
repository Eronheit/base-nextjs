import { render, RenderResult, cleanup } from '@testing-library/react';
import Login from '.';

const populateField = (
  sut: RenderResult,
  fieldName: string,
  fieldValue = '',
): void => {
  const field = sut.container.querySelector(
    `input[name='${fieldName}'`,
  ) as HTMLInputElement;

  expect(field.value).toBe(fieldValue);
};

describe('<Login />', () => {
  afterEach(cleanup);
  it('Should start form with initial values', async () => {
    const sut = render(<Login />);

    populateField(sut, 'email');
    populateField(sut, 'password');
  });
});
