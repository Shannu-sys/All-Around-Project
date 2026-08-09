import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { Shell } from './components/layout/Shell'
import {
  BookingsPage,
  CallsPage,
  ChatsPage,
  CommunitiesPage,
  ContactsPage,
  FoodPage,
  GroceryPage,
  HomePage,
  NotFoundPage,
  OffersPage,
  PaymentsPage,
  ProfilePage,
  RidesPage,
  ServicesPage,
  SettingsPage,
  WalletPage,
} from './pages/DemoPages'
import './App.css'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/chats/:chatId" element={<ChatsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/grocery" element={<GroceryPage />} />
            <Route path="/rides" element={<RidesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
