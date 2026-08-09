export type ThemeMode = 'light' | 'dark'

export interface User {
  id: string
  name: string
  role: string
  avatar: string
  online: boolean
  accent: string
}

export interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  online?: boolean
  avatar: string
  isGroup?: boolean
  accent: string
}

export interface Message {
  id: string
  chatId: string
  sender: string
  text: string
  timestamp: string
  status: 'Sent' | 'Delivered' | 'Read'
  own?: boolean
}

export interface Restaurant {
  id: string
  name: string
  category: string
  rating: number
  eta: string
  priceRange: string
  tags: string[]
  accent: string
  items: { name: string; price: number; desc: string }[]
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  unit: string
  badge?: string
  accent: string
}

export interface RideOption {
  id: string
  name: string
  price: number
  time: string
  perks: string[]
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: 'credit' | 'debit'
  date: string
  status: string
}

export interface ServiceItem {
  id: string
  name: string
  description: string
  accent: string
}

export interface NotificationItem {
  id: string
  title: string
  body: string
  time: string
  read: boolean
}
