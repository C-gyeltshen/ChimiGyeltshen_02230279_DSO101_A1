import { render } from '@testing-library/react'
import ToDo from '../src/app/todo/page' // <-- corrected path

test('renders the ToDo component correctly', () => {
  const { container } = render(<ToDo />)
  expect(container).toMatchSnapshot()
})