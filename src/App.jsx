import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  Apple, ArrowDown, ArrowRight, Bath, BedDouble, CalendarDays,
  Check, ChevronDown, CircleHelp, Download, Heart,
  Eye, EyeOff, Home as HomeIcon, IndianRupee, MapPin, Menu, MessageCircle, Search,
  Settings, ShieldCheck, SquareCheck, UserRound, X,
} from 'lucide-react'
import './App.css'

const homeHeroImage = '/assets/home-hero.png'
const loginHouseImage = '/assets/login-house.png'

const properties = [
  {
    id: 'villa',
    name: '3 BHK Villa',
    location: 'Whitefield, Bangalore',
    price: '₹ 25,000',
    period: '/month',
    beds: 3,
    baths: 3,
    area: '2,400 sqft',
    badge: 'For Sale',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'apartment',
    name: '2 BHK Apartment',
    location: 'Indiranagar, Bangalore',
    price: '₹ 18,000',
    period: '/month',
    beds: 2,
    baths: 2,
    area: '1,250 sqft',
    badge: 'For Rent',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'family-home',
    name: '4 BHK Family Home',
    location: 'Sarjapur Road, Bangalore',
    price: '₹ 38,000',
    period: '/month',
    beds: 4,
    baths: 3,
    area: '2,800 sqft',
    badge: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'modern-flat',
    name: '2 BHK Modern Flat',
    location: 'Koramangala, Bangalore',
    price: '₹ 20,000',
    period: '/month',
    beds: 2,
    baths: 2,
    area: '1,400 sqft',
    badge: 'For Rent',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  if (isDashboard) return null

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Home Nest home">
        <span className="brand-mark"><HomeIcon size={25} fill="currentColor" /></span>
        <span className="brand-copy"><strong>Home Nest</strong><small>Find Your Perfect Space</small></span>
      </Link>
      <button className="mobile-menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <a href="/#properties" onClick={() => setMenuOpen(false)}>Properties</a>
        <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <Link to="/dashboard" className="icon-button" aria-label="Favorites"><Heart size={20} /></Link>
        <Link to="/login" className="button button-outline button-small">Login</Link>
        <Link to="/login" className="button button-primary button-small">Sign Up</Link>
      </div>
    </header>
  )
}

function PropertyCard({ property, compact = false }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className={`property-card${compact ? ' property-card-compact' : ''}`}>
      <Link className="property-image-link" to={`/properties/${property.id}`}>
        <img src={property.image} alt={property.name} className="property-image" />
        <span className={`property-badge ${property.badge === 'For Rent' ? 'badge-rent' : ''}`}>{property.badge}</span>
      </Link>
      <div className="property-card-content">
        <div className="property-title-row">
          <div>
            <Link to={`/properties/${property.id}`} className="property-title">{property.name}</Link>
            <span className="property-location"><MapPin size={12} />{property.location}</span>
          </div>
          <button className={`save-button${saved ? ' is-saved' : ''}`} onClick={() => setSaved(!saved)} aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}>
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="property-facts">
          <span><BedDouble size={13} />{property.beds} Beds</span>
          <span><Bath size={13} />{property.baths} Baths</span>
          <span><ArrowDown size={13} />{property.area}</span>
        </div>
        <div className="property-card-bottom">
          <span className="price">{property.price}<small>{property.period}</small></span>
          <Link to={`/properties/${property.id}`} className="round-arrow" aria-label={`View ${property.name}`}><ArrowRight size={15} /></Link>
        </div>
      </div>
    </article>
  )
}

function SearchPanel() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Any Type')
  const [budget, setBudget] = useState('Any Price')
  return (
    <form className="search-panel" onSubmit={(event) => { event.preventDefault(); document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' }) }}>
      <label className="search-field search-location">
        <MapPin size={16} />
        <span><small>Location</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter city, area or landmark" /></span>
      </label>
      <label className="search-field">
        <HomeIcon size={16} />
        <span><small>Property Type</small><select value={type} onChange={(event) => setType(event.target.value)}><option>Any Type</option><option>Villa</option><option>Apartment</option><option>House</option></select></span>
        <ChevronDown size={14} />
      </label>
      <label className="search-field">
        <IndianRupee size={18} />
        <span><small>Price Range</small><select value={budget} onChange={(event) => setBudget(event.target.value)}><option>Any Price</option><option>Under ₹20,000</option><option>₹20,000 – ₹35,000</option><option>₹35,000+</option></select></span>
        <ChevronDown size={14} />
      </label>
      <label className="search-field">
        <BedDouble size={16} />
        <span><small>Bedrooms</small><select defaultValue="Any"><option>Any</option><option>1+</option><option>2+</option><option>3+</option><option>4+</option></select></span>
        <ChevronDown size={14} />
      </label>
      <button className="button button-primary search-submit" type="submit"><Search size={16} /> Search</button>
    </form>
  )
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = [
    { name: 'Apartments', count: '1,250+ Properties', image: properties[1].image },
    { name: 'Villas', count: '850+ Properties', image: properties[0].image },
    { name: 'Houses', count: '1,100+ Properties', image: properties[2].image },
    { name: 'Flats', count: '950+ Properties', image: properties[3].image },
    { name: 'Commercial', count: '520+ Properties', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80' },
  ]
  const filteredProperties = activeCategory === 'All' ? properties : properties.filter((property) => {
    if (activeCategory === 'Apartments' || activeCategory === 'Flats') return property.name.toLowerCase().includes('apartment') || property.name.toLowerCase().includes('flat')
    if (activeCategory === 'Villas') return property.name.toLowerCase().includes('villa')
    if (activeCategory === 'Houses') return property.name.toLowerCase().includes('home')
    return true
  })

  return (
    <>
      <section className="hero">
        <img className="hero-design-image" src={homeHeroImage} alt="Your dream home awaits. Find the perfect property for a better tomorrow." />
        <div className="hero-content">
          <span className="eyebrow eyebrow-light">Your dream home awaits</span>
          <h1>Find the Perfect Property<br />for a Better Tomorrow</h1>
          <p>Explore thousands of properties for sale and rent. Whether you're buying, selling, or renting, we make it simple.</p>
        </div>
        <SearchPanel />
      </section>
      <main className="home-content">
        <section className="benefit-row" id="services" aria-label="Our services">
          <div className="benefit"><span className="benefit-icon icon-blue"><ShieldCheck size={18} /></span><span><strong>Verified Listings</strong><small>100% verified properties<br />for your peace of mind</small></span></div>
          <div className="benefit"><span className="benefit-icon icon-green"><Check size={18} /></span><span><strong>Secure Transactions</strong><small>Trusted payment process<br />for a smooth experience</small></span></div>
          <div className="benefit"><span className="benefit-icon icon-purple"><UserRound size={18} /></span><span><strong>Expert Support</strong><small>Personalized guidance<br />every step of the way</small></span></div>
          <div className="benefit"><span className="benefit-icon icon-gold"><HomeIcon size={18} /></span><span><strong>Best Deals</strong><small>The best price and<br />exclusive offers</small></span></div>
        </section>

        <section className="section-block" id="properties">
          <div className="section-heading">
            <div><span className="eyebrow">Handpicked for you</span><h2>Featured Properties</h2><p>Find a place you’ll love to call home.</p></div>
            <Link to="/properties/villa" className="text-link">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="category-pills">
            {['All', 'Apartments', 'Villas', 'Houses'].map((category) => <button key={category} className={activeCategory === category ? 'category-pill active' : 'category-pill'} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="property-grid">
            {filteredProperties.map((property) => <PropertyCard key={property.id} property={property} compact />)}
          </div>
        </section>

        <section className="promo-grid" id="about">
          <div className="promo-card">
            <div className="promo-copy"><span className="eyebrow">New launch</span><h2>Luxury Homes for a<br />Modern Lifestyle</h2><p>Premium villas & apartments in prime locations.</p><Link className="button button-primary button-small" to="/properties/villa">Explore Now <ArrowRight size={13} /></Link></div>
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=850&q=85" alt="Bright modern living room" />
          </div>
          <div className="help-card"><span className="help-avatar"><CircleHelp size={25} /></span><div><strong>Need help?</strong><p>We’re here to help you find your perfect home.</p><a className="button button-outline button-small" href="mailto:hello@homenest.example">Contact Us</a></div></div>
        </section>

        <section className="section-block category-section">
          <div className="section-heading section-heading-left"><div><h2>Explore Properties by Categories</h2><p>Find the right property for your needs.</p></div></div>
          <div className="category-grid">{categories.map((category) => <button key={category.name} className="category-card" onClick={() => { setActiveCategory(category.name); document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' }) }}><img src={category.image} alt="" /><span><strong>{category.name}</strong><small>{category.count}</small></span><ArrowRight size={16} /></button>)}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return <footer className="site-footer" id="contact"><Link to="/" className="brand"><span className="brand-mark"><HomeIcon size={22} fill="currentColor" /></span><span className="brand-copy"><strong>Home Nest</strong><small>Find Your Perfect Space</small></span></Link><p>Make yourself at home. Find the space that feels just right.</p><span>© 2025 Home Nest</span></footer>
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  return (
    <main className="login-page">
      <section className="login-form-side">
        <div className="login-form-wrap">
          <h1>Welcome Back!</h1>
          <p className="login-intro">Sign in to your account to continue exploring amazing properties.</p>
          <form className="login-form" onSubmit={(event) => { event.preventDefault(); setNotice('Sign-in is not connected yet. Please connect your authentication service to continue.') }}>
            <label>Email or Mobile Number<input type="text" placeholder="Enter your email or mobile number" required /></label>
            <label>Password<div className="password-input"><input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <div className="form-options"><label className="remember-label"><input type="checkbox" /> Remember me</label><a href="#forgot" onClick={(event) => { event.preventDefault(); setNotice('Password reset is not connected yet. Please contact support.') }}>Forgot password?</a></div>
            <button type="submit" className="button button-primary login-submit">Login</button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
          <div className="or-divider"><span>Or continue with</span></div>
          <div className="social-login"><button onClick={() => setNotice('Google sign-in is not connected yet.')}><span className="google-mark">G</span><span>Google</span></button><button onClick={() => setNotice('Facebook sign-in is not connected yet.')}><span className="facebook-mark">f</span><span>Facebook</span></button><button aria-label="Continue with Apple" onClick={() => setNotice('Apple sign-in is not connected yet.')}><Apple size={23} fill="currentColor" /></button></div>
          <p className="signup-prompt"><span>Don’t have an account?</span><Link to="/login">Sign Up</Link></p>
        </div>
      </section>
      <section className="login-visual" style={{ backgroundImage: `url("${loginHouseImage}")` }}>
        <div className="login-visual-copy"><h2>Your Dream Home Is<br />Just a Login Away</h2><p>Discover the best properties, exclusive deals<br />and a similar way to find your perfect space.</p></div>
      </section>
    </main>
  )
}

function DetailPage() {
  const property = properties[0]
  const [activeTab, setActiveTab] = useState('Overview')
  return (
    <main className="detail-page page-container">
      <div className="detail-gallery">
        <img className="detail-main-image" src={property.image} alt="Luxury villa exterior with pool" />
        <div className="detail-thumbnails">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80" alt="Villa living room" />
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80" alt="Villa interior" />
          <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=80" alt="Villa kitchen" />
          <button className="more-photos">+12<br /><small>Photos</small></button>
        </div>
      </div>
      <section className="detail-summary">
        <div className="detail-heading"><h1>Luxury 3 BHK Villa</h1><span className="property-badge badge-rent">For Rent</span></div>
        <p className="detail-price">₹ 25,000 <small>/month</small></p>
        <div className="detail-actions"><Link to="/booking" className="button button-primary">Book Now</Link><Link to="/booking" className="button button-outline">Schedule &amp; Visit</Link></div>
      </section>
      <section className="detail-lower">
        <div className="detail-main-column">
          <div className="tabs">{['Overview', 'Location', 'Amenities', 'Reviews'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'tab active' : 'tab'}>{tab}</button>)}</div>
          <p className="detail-description">{activeTab === 'Overview' ? 'Properties built for people to live in, including single-family homes, apartments, townhouses, and condominiums.' : `${activeTab} information for this beautiful villa in Whitefield, Bangalore.`}</p>
          <h3>Key Features</h3>
          <ul className="feature-list"><li><Check size={16} /> Spacious living & dining area</li><li><Check size={16} /> Modular kitchen</li><li><Check size={16} /> Private garden</li><li><Check size={16} /> High speed internet</li></ul>
        </div>
        <aside className="detail-aside">
          <div className="map-card"><div className="map-pin"><MapPin size={16} /></div><strong>Whitefield, Bangalore</strong></div>
          <div className="agent-card"><img className="agent-avatar" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="Riya Sharma" /><div><small>Listed by</small><strong>Riya Sharma</strong><span>Property Manager</span></div><a className="button button-outline button-small" href="mailto:hello@homenest.example">Contact</a></div>
        </aside>
      </section>
    </main>
  )
}

function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <main className="booking-page">
      <div className="booking-steps"><div className="booking-steps-content"><span className="step active"><b>1</b> Booking Details</span><i /><span className="step"><b>2</b> Payment</span><i /><span className="step"><b>3</b> Confirmation</span></div></div>
      {submitted ? <section className="booking-success"><span><Check size={30} /></span><h1>Details saved</h1><p>Your booking details are ready. Payment integration is needed to confirm this reservation.</p><Link to="/home" className="button button-primary">Back to Home</Link></section> : <div className="booking-layout">
        <div className="booking-form-column">
          <h1>Book Your Property</h1>
          <article className="booking-property-card"><img src="/assets/villa-booking.png" alt="3 BHK Villa" /><div><strong>3BHK Villa</strong><small><MapPin size={12} /> Whitefield, Bangalore</small><small><BedDouble size={12} /> 3 Beds <Bath size={12} /> 3 Baths <SquareCheck size={12} /> 2,400 sqft</small><b><IndianRupee size={16} /> 25,000 <small>/month</small></b></div></article>
          <h2>Select Booking Dates</h2>
          <div className="date-fields booking-date-fields"><label><span className="visually-hidden">Check-in Date</span><input aria-label="Check-in Date" type="date" /></label><label><span className="visually-hidden">Checkout Date</span><input aria-label="Checkout Date" type="date" /></label></div>
          <h2>Add Guest Details <small>(Optional)</small></h2>
          <div className="date-fields guest-fields"><label>Full Name<input /></label><label>Phone Number<input type="tel" /></label></div>
          <label className="requests-label">Special Requests<textarea rows="4" /></label>
        </div>
        <aside className="booking-summary"><section className="property-summary-card"><h2>Property Summary</h2><dl><div><dt>Property Type</dt><dd>Villa</dd></div><div><dt>Location</dt><dd>Whitefield, Bangalore</dd></div><div><dt>Available From</dt><dd>15 Oct 2025</dd></div><div><dt>Leave Duration</dt><dd>12 Months</dd></div><div><dt>Security Deposit</dt><dd>₹ 2,50,000</dd></div></dl></section><div className="amount-card"><h2>Total Amount</h2><dl><div><dt>Monthly Rent</dt><dd>₹ 25,000</dd></div><div><dt>Security Deposit</dt><dd>₹ 2,50,000</dd></div><div><dt>Service Fee</dt><dd>₹ 5,000</dd></div><div className="total-row"><dt>Total Payable</dt><dd>₹ 2,80,000</dd></div></dl><button className="button button-primary" onClick={() => setSubmitted(true)}>Proceed to Payment <ArrowRight size={15} /></button></div></aside>
      </div>}
    </main>
  )
}

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Upcoming')
  const bookings = {
    Upcoming: [
      { name: '3 BHK Villa', location: 'Whitefield, Bangalore', price: '25,000', beds: '3 Beds', baths: '3 Baths', area: '2,400 sqft', in: '15 Oct 2025', out: '15 Oct 2026', image: '/assets/booking-dashboard-villa.png' },
      { name: '2 BHK Apartment', location: 'Koramangala, Bangalore', price: '15,000', beds: '2 Beds', baths: '2 Baths', area: '1,200 sqft', in: '01 Nov 2025', out: '31 Oct 2026', image: '/assets/booking-dashboard-apartment.png' },
    ],
    'Past Bookings': [
      { name: '2 BHK Apartment', location: 'Indiranagar, Bangalore', price: '18,000', beds: '2 Beds', baths: '2 Baths', area: '1,250 sqft', in: '01 Oct 2024', out: '30 Sep 2025', image: '/assets/booking-dashboard-apartment.png' },
      { name: '3 BHK Villa', location: 'Whitefield, Bangalore', price: '24,000', beds: '3 Beds', baths: '3 Baths', area: '2,400 sqft', in: '01 Oct 2023', out: '30 Sep 2024', image: '/assets/booking-dashboard-villa.png' },
      { name: '2 BHK Apartment', location: 'Koramangala, Bangalore', price: '14,000', beds: '2 Beds', baths: '2 Baths', area: '1,200 sqft', in: '01 Oct 2022', out: '30 Sep 2023', image: '/assets/booking-dashboard-apartment.png' },
    ],
    Cancelled: [
      { name: '3 BHK Villa', location: 'Whitefield, Bangalore', price: '25,000', beds: '3 Beds', baths: '3 Baths', area: '2,400 sqft', in: '01 Dec 2025', out: '30 Nov 2026', image: '/assets/booking-dashboard-villa.png' },
    ],
  }
  const tabs = [
    { name: 'Upcoming', count: 2 },
    { name: 'Past Bookings', count: 3 },
    { name: 'Cancelled', count: 1 },
  ]
  return <main className="dashboard-layout"><aside className="dashboard-sidebar"><Link to="/" className="brand"><span className="brand-mark"><HomeIcon size={38} fill="currentColor" /></span><span className="brand-copy"><strong>Home Nest</strong><small>Find Your Perfect Space</small></span></Link><nav><Link to="/"><HomeIcon size={28} fill="currentColor" /> Dashboard</Link><a className="selected" href="#bookings"><CalendarDays size={29} /> My Bookings</a><a href="#favorites"><Heart size={29} /> Favorites</a><a href="#profile"><UserRound size={29} fill="currentColor" /> Profile</a><a href="#messages"><MessageCircle size={29} fill="currentColor" /> Messages</a><a href="#settings"><Settings size={29} fill="currentColor" /> Settings</a></nav></aside>
    <section className="dashboard-main"><header className="dashboard-header"><div><h1>My Bookings</h1><p>Track and manage your property bookings</p></div><div className="dashboard-user"><button className="icon-button" aria-label="Favorites"><Heart size={28} /></button><img src="/assets/dashboard-profile.png" alt="Profile" /></div></header>
      <div className="dashboard-tabs">{tabs.map((tab) => <button onClick={() => setActiveTab(tab.name)} className={activeTab === tab.name ? 'active' : ''} key={tab.name}>{tab.name} ({tab.count})</button>)}</div>
      <div className="booking-list">{bookings[activeTab].map((entry) => <article className="dashboard-booking-card" key={`${activeTab}-${entry.name}-${entry.in}`}><img src={entry.image} alt={entry.name} /><div className="dashboard-booking-content"><div className="dashboard-booking-title"><h2>{entry.name}</h2><span className={`status-confirmed${activeTab === 'Cancelled' ? ' status-cancelled' : ''}`}>{activeTab === 'Cancelled' ? 'Cancelled' : 'Confirmed'}</span><span className="dashboard-price">{entry.price}/month</span></div><p className="dashboard-location"><MapPin size={19} /> {entry.location}</p><div className="dashboard-facts"><span>{entry.beds}</span><span>{entry.baths}</span><span>{entry.area}</span></div><p className="booking-dates">Check-in {entry.in}<span>Check-out {entry.out}</span></p><div className="dashboard-card-actions"><Link to={`/properties/${entry.name.startsWith('3') ? 'villa' : 'apartment'}`} className="button button-outline button-small">View Details</Link><button className="button button-outline button-small" onClick={() => window.print()}><Download size={18} /> Download Agreement</button></div></div></article>)}</div>
    </section>
  </main>
}

function NotFound() {
  return <main className="not-found"><h1>Page not found</h1><p>We can’t find that page, but your next home might be just around the corner.</p><Link to="/home" className="button button-primary">Return home</Link></main>
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/properties/:id" element={<DetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
