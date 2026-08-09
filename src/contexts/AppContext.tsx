import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Chat, Message, NotificationItem, Product, Restaurant, RideOption, ServiceItem, Transaction, User } from '../types'
import usersData from '../data/users.json'
import chatsData from '../data/chats.json'
import messagesData from '../data/messages.json'
import restaurantsData from '../data/restaurants.json'
import productsData from '../data/products.json'
import ridesData from '../data/rides.json'
import transactionsData from '../data/transactions.json'
import servicesData from '../data/services.json'

interface AppContextValue {
  users: User[]
  chats: Chat[]
  messages: Message[]
  restaurants: Restaurant[]
  products: Product[]
  rides: RideOption[]
  transactions: Transaction[]
  services: ServiceItem[]
  notifications: NotificationItem[]
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  cartItems: number
  addToCart: () => void
  sentMessages: Message[]
  addMessage: (chatId: string, text: string) => void
  selectedService: string
  setSelectedService: (value: string) => void
  currentUser: User
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const initialNotifications: NotificationItem[] = [
  { id: 'n1', title: 'New message from Priya', body: 'Your conversation just updated.', time: '2m ago', read: false },
  { id: 'n2', title: 'Your food order is being prepared', body: 'Pizza Palace is packing your order.', time: '12m ago', read: false },
  { id: 'n3', title: 'Ride completed', body: 'Your trip to Cyber Hub is wrapped up.', time: '1h ago', read: true },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users] = useState<User[]>(usersData as User[])
  const [chats, setChats] = useState<Chat[]>(chatsData as Chat[])
  const [messages, setMessages] = useState<Message[]>(messagesData as Message[])
  const [restaurants] = useState<Restaurant[]>(restaurantsData as Restaurant[])
  const [products] = useState<Product[]>(productsData as Product[])
  const [rides] = useState<RideOption[]>(ridesData as RideOption[])
  const [transactions] = useState<Transaction[]>(transactionsData as Transaction[])
  const [services] = useState<ServiceItem[]>(servicesData as ServiceItem[])
  const [notifications] = useState<NotificationItem[]>(initialNotifications)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return (window.localStorage.getItem('all-around-theme') as 'light' | 'dark' | null) ?? 'light'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState(0)
  const [selectedService, setSelectedService] = useState('Home')
  const [sentMessages, setSentMessages] = useState<Message[]>([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('all-around-theme', theme)
  }, [theme])

  const currentUser = users[0]

  const addToCart = () => setCartItems((value) => value + 1)

  const addMessage = (chatId: string, text: string) => {
    if (!text.trim()) return
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      sender: 'You',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent',
      own: true,
    }

    setMessages((current) => [...current, newMessage])
    setSentMessages((current) => [...current, newMessage])
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId ? { ...chat, lastMessage: text.trim(), timestamp: 'Now' } : chat,
      ),
    )
  }

  const value = useMemo(
    () => ({
      users,
      chats,
      messages,
      restaurants,
      products,
      rides,
      transactions,
      services,
      notifications,
      theme,
      setTheme,
      searchQuery,
      setSearchQuery,
      cartItems,
      addToCart,
      sentMessages,
      addMessage,
      selectedService,
      setSelectedService,
      currentUser,
    }),
    [users, chats, messages, restaurants, products, rides, transactions, services, notifications, theme, searchQuery, cartItems, sentMessages, selectedService, currentUser],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
