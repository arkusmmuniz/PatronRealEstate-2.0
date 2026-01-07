import { render, screen, fireEvent } from '@testing-library/react'
import { BrokerCard } from '@/components/buyers-poc/broker-card'

// Mock window.location
const mockLocation = {
  href: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
}

Object.defineProperty(window, 'location', {
  writable: true,
  value: mockLocation,
})

describe('BrokerCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocation.href = ''
  })

  it('renders the broker card with all elements', () => {
    render(<BrokerCard />)
    
    expect(screen.getByText('Schedule a showing')).toBeInTheDocument()
    expect(screen.getByText('Broker')).toBeInTheDocument()
    expect(screen.getByText(/Phone Number: \(323\) 350-3137/)).toBeInTheDocument()
  })

  it('renders the broker image', () => {
    render(<BrokerCard />)
    
    const image = screen.getByAltText('Fabiola Patron')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://patronrealestateservices.com/fabiola-patron-updated.jpg')
  })

  it('handles image error and shows fallback', () => {
    render(<BrokerCard />)
    
    const image = screen.getByAltText('Fabiola Patron')
    fireEvent.error(image)
    
    // After error, image src should change to fallback
    expect(image).toHaveAttribute('src', '/fabiola-patron-updated.jpg')
  })

  it('navigates to contact page when schedule showing button is clicked', () => {
    render(<BrokerCard />)
    
    const button = screen.getByRole('button', { name: /schedule a showing/i })
    fireEvent.click(button)
    
    expect(mockLocation.href).toBe('/contact')
  })

  it('displays correct phone number', () => {
    render(<BrokerCard />)
    
    const phoneText = screen.getByText(/Phone Number: \(323\) 350-3137/)
    expect(phoneText).toBeInTheDocument()
  })

  it('has correct button styling classes', () => {
    render(<BrokerCard />)
    
    const button = screen.getByRole('button', { name: /schedule a showing/i })
    expect(button).toHaveClass('bg-lime-500')
  })
})

