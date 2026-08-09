import { renderHook, act } from '@testing-library/react'
import { AppProvider, useAppContext } from './AppContext'
import { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}

describe('AppContext', () => {
  it('provides the initial app state and updates search and theme', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    expect(result.current.currentUser.name).toBe('Priya Mehta')
    expect(result.current.cartItems).toBe(0)

    act(() => {
      result.current.setSearchQuery('food')
      result.current.setTheme('dark')
    })

    expect(result.current.searchQuery).toBe('food')
    expect(result.current.theme).toBe('dark')
    expect(window.localStorage.getItem('all-around-theme')).toBe('dark')
  })

  it('adds a message and increments cart items', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    act(() => {
      result.current.addToCart()
      result.current.addMessage('chat-priya', 'Hello there')
    })

    expect(result.current.cartItems).toBe(1)
    expect(result.current.sentMessages.at(-1)?.text).toBe('Hello there')
    expect(result.current.chats[0].lastMessage).toBe('Hello there')
  })
})
