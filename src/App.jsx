import { useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Check,
  CheckCircle2,
  Cloud,
  Copy,
  Headphones,
  Mail,
  MailWarning,
  Menu,
  Shield,
  UsersRound,
  MonitorCog,
  ShieldCheck,
  X,
} from 'lucide-react'
import './App.css'

const features = [
  {
    title: 'Fast response',
    description: 'Get timely help when your team needs IT support.',
    icon: Headphones,
    visual: 'response-visual',
    label: 'Support that keeps you moving',
    image: '/assets/it-fast-support.jpg',
  },
  {
    title: 'Secure systems',
    description: 'Keep your devices, data, and people better protected.',
    icon: ShieldCheck,
    visual: 'security-visual',
    label: 'Your security, always on',
    image: '/assets/it-cybersecurity.jpg',
  },
  {
    title: 'Cloud ready',
    description: 'Work securely and flexibly from any location.',
    icon: Cloud,
    visual: 'cloud-visual',
    label: 'Work from anywhere',
    image: '/assets/it-cloud.jpg',
  },
  {
    title: 'Expert guidance',
    description: 'Make confident technology decisions with clear advice.',
    icon: MonitorCog,
    visual: 'guidance-visual',
    label: 'A clear plan for what is next',
    image: '/assets/it-consulting.jpg',
  },
  {
    title: 'Proactive monitoring',
    description: 'Identify potential issues before they disrupt your work.',
    icon: Activity,
    visual: 'monitoring-visual',
    label: 'Your systems are looking healthy',
    image: '/assets/it-monitoring.jpg',
  },
]

const steps = [
  {
    title: 'Listen',
    description: 'We learn about your business and technology needs.',
  },
  {
    title: 'Improve',
    description: 'We recommend practical solutions that make a difference.',
  },
  {
    title: 'Support',
    description: 'We stay available to help your team move forward.',
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Stackly IT home" onClick={closeMenu}>
        <Brand />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <Link className={pathname === '/' ? 'active' : ''} to="/" onClick={closeMenu}>Home</Link>
        <Link className={pathname === '/services' ? 'active' : ''} to="/services" onClick={closeMenu}>Services</Link>
        <Link className={pathname === '/about' ? 'active' : ''} to="/about" onClick={closeMenu}>About Us</Link>
        <Link className={pathname === '/enquiry' ? 'active' : ''} to="/enquiry" onClick={closeMenu}>Enquiry</Link>
      </nav>
    </header>
  )
}

function Brand({ footer = false }) {
  return (
    <>
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <path d="M27.8 11.5H17.2a5.7 5.7 0 0 0 0 11.4h5.6a5.7 5.7 0 0 1 0 11.4H11.8" />
          <path d="M12.2 5.7v5.8h5.8M27.8 34.3v-5.8H22" />
        </svg>
      </span>
      <span className={footer ? 'brand-name footer-brand-name' : 'brand-name'}>
        STACKLY <span>IT</span>
        {footer && <small>TECHNOLOGY SOLUTIONS</small>}
      </span>
    </>
  )
}

function SupportOverview() {
  return (
    <div className="overview-card" aria-label="Example support activity overview">
      <div className="overview-heading">
        <span className="overview-icon"><Activity size={17} /></span>
        <span>Support activity overview</span>
        <span className="live-dot" aria-label="Live sample data" />
      </div>
      <div className="overview-summary">
        <strong>16</strong>
        <span>Requests resolved<br />this week</span>
      </div>
      <div className="chart" aria-hidden="true">
        {[34, 55, 78, 64, 82].map((height, index) => (
          <div className="chart-column" key={height}>
            <i style={{ '--bar-height': `${height}%` }} />
            <span>{['JAN', 'FEB', 'MAR', 'APR', 'MAY'][index]}</span>
          </div>
        ))}
      </div>
      <span className="overview-caption"><span /> Sample activity</span>
    </div>
  )
}

function FeatureVisual({ feature }) {
  return (
    <div className={`feature-visual ${feature.visual}`}>
      <img src={feature.image} alt={feature.label} loading="lazy" />
      <span className="feature-image-caption">{feature.label}</span>
    </div>
  )
}

function HomePage() {
  const [submitted, setSubmitted] = useState(false)

  function handleEnquiry(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <main>
        <section className="hero page-width" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Dependable IT for growing teams</p>
            <h1>Technology support<br />that keeps work<br className="desktop-break" /> moving.</h1>
            <p className="hero-description">
              STACKLY IT helps businesses reduce disruption, protect essential systems,
              and give teams the support they need every day.
            </p>
            <div className="hero-actions">
              <Link className="button button-blue hero-button" to="/services">
                Explore our services <ArrowRight size={17} />
              </Link>
              <Link className="button button-green hero-enquiry-button" to="/enquiry">
                Start an enquiry <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <SupportOverview />
          </div>
        </section>

        <section className="features-section page-width" id="services">
          <div className="section-kicker">Our key features</div>
          <div className="features-list">
            {features.map((feature, index) => (
              <article className={`feature-row${index % 2 ? ' feature-row-reverse' : ''}`} key={feature.title}>
                <FeatureVisual feature={feature} />
                <div className="feature-copy">
                  <span className="feature-number">0{index + 1}</span>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                  <Link to="/enquiry" aria-label={`Enquire about ${feature.title}`}>
                    Learn more <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="information-section page-width" id="about">
          <div className="information-intro">
            <p className="eyebrow">A partner you can count on</p>
            <h2>Our information</h2>
            <p>
              We take time to understand your business, recommend practical solutions,
              and provide dependable support that helps your team work with confidence.
            </p>
          </div>
          <div className="information-layout">
            <img src="/assets/it-about-team.jpg" alt="Technology support team working together" loading="lazy" />
            <div className="information-grid">
              <article className="information-card information-card-featured">
                <span className="information-number">1</span>
                <div><h3>Keep systems reliable</h3><p>Proactive support helps your technology run smoothly every day.</p></div>
              </article>
              <article className="information-card">
                <span className="information-number">2</span>
                <div><h3>Protect business data</h3><p>Practical security measures help safeguard your systems and information.</p></div>
              </article>
              <article className="information-card">
                <span className="information-number">3</span>
                <div><h3>Plan with confidence</h3><p>Clear advice helps you make better decisions as your business grows.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="process-section page-width">
          <div className="process-heading">
            <p className="eyebrow">How we work</p>
            <h2>Simple support,<br />clear progress.</h2>
          </div>
          {steps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </section>

        <section className="enquiry-section page-width" id="enquiry">
          <div className="enquiry-copy">
            <p className="eyebrow">Let's get started</p>
            <h2>Need IT support<br />that works for you?</h2>
            <p>Let’s find the right IT support for your business.</p>
            <Link className="button button-outline" to="/enquiry">
              Start an enquiry <ArrowRight size={16} />
            </Link>
          </div>
          <form className="enquiry-form" onSubmit={handleEnquiry}>
            <h3>Tell us what you need</h3>
            <label>
              Your name
              <input name="name" autoComplete="name" placeholder="Enter your name" required />
            </label>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" placeholder="Enter your email" required />
            </label>
            <label>
              How can we help?
              <textarea name="message" rows="3" placeholder="Tell us a little about your IT needs" required />
            </label>
            <button className="button button-green" type="submit">
              Start an enquiry <ArrowRight size={16} />
            </button>
            {submitted && (
              <p className="form-message" role="status">
                Thanks for reaching out. This demo form is ready to connect to your inbox.
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  )
}

const serviceDetails = [
  {
    title: 'Managed IT Services',
    description: 'Proactive support and management to keep your systems running smoothly.',
    includes: ['24/7 monitoring', 'Helpdesk support'],
    bestFor: 'Businesses seeking reliable day-to-day IT support.',
    delivery: 'Ongoing managed service with flexible plans.',
    icon: MonitorCog,
    image: '/assets/it-fast-support.jpg',
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your people, data and reputation.',
    includes: ['Threat detection', 'Vulnerability review'],
    bestFor: 'Organisations that need stronger security and compliance.',
    delivery: 'Tailored solutions with expert setup and monitoring.',
    icon: Shield,
    image: '/assets/it-cybersecurity.jpg',
  },
  {
    title: 'Cloud Solutions',
    description: 'Modern, scalable cloud services to enable growth.',
    includes: ['Cloud migration', 'Infrastructure management'],
    bestFor: 'Businesses looking to improve agility and reduce costs.',
    delivery: 'Project-based or managed service, depending on your needs.',
    icon: Cloud,
    image: '/assets/it-cloud.jpg',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic advice to help you make the right technology decisions.',
    includes: ['IT strategy and planning', 'Technology assessments'],
    bestFor: 'Organisations planning growth or change.',
    delivery: 'Consultative projects with clear outcomes and recommendations.',
    icon: UsersRound,
    image: '/assets/it-consulting.jpg',
  },
]

function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0)

  return (
    <main className="interior-page services-page page-width">
      <PageTitle>Our Services</PageTitle>
      <div className="services-layout">
        <nav className="services-sidebar" aria-label="Services">
          {serviceDetails.map((service, index) => (
            <button
              className={selectedService === index ? 'selected' : ''}
              key={service.title}
              type="button"
              onClick={() => {
                setSelectedService(index)
                document.getElementById(`service-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              {service.title}<ArrowRight size={15} />
            </button>
          ))}
        </nav>
        <div className="service-cards">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon
            return (
              <article className="service-card" id={`service-${index}`} key={service.title}>
                <img className="service-card-image" src={service.image} alt="" loading="lazy" />
                <div className="service-card-heading">
                  <Icon size={25} strokeWidth={2} />
                  <div><h2>{service.title}</h2><p>{service.description}</p></div>
                </div>
                <div className="service-card-details">
                  <div><h3>What it includes</h3>{service.includes.map((item) => <p key={item}>• {item}</p>)}</div>
                  <div><h3>Best for</h3><p>{service.bestFor}</p></div>
                  <div><h3>Delivery style</h3><p>{service.delivery}</p></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function AboutPage() {
  const achievements = [
    ['10+', 'Years of combined IT experience'],
    ['500+', 'Support requests successfully handled'],
    ['98%', 'Client satisfaction focus'],
    ['24/7', 'Monitoring and support availability'],
    ['50+', 'Businesses supported with IT solutions'],
  ]

  return (
    <main className="interior-page about-page page-width">
      <PageTitle>About Us</PageTitle>
      <div className="about-stories">
        <section className="about-story">
          <img src="/assets/it-about-team.jpg" alt="IT team sharing ideas and planning technology support" loading="lazy" />
          <div className="about-copy">
            <h2>Our Vision</h2>
            <p>
              Our vision is to make technology simple, secure, and reliable for growing business.
              We want every team to work with confidence, reduce everyday IT challenges, and use
              the right digital tools to stay connected, protect important information, improve
              productivity, and build a stronger, more successful future.
              <br />We strive to be a technology partner businesses can depend on at every stage.
            </p>
          </div>
        </section>
        <section className="about-story about-story-reverse">
          <img src="/assets/it-consulting.jpg" alt="Technology consultant working through a business plan" loading="lazy" />
          <div className="about-copy mission-copy">
            <h2>Our Mission</h2>
            <p>
              Our mission is to understand each client’s unique needs and provide practical IT support,
              strong cybersecurity, flexible cloud solutions, and clear technology advice. Through
              responsive service, honest communication, and long-term partnership, we help businesses
              keep their systems running smoothly, protect their people and data, and grow with confidence.
              <br />Our focus is always on delivering real value through dependable technology services.
            </p>
          </div>
        </section>
      </div>
      <section className="achievements-section">
        <h2>Our Achievements</h2>
        <div className="achievements-grid">
          {achievements.map(([number, caption], index) => (
            <article className={index === 4 ? 'achievement-card achievement-featured' : 'achievement-card'} key={number}>
              <strong>{number}</strong><span>{caption}</span>
            </article>
          ))}
        </div>
      </section>
      <div className="about-cta">
        <p>Built on trust, strengthened by practical technology.</p>
        <Link className="button button-green" to="/enquiry">Start journey with us <ArrowRight size={16} /></Link>
      </div>
    </main>
  )
}

function EnquiryPage() {
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()
  const serviceNames = ['Managed IT', 'Cybersecurity', 'Cloud', 'IT Consulting']

  function handleSubmit(event) {
    event.preventDefault()
    const enquiryNumber = `NX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    navigate('/enquiry/confirmation', { state: { enquiryNumber } })
  }

  return (
    <main className="interior-page enquiry-page page-width">
      <PageTitle>Enquiry</PageTitle>
      <div className="enquiry-tabs" role="tablist" aria-label="Choose a service">
        {serviceNames.map((name, index) => (
          <button
            aria-selected={activeService === index}
            className={activeService === index ? 'active' : ''}
            key={name}
            onClick={() => setActiveService(index)}
            role="tab"
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
      <form className="enquiry-page-form" onSubmit={handleSubmit}>
        <h2>Enquiry</h2>
        <div className="enquiry-fields">
          <label>Full Name<input name="name" autoComplete="name" placeholder="Enter Your Full Name" required /></label>
          <label>Work email<input name="email" type="email" autoComplete="email" placeholder="Your@company.com" required /></label>
          <label>Company Name<input name="company" autoComplete="organization" placeholder="Enter Your Company Name" /></label>
          <label>Phone Number<input name="phone" type="tel" autoComplete="tel" placeholder="e.g. +1 234 567 8900" /></label>
          <label className="requirements-field">Tell us about requirements<textarea name="requirements" rows="4" placeholder="Please share your requirements, current challenges or any specific information" required /></label>
        </div>
        <button className="button submit-enquiry" type="submit">Submit enquiry</button>
        <p className="privacy-note">We only use your details to respond to this enquiry</p>
      </form>
      <p className="reply-promise"><Mail size={20} /> Our team will reply within 1 business day.</p>
      <section className="next-steps">
        <h2>What happens next?</h2>
        <div className="next-steps-grid">
          {[
            ['We review your enquiry.', 'Our team will look at your requirements and any relevant details.'],
            ['We get in touch.', 'We’ll contact you within 1 business day to discuss your needs.'],
            ['We recommend next steps.', 'We’ll suggest the right solution and outline the next steps.'],
          ].map(([title, description], index) => (
            <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
    </main>
  )
}

function EnquiryConfirmationPage() {
  const { state } = useLocation()
  const [copyStatus, setCopyStatus] = useState('')
  const enquiryNumber = state?.enquiryNumber || `NX-${new Date().getFullYear()}-0000`

  async function copyEnquiryNumber() {
    try {
      await navigator.clipboard.writeText(enquiryNumber)
      setCopyStatus('Enquiry number copied.')
    } catch {
      setCopyStatus('Could not copy the enquiry number. Please copy it manually.')
    }
  }

  return (
    <main className="interior-page confirmation-page page-width">
      <section className="confirmation-intro">
        <span className="confirmation-mark"><CheckCircle2 size={48} fill="currentColor" strokeWidth={2.2} /><Check className="confirmation-tick" size={27} strokeWidth={3} /></span>
        <h1>Your enquiry has been submitted</h1>
        <p>Thank you for getting in touch with STACKLY IT. We have received your enquiry<br className="confirmation-break" /> and our team will be in contact with you shortly.</p>
        <div className="enquiry-number">
          <span>Your enquiry number</span>
          <div><strong>{enquiryNumber}</strong><button type="button" onClick={copyEnquiryNumber} aria-label="Copy enquiry number"><Copy size={15} fill="currentColor" /></button></div>
          {copyStatus && <small role="status">{copyStatus}</small>}
        </div>
      </section>
      <section className="confirmation-next">
        <h2>What happens next?</h2>
        <div className="confirmation-current">
          <h3>We review your enquiry</h3>
          <p>Our team will review the details you have provided.</p>
        </div>
        <div className="next-steps-grid">
          {[
            ['We review your enquiry.', 'Our team will review the details you have provided.'],
            ['We get in touch.', 'We will contact you using your preferred method.'],
            ['Next steps.', 'We will discuss your requirements and advise on the next steps.'],
          ].map(([title, description], index) => (
            <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
      <aside className="contact-expectation">
        <MailWarning size={21} />
        <div><strong>When to expect contact</strong><p>You can expect to hear from us within 1–2 business days.</p></div>
      </aside>
    </main>
  )
}

function PageTitle({ children }) {
  return <h1 className="page-title">{children}</h1>
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main page-width">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/" aria-label="Stackly IT home">
            <Brand footer />
          </Link>
          <div className="social-links" aria-label="Social links">
            <a href="#contact" aria-label="X">𝕏</a>
            <a href="#contact" aria-label="Instagram">◎</a>
            <a href="#contact" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <div className="footer-links">
          <h2>Quick links</h2>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/enquiry">Enquiry</Link>
          <Link to="/enquiry">Contact Us</Link>
        </div>
        <form className="footer-newsletter" onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}>
          <label htmlFor="newsletter-email">Your email address</label>
          <input id="newsletter-email" name="email" type="email" placeholder="Enter Your Email" required />
          <button className="button newsletter-button" type="submit">{subscribed ? 'Subscribed' : 'Subscribe'}</button>
          {subscribed && <span className="newsletter-message" role="status">Thanks for subscribing.</span>}
        </form>
      </div>
      <div className="footer-bottom page-width">
        <span>© 2026 STACKLY IT. All rights reserved.</span>
        <div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#cookies">Cookies</a></div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/enquiry/confirmation" element={<EnquiryConfirmationPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}
