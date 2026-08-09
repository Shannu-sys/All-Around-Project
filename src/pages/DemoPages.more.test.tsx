import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from '../contexts/AppContext'
import { ChatsPage, FoodPage, GroceryPage, PaymentsPage, ServicesPage, WalletPage } from './DemoPages'

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <AppProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AppProvider>,
  )
}

describe('Additional demo page flows', () => {
  it('allows sending a message in the chats view', () => {
    renderWithProvider(<ChatsPage />)
    const textarea = screen.getByPlaceholderText(/Type a message/i)
    fireEvent.change(textarea, { target: { value: 'Hello from test' } })
    fireEvent.click(screen.getByRole('button', { name: /^Send$/i }))
    expect(screen.getAllByText(/Hello from test/i).length).toBeGreaterThan(0)
  })

  it('adds a food item to the cart and confirms an order', () => {
    renderWithProvider(<FoodPage />)
    const addButtons = screen.getAllByRole('button', { name: /Add/i })
    fireEvent.click(addButtons[0])
    fireEvent.click(screen.getByRole('button', { name: /^Confirm order$/i }))
    expect(screen.getByText(/Mock order confirmed/i)).toBeInTheDocument()
  })

  it('filters grocery products by category and adds one', () => {
    renderWithProvider(<GroceryPage />)
    fireEvent.click(screen.getByRole('button', { name: /^Dairy$/i }))
    const addButtons = screen.getAllByRole('button', { name: /^Add$/i })
    fireEvent.click(addButtons[0])
    expect(screen.getByText(/added/i)).toBeInTheDocument()
  })

  it('renders payment and wallet histories', () => {
    renderWithProvider(<>
      <PaymentsPage />
      <WalletPage />
    </>)
    expect(screen.getAllByText(/Recent transactions/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/All Around Wallet/i)).toBeInTheDocument()
  })

  it('selects a service card and shows the placeholder panel', () => {
    renderWithProvider(<ServicesPage />)
    fireEvent.click(screen.getByRole('button', { name: /Shopping/i }))
    expect(screen.getByRole('heading', { name: /^Coming soon$/i })).toBeInTheDocument()
  })
})
