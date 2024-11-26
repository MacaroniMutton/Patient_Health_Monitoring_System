import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SimpleApp from './SimpleApp'

describe('SimpleApp', () => {
  it('renders headline', () => {
    render(<SimpleApp />)
    const headline = screen.getByText(/Vite \+ React/i)
    expect(headline).toBeInTheDocument()
  })
})