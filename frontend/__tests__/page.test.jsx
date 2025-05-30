import { render, screen } from '@testing-library/react'
import ToDo from '../src/app/todo/page' // <-- corrected path

test('renders a heading', () => {
  render(<ToDo />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toBeInTheDocument()
})