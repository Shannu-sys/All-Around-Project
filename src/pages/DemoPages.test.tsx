import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HomePage, ContactsPage, FoodPage, RidesPage, SettingsPage } from './DemoPages'
import { AppProvider } from '../contexts/AppContext'

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <AppProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AppProvider>,
  )
}

describe('Demo pages', () => {
  it('renders the home dashboard hero content', () => {
    renderWithProvider(<HomePage />)
    expect(screen.getByText(/Unified platform/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open chats/i })).toBeInTheDocument()
  })

  it('renders contacts and their sections', () => {
    renderWithProvider(<ContactsPage />)
    expect(screen.getByRole('heading', { name: /^Contacts$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Start chat/i }).length).toBeGreaterThan(0)
  })

  it('renders food ordering UI and confirms action', () => {
    renderWithProvider(<FoodPage />)
    expect(screen.getByText(/Deliver to/i)).toBeInTheDocument()
    expect(screen.getByText(/Popular restaurants/i)).toBeInTheDocument()
  })

  it('renders rides booking experience', () => {
    renderWithProvider(<RidesPage />)
    expect(screen.getByText(/Pickup:/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Confirm ride/i })).toBeInTheDocument()
  })

  it('renders settings options', () => {
    renderWithProvider(<SettingsPage />)
    expect(screen.getByRole('heading', { name: /^Settings$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Light/i })).toBeInTheDocument()
  })
})
