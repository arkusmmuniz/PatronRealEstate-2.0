import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchForm } from '@/components/buyers-poc/search-form'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()

describe('SearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('renders the search form with standard search tab by default', () => {
    render(<SearchForm />)
    
    expect(screen.getByText('Standard Search')).toBeInTheDocument()
    expect(screen.getByText('Search by MLS #')).toBeInTheDocument()
    expect(screen.getByLabelText('Location (City/ZIP)')).toBeInTheDocument()
    expect(screen.getByLabelText('Min Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Price')).toBeInTheDocument()
  })

  it('switches between standard search and MLS search tabs', () => {
    render(<SearchForm />)
    
    const mlsTab = screen.getByText('Search by MLS #')
    fireEvent.click(mlsTab)
    
    expect(screen.getByLabelText('MLS Number / Listing ID')).toBeInTheDocument()
    expect(screen.queryByLabelText('Location (City/ZIP)')).not.toBeInTheDocument()
    
    const standardTab = screen.getByText('Standard Search')
    fireEvent.click(standardTab)
    
    expect(screen.getByLabelText('Location (City/ZIP)')).toBeInTheDocument()
    expect(screen.queryByLabelText('MLS Number / Listing ID')).not.toBeInTheDocument()
  })

  it('updates form fields when user types', () => {
    render(<SearchForm />)
    
    const locationInput = screen.getByLabelText('Location (City/ZIP)')
    fireEvent.change(locationInput, { target: { value: 'Los Angeles' } })
    expect(locationInput).toHaveValue('Los Angeles')
    
    const minPriceInput = screen.getByLabelText('Min Price')
    fireEvent.change(minPriceInput, { target: { value: '100000' } })
    expect(minPriceInput).toHaveValue(100000)
    
    const maxPriceInput = screen.getByLabelText('Max Price')
    fireEvent.change(maxPriceInput, { target: { value: '500000' } })
    expect(maxPriceInput).toHaveValue(500000)
  })

  it('handles standard search submission with all fields', () => {
    render(<SearchForm />)
    
    fireEvent.change(screen.getByLabelText('Location (City/ZIP)'), {
      target: { value: 'Los Angeles, CA' },
    })
    fireEvent.change(screen.getByLabelText('Min Price'), {
      target: { value: '100000' },
    })
    fireEvent.change(screen.getByLabelText('Max Price'), {
      target: { value: '500000' },
    })
    
    const searchButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Search'
    )
    expect(searchButton).toBeInTheDocument()
    fireEvent.click(searchButton!)
    
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/buyers-poc/results?location=Los+Angeles%2C+CA&minPrice=100000&maxPrice=500000')
    )
  })

  it('handles standard search with only location', () => {
    render(<SearchForm />)
    
    fireEvent.change(screen.getByLabelText('Location (City/ZIP)'), {
      target: { value: '90001' },
    })
    
    const searchButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Search'
    )
    expect(searchButton).toBeInTheDocument()
    fireEvent.click(searchButton!)
    
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/buyers-poc/results?location=90001')
    )
  })

  it('filters out "any" values from search params', () => {
    render(<SearchForm />)
    
    fireEvent.change(screen.getByLabelText('Location (City/ZIP)'), {
      target: { value: 'Los Angeles' },
    })
    // Bedrooms and bathrooms default to "any", should not be included
    
    const searchButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Search'
    )
    expect(searchButton).toBeInTheDocument()
    fireEvent.click(searchButton!)
    
    const calledUrl = mockPush.mock.calls[0][0]
    expect(calledUrl).not.toContain('bedrooms=any')
    expect(calledUrl).not.toContain('bathrooms=any')
    expect(calledUrl).not.toContain('propertyType=any')
  })

  it('handles MLS search submission', async () => {
    render(<SearchForm />)
    
    // Switch to MLS tab
    const mlsTab = screen.getByText('Search by MLS #')
    fireEvent.click(mlsTab)
    
    const mlsInput = screen.getByLabelText('MLS Number / Listing ID')
    fireEvent.change(mlsInput, { target: { value: '123456789' } })
    
    await waitFor(() => {
      const searchButton = screen.getAllByRole('button').find(
        button => button.textContent === 'Search by MLS #' && !button.hasAttribute('disabled')
      )
      expect(searchButton).toBeInTheDocument()
      if (searchButton) {
        fireEvent.click(searchButton)
      }
    })
    
    expect(mockPush).toHaveBeenCalledWith('/buyers-poc/listing/123456789')
  })

  it('disables MLS search button when input is empty', () => {
    render(<SearchForm />)
    
    const mlsTab = screen.getByText('Search by MLS #')
    fireEvent.click(mlsTab)
    
    const searchButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Search by MLS #'
    )
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toBeDisabled()
    
    const mlsInput = screen.getByLabelText('MLS Number / Listing ID')
    fireEvent.change(mlsInput, { target: { value: '123' } })
    
    expect(searchButton).not.toBeDisabled()
  })

  it('trims whitespace from MLS number', async () => {
    render(<SearchForm />)
    
    const mlsTab = screen.getByText('Search by MLS #')
    fireEvent.click(mlsTab)
    
    const mlsInput = screen.getByLabelText('MLS Number / Listing ID')
    fireEvent.change(mlsInput, { target: { value: '  123456789  ' } })
    
    await waitFor(() => {
      const searchButton = screen.getAllByRole('button').find(
        button => button.textContent === 'Search by MLS #' && !button.hasAttribute('disabled')
      )
      expect(searchButton).toBeInTheDocument()
      if (searchButton) {
        fireEvent.click(searchButton)
      }
    })
    
    expect(mockPush).toHaveBeenCalledWith('/buyers-poc/listing/123456789')
  })

  it('handles bedroom selection', () => {
    render(<SearchForm />)
    
    // Note: This test assumes the Select component is accessible
    // In a real scenario, you might need to mock the Select component
    // or use a different testing approach for Radix UI components
    expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument()
  })

  it('handles bathroom selection', () => {
    render(<SearchForm />)
    
    expect(screen.getByLabelText('Bathrooms')).toBeInTheDocument()
  })

  it('handles property type selection', () => {
    render(<SearchForm />)
    
    expect(screen.getByLabelText('Property Type')).toBeInTheDocument()
  })
})

