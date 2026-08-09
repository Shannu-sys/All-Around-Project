import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, Moon, Search, Send, Sparkles, SunMoon } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import type { RideOption, ServiceItem } from '../types'

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Demo experience</p>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  )
}

function Avatar({ label, accent, size = 'md' }: { label: string; accent: string; size?: 'sm' | 'md' | 'lg' }) {
  return <div className={`avatar ${size}`} style={{ background: accent }}>{label}</div>
}

export function HomePage() {
  const { chats, searchQuery, notifications, services } = useAppContext()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 220)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return chats.slice(0, 4)
    return chats.filter((chat) => chat.name.toLowerCase().includes(query))
  }, [chats, searchQuery])

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return services.slice(0, 6)
    return services.filter((service) => service.name.toLowerCase().includes(query))
  }, [services, searchQuery])

  return (
    <PageShell title="Good morning, Rahul 👋" subtitle="Everything you need in one place.">
      {searchQuery ? (
        <div className="stack">
          <div className="panel-card">
            <div className="section-heading">
              <h4>Search results</h4>
              <span>Live demo</span>
            </div>
            <div className="chip-row">
              {filteredChats.length > 0 ? filteredChats.map((chat) => <div key={chat.id} className="chip">{chat.name}</div>) : <div className="chip">No matches yet</div>}
            </div>
            <div className="chip-row">
              {filteredServices.map((service) => <div key={service.id} className="chip">{service.name}</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="stack">
          <div className="hero-card">
            <div>
              <p className="eyebrow">Unified platform</p>
              <h4>Social + food + mobility + payments, all in one experience.</h4>
              <p>Use the mock navigation to explore a high-fidelity concept designed for leadership demos and early customer feedback.</p>
            </div>
            <div className="hero-actions">
              <Link to="/chats" className="primary-button">Open chats</Link>
              <Link to="/food" className="secondary-button">Try food demo</Link>
            </div>
          </div>

          <div className="grid-2">
            <div className="panel-card">
              <div className="section-heading">
                <h4>Recent chats</h4>
                <Link to="/chats">View all</Link>
              </div>
              {ready ? (
                <div className="stack tight">
                  {filteredChats.map((chat) => (
                    <Link key={chat.id} to={`/chats/${chat.id}`} className="list-item">
                      <Avatar label={chat.avatar} accent={chat.accent} size="sm" />
                      <div className="list-copy">
                        <strong>{chat.name}</strong>
                        <p>{chat.lastMessage}</p>
                      </div>
                      <div className="list-meta">
                        <span>{chat.timestamp}</span>
                        {chat.unreadCount > 0 ? <span className="pill">{chat.unreadCount}</span> : null}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="skeleton-stack">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              )}
            </div>

            <div className="panel-card">
              <div className="section-heading">
                <h4>Your shortcuts</h4>
                <span>Quick actions</span>
              </div>
              <div className="chip-row">
                <Link to="/food" className="chip">Order food</Link>
                <Link to="/grocery" className="chip">Grocery</Link>
                <Link to="/rides" className="chip">Book ride</Link>
                <Link to="/payments" className="chip">Send money</Link>
              </div>
              <div className="wallet-card">
                <p>Wallet balance</p>
                <h4>₹2,450.00</h4>
                <div className="button-row">
                  <Link to="/wallet" className="primary-button">Add money</Link>
                  <Link to="/payments" className="secondary-button">Send money</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-3">
            <div className="panel-card">
              <div className="section-heading">
                <h4>Upcoming activity</h4>
                <span>Mock timeline</span>
              </div>
              <div className="stack tight">
                <div className="list-item compact">
                  <div className="dot" />
                  <div className="list-copy">
                    <strong>Food order</strong>
                    <p>Pizza Palace • 25 mins</p>
                  </div>
                </div>
                <div className="list-item compact">
                  <div className="dot" />
                  <div className="list-copy">
                    <strong>Ride</strong>
                    <p>Pickup at Green Park • 3 mins</p>
                  </div>
                </div>
                <div className="list-item compact">
                  <div className="dot" />
                  <div className="list-copy">
                    <strong>Grocery order</strong>
                    <p>Estimated delivery • 45 mins</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <div className="section-heading">
                <h4>Notifications</h4>
                <span>{notifications.filter((item) => !item.read).length} new</span>
              </div>
              <div className="stack tight">
                {notifications.map((item) => (
                  <div key={item.id} className="list-item compact">
                    <div className={`dot ${item.read ? 'muted' : ''}`} />
                    <div className="list-copy">
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="section-heading">
                <h4>Recommended for you</h4>
                <span>Tailored demo</span>
              </div>
              <div className="stack tight">
                <div className="recommendation-card">
                  <div>
                    <strong>AI Assistant</strong>
                    <p>Ask for dinner, rides, or summaries.</p>
                  </div>
                  <Sparkles size={18} />
                </div>
                <div className="recommendation-card">
                  <div>
                    <strong>Unified search</strong>
                    <p>Search people, chats, food, and services.</p>
                  </div>
                  <Search size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}

export function ChatsPage() {
  const { chats, messages, addMessage } = useAppContext()
  const { chatId } = useParams<{ chatId?: string }>()
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const selectedChat = useMemo(() => chats.find((chat) => chat.id === chatId) ?? chats[0], [chatId, chats])
  const thread = useMemo(() => messages.filter((message) => message.chatId === (selectedChat?.id ?? 'chat-priya')), [messages, selectedChat])

  useEffect(() => {
    if (typeof endRef.current?.scrollIntoView === 'function') {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [thread, draft])

  if (!selectedChat) return <EmptyState title="No chats available" body="Start a mock conversation to see the messaging flow." />

  const sendMessage = () => {
    if (!draft.trim()) return
    addMessage(selectedChat.id, draft)
    setDraft('')
  }

  return (
    <PageShell title="Messaging" subtitle="Prototype conversations with instant mock replies.">
      <div className="chat-layout">
        <div className="chat-list">
          {chats.map((chat) => (
            <button key={chat.id} type="button" className={`chat-preview${selectedChat.id === chat.id ? ' active' : ''}`} onClick={() => navigate(`/chats/${chat.id}`)}>
              <Avatar label={chat.avatar} accent={chat.accent} size="sm" />
              <div className="list-copy">
                <strong>{chat.name}</strong>
                <p>{chat.lastMessage}</p>
              </div>
              <div className="list-meta">
                <span>{chat.timestamp}</span>
                {chat.unreadCount > 0 ? <span className="pill">{chat.unreadCount}</span> : null}
              </div>
            </button>
          ))}
        </div>

        <div className="chat-room">
          <div className="chat-header">
            <div className="chat-user">
              <Avatar label={selectedChat.avatar} accent={selectedChat.accent} size="sm" />
              <div>
                <strong>{selectedChat.name}</strong>
                <p>{selectedChat.online ? 'Online' : 'Away'}</p>
              </div>
            </div>
            <button type="button" className="secondary-button small" onClick={() => navigate('/contacts')}>Start chat</button>
          </div>

          <div className="message-list">
            {thread.map((message) => (
              <div key={message.id} className={`message-bubble${message.own ? ' own' : ''}`}>
                <div className="message-meta">
                  <strong>{message.sender}</strong>
                  <span>{message.timestamp}</span>
                </div>
                <p>{message.text}</p>
                <div className="message-status">{message.status}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="composer">
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendMessage()
              }
            }} placeholder="Type a message..." rows={2} />
            <button type="button" className="primary-button" onClick={sendMessage}>
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function ContactsPage() {
  const { users, searchQuery } = useAppContext()
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return users.filter((user) => user.name.toLowerCase().includes(query))
  }, [users, searchQuery])

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof filtered>>((groups, user) => {
      const letter = user.name[0].toUpperCase()
      groups[letter] = [...(groups[letter] ?? []), user]
      return groups
    }, {})
  }, [filtered])

  return (
    <PageShell title="Contacts" subtitle="Browse people and groups with rich mock profiles.">
      <div className="stack">
        {Object.entries(grouped).map(([letter, items]) => (
          <div key={letter} className="panel-card">
            <div className="section-heading">
              <h4>{letter}</h4>
              <span>{items.length} contacts</span>
            </div>
            <div className="stack tight">
              {items.map((user) => (
                <div key={user.id} className="list-item">
                  <Avatar label={user.avatar} accent={user.accent} size="sm" />
                  <div className="list-copy">
                    <strong>{user.name}</strong>
                    <p>{user.role}</p>
                  </div>
                  <div className="list-meta">
                    <span className={`status ${user.online ? 'online' : 'offline'}`}>{user.online ? 'Online' : 'Offline'}</span>
                    <Link to={`/chats/${user.id}`} className="secondary-button small">Start chat</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}

export function CallsPage() {
  return <PageShell title="Calls" subtitle="A future voice and video hub for the All Around experience."><EmptyState title="Calls are coming soon" body="Voice and video routing will be added in a future release." /></PageShell>
}

export function CommunitiesPage() {
  return <PageShell title="Communities" subtitle="Spaces for communities, groups, and local interest circles."><EmptyState title="Community spaces" body="Groups and shared experiences will appear here soon." /></PageShell>
}

export function FoodPage() {
  const { restaurants, addToCart } = useAppContext()
  const [selectedId, setSelectedId] = useState(restaurants[0]?.id ?? '')
  const [toast, setToast] = useState<string | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [search, setSearch] = useState('')

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase()
    return restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(query) || restaurant.category.toLowerCase().includes(query))
  }, [restaurants, search])

  const selectedRestaurant = filteredRestaurants.find((restaurant) => restaurant.id === selectedId) ?? filteredRestaurants[0] ?? restaurants[0]

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleAdd = (itemName: string) => {
    addToCart()
    setToast(`${itemName} added to cart`)
  }

  return (
    <PageShell title="Food" subtitle="A mock food-ordering experience that feels polished and tactile.">
      <div className="stack">
        <div className="panel-card">
          <div className="section-heading">
            <h4>Deliver to</h4>
            <span>Home • 1206, Green Park</span>
          </div>
          <label className="search-pill wide">
            <Search size={16} />
            <input placeholder="Search restaurants or food" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>

        <div className="grid-2">
          <div className="panel-card">
            <div className="section-heading">
              <h4>Popular restaurants</h4>
              <span>Mock demo</span>
            </div>
            <div className="stack tight">
              {filteredRestaurants.map((restaurant) => (
                <button key={restaurant.id} type="button" className={`restaurant-card${selectedRestaurant?.id === restaurant.id ? ' active' : ''}`} onClick={() => setSelectedId(restaurant.id)}>
                  <div>
                    <strong>{restaurant.name}</strong>
                    <p>{restaurant.category}</p>
                  </div>
                  <div className="list-meta">
                    <span>{restaurant.rating} ★</span>
                    <span>{restaurant.eta}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <div className="section-heading">
              <h4>{selectedRestaurant?.name ?? 'Select a restaurant'}</h4>
              <span>{selectedRestaurant?.priceRange} • {selectedRestaurant?.eta}</span>
            </div>
            <div className="stack tight">
              {selectedRestaurant?.items.map((item) => (
                <div key={item.name} className="menu-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.desc}</p>
                  </div>
                  <div className="menu-actions">
                    <span>₹{item.price}</span>
                    <button type="button" className="secondary-button small" onClick={() => handleAdd(item.name)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel-card">
          <div className="section-heading">
            <h4>Order summary</h4>
            <span>Mock confirmation</span>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button" onClick={() => setOrderPlaced(true)}>Confirm order</button>
            <span className="pill">Cart {orderPlaced ? 'ready' : 'demo'}</span>
          </div>
          {orderPlaced ? <p className="success-text"><CheckCircle2 size={16} /> Mock order confirmed • your food will arrive shortly.</p> : null}
        </div>
        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </PageShell>
  )
}

export function GroceryPage() {
  const { products, addToCart } = useAppContext()
  const [category, setCategory] = useState('All')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filteredProducts = useMemo(() => {
    if (category === 'All') return products
    return products.filter((product) => product.category === category)
  }, [category, products])

  return (
    <PageShell title="Grocery" subtitle="A mock quick-commerce experience with curated essentials.">
      <div className="stack">
        <div className="panel-card">
          <div className="section-heading">
            <h4>Categories</h4>
            <span>Fresh picks</span>
          </div>
          <div className="chip-row">
            {['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages', 'Household'].map((item) => (
              <button key={item} type="button" className={`chip${category === item ? ' active' : ''}`} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
        </div>

        <div className="panel-card">
          <div className="section-heading">
            <h4>Products</h4>
            <span>Estimated delivery • 35 mins</span>
          </div>
          <div className="grid-2">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-head">
                  <div className="dot" style={{ background: product.accent }} />
                  <span>{product.category}</span>
                </div>
                <h5>{product.name}</h5>
                <p>₹{product.price} • {product.unit}</p>
                <button type="button" className="primary-button" onClick={() => { addToCart(); setToast(`${product.name} added`) }}>Add</button>
              </div>
            ))}
          </div>
        </div>
        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </PageShell>
  )
}

export function RidesPage() {
  const { rides } = useAppContext()
  const [selectedRide, setSelectedRide] = useState<RideOption>(rides[0])
  const [confirmed, setConfirmed] = useState(false)

  return (
    <PageShell title="Rides" subtitle="A mock mobility experience with local route visuals.">
      <div className="ride-layout">
        <div className="panel-card map-card">
          <h4>Pickup: Home • Green Park</h4>
          <h4>Destination: Cyber Hub</h4>
          <div className="map-visual" aria-label="Mock map visualization">
            <div className="map-route" />
            <div className="map-pin pickup" />
            <div className="map-pin dest" />
          </div>
        </div>
        <div className="panel-card">
          <div className="section-heading">
            <h4>Select ride</h4>
            <span>Mock booking</span>
          </div>
          <div className="stack tight">
            {rides.map((ride) => (
              <button key={ride.id} type="button" className={`ride-card${selectedRide.id === ride.id ? ' active' : ''}`} onClick={() => setSelectedRide(ride)}>
                <div>
                  <strong>{ride.name}</strong>
                  <p>{ride.perks.join(' • ')}</p>
                </div>
                <div className="list-meta">
                  <span>₹{ride.price}</span>
                  <span>{ride.time}</span>
                </div>
              </button>
            ))}
          </div>
          <button type="button" className="primary-button wide" onClick={() => setConfirmed(true)}>Confirm ride</button>
          {confirmed ? <p className="success-text"><CheckCircle2 size={16} /> Ride request queued • your driver will arrive soon.</p> : null}
        </div>
      </div>
    </PageShell>
  )
}

export function PaymentsPage() {
  const { transactions } = useAppContext()
  return (
    <PageShell title="Payments" subtitle="A mock payments hub that keeps the experience premium and safe.">
      <div className="stack">
        <div className="panel-card">
          <div className="section-heading">
            <h4>All Around Payments</h4>
            <span>Demo only</span>
          </div>
          <div className="wallet-card">
            <p>Wallet balance</p>
            <h4>₹2,450.00</h4>
            <div className="button-row">
              <button type="button" className="primary-button">Add money</button>
              <button type="button" className="secondary-button">Send money</button>
            </div>
          </div>
        </div>

        <div className="panel-card">
          <div className="section-heading">
            <h4>Quick actions</h4>
            <span>Future-ready flow</span>
          </div>
          <div className="chip-row">
            <div className="chip">Scan & Pay</div>
            <div className="chip">Pay Contact</div>
            <div className="chip">Pay Bills</div>
            <div className="chip">Bank Transfer</div>
          </div>
        </div>

        <div className="panel-card">
          <div className="section-heading">
            <h4>Recent transactions</h4>
            <span>Simulated history</span>
          </div>
          <div className="stack tight">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="list-item compact">
                <div className="dot" />
                <div className="list-copy">
                  <strong>{transaction.title}</strong>
                  <p>{transaction.date}</p>
                </div>
                <div className="list-meta">
                  <span className={transaction.type === 'credit' ? 'positive' : 'negative'}>{transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function WalletPage() {
  const { transactions } = useAppContext()
  return (
    <PageShell title="Wallet" subtitle="Balance, activity, and upcoming bill visibility in one view.">
      <div className="stack">
        <div className="panel-card">
          <div className="section-heading">
            <h4>All Around Wallet</h4>
            <span>Mock balance</span>
          </div>
          <div className="wallet-card">
            <p>Your balance</p>
            <h4>₹2,450.00</h4>
          </div>
        </div>
        <div className="panel-card">
          <div className="section-heading">
            <h4>Recent transactions</h4>
            <span>Simulated</span>
          </div>
          <div className="stack tight">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="list-item compact">
                <div className="dot" />
                <div className="list-copy">
                  <strong>{transaction.title}</strong>
                  <p>{transaction.status}</p>
                </div>
                <div className="list-meta">
                  <span className={transaction.type === 'credit' ? 'positive' : 'negative'}>{transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function OffersPage() {
  return <PageShell title="Offers" subtitle="A future home for rewards, coupons, and seasonal promotions."><EmptyState title="Offers dashboard" body="Promotions and discounts will appear here next." /></PageShell>
}

export function BookingsPage() {
  return <PageShell title="Bookings" subtitle="Reservations, appointments, and service scheduling in one place."><EmptyState title="Bookings" body="Your past and upcoming reservations will arrive here soon." /></PageShell>
}

export function ServicesPage() {
  const { services } = useAppContext()
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  return (
    <PageShell title="More services" subtitle="A directory of future-facing service experiences.">
      <div className="grid-2">
        <div className="panel-card">
          <div className="section-heading">
            <h4>Available services</h4>
            <span>Future placeholders</span>
          </div>
          <div className="grid-2">
            {services.map((service) => (
              <button key={service.id} type="button" className="service-card" onClick={() => setSelectedService(service)}>
                <div className="service-dot" style={{ background: service.accent }} />
                <h5>{service.name}</h5>
                <p>{service.description}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="panel-card">
          {selectedService ? (
            <>
              <div className="section-heading">
                <h4>{selectedService.name}</h4>
                <span>Coming soon</span>
              </div>
              <div className="empty-state large">
                <h4>Coming soon</h4>
                <p>This service is part of the future All Around roadmap and is currently shown as a polished placeholder experience.</p>
              </div>
            </>
          ) : (
            <EmptyState title="Pick a service" body="Every card unlocks a future-ready placeholder experience." />
          )}
        </div>
      </div>
    </PageShell>
  )
}

export function ProfilePage() {
  const { currentUser } = useAppContext()
  return (
    <PageShell title="Profile" subtitle="A demo profile that reinforces the unified identity across the app.">
      <div className="stack">
        <div className="panel-card profile-card">
          <div className="profile-top">
            <Avatar label={currentUser.avatar} accent={currentUser.accent} size="lg" />
            <div>
              <h4>{currentUser.name}</h4>
              <p>{currentUser.role}</p>
            </div>
          </div>
          <div className="profile-details">
            <div>
              <p>Phone</p>
              <strong>+91 98765 43210</strong>
            </div>
            <div>
              <p>Email</p>
              <strong>rahul@allaround.app</strong>
            </div>
            <div>
              <p>Status</p>
              <strong>Exploring the future</strong>
            </div>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">Edit profile</button>
            <button type="button" className="secondary-button">Preferences</button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function SettingsPage() {
  const { theme, setTheme } = useAppContext()
  return (
    <PageShell title="Settings" subtitle="A polished settings surface for appearance, privacy, and support.">
      <div className="stack">
        <div className="panel-card">
          <div className="section-heading">
            <h4>Appearance</h4>
            <span>Theme</span>
          </div>
          <div className="button-row">
            <button type="button" className={`secondary-button${theme === 'light' ? ' active' : ''}`} onClick={() => setTheme('light')}><SunMoon size={16} /> Light</button>
            <button type="button" className={`secondary-button${theme === 'dark' ? ' active' : ''}`} onClick={() => setTheme('dark')}><Moon size={16} /> Dark</button>
          </div>
        </div>
        <div className="panel-card">
          <div className="section-heading">
            <h4>Preferences</h4>
            <span>One identity</span>
          </div>
          <div className="stack tight">
            <div className="list-item compact"><div className="list-copy"><strong>Account</strong><p>Secure demo profile</p></div></div>
            <div className="list-item compact"><div className="list-copy"><strong>Privacy</strong><p>Private by default</p></div></div>
            <div className="list-item compact"><div className="list-copy"><strong>Notifications</strong><p>Quiet hours</p></div></div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function NotFoundPage() {
  return <PageShell title="404" subtitle="The route you requested does not exist in this demo experience."><EmptyState title="Page unavailable" body="Return to the home dashboard to continue exploring the prototype." /></PageShell>
}
