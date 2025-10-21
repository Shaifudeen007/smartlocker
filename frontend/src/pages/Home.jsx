import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission here
    alert('Thank you for your message! We will get in touch with you soon.');
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-[#080b1a] text-white selection:bg-cyan-300/30">
      {/* Background gradient + glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.08),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(147,51,234,0.18),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b102b] via-[#14124d] to-[#1a0b2e] opacity-90" />
      </div>

      {/* Skip link for a11y */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-cyan-300 focus:text-black focus:px-3 focus:py-2 focus:rounded">Skip to content</a>

      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/20" aria-hidden />
            <div className="leading-tight">
              <p className="text-white font-bold tracking-wide">SmartLockers</p>
              <p className="text-xs text-white/60">Secure Storage Solutions</p>
            </div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#features">Features</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#pricing">Pricing</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#security">Security</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={handleLogin} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/95 text-black font-semibold px-4 py-2 shadow-[0_8px_24px_rgba(34,211,238,.35)] hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(34,211,238,.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Trusted by businesses worldwide
                </div>
                <h1 id="hero-heading" className="mt-5 text-3xl sm:text-5xl/tight font-extrabold text-center lg:text-left">
                  Revolutionize Storage with <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">SmartLockers</span>
                </h1>
                <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  SmartLockers delivers intelligent access control, real-time monitoring, and seamless management—
                  purpose‑built for <strong className="text-white">modern businesses</strong> and <strong className="text-white">enterprise facilities</strong>.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                  <button onClick={handleRegister} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/95 text-black font-semibold px-5 py-3 shadow-[0_8px_24px_rgba(34,211,238,.35)] hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(34,211,238,.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                    Start Free Trial
                  </button>
                  <button onClick={handleLogin} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-5 py-3 hover:border-cyan-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                    Explore Features
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start">
                  <span className="text-white/60 text-sm">Available 24/7</span>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live Monitoring</span>
                  </div>
                </div>
              </div>

              {/* Hero demo panel */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40 lg:ml-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Live Dashboard</p>
                    <p className="text-white font-semibold">Facility • Main Building</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" aria-hidden></span>
                    Real‑time
                  </span>
                </div>
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                    <h3 className="text-sm font-semibold text-white/90 text-center flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Locker Status
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Available Lockers</span>
                        <span className="font-semibold text-emerald-300">24</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">In Use</span>
                        <span className="font-semibold text-amber-300">12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Maintenance</span>
                        <span className="font-semibold text-rose-300">2</span>
                      </div>
                    </div>
                  </div>
                  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                    <h3 className="text-sm font-semibold text-white/90 text-center flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 text-fuchsia-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Usage Analytics
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Active Reservations</span>
                        <span className="font-semibold text-white">8</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Avg. Usage Time</span>
                        <span className="font-semibold text-white">3.2h</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-white/70">Peak Hours</span>
                        <span className="font-semibold text-amber-300">14:00-16:00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                          <svg className="h-4 w-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          System Status
                        </h3>
                        <p className="mt-1 text-sm text-white/80 max-w-xl">
                          All systems operational. Security monitoring active with 99.9% uptime. 
                          <span className="text-emerald-300"> Ready for new reservations.</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Optimal Performance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-1 text-center uppercase tracking-widest text-xs font-semibold text-cyan-300/80">
              Features
            </p>
            <h2 className="text-center text-2xl sm:text-4xl font-bold text-white leading-tight">
              Built for <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">Modern Facilities</span>
            </h2>
            <div className="mt-6 grid md:grid-cols-3 gap-5">
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Access Control
                </h3>
                <p className="mt-2 text-white/80 text-sm text-center">
                  Digital locks with real-time access logs. Multi-factor authentication and temporary access codes for enhanced security.
                </p>
              </div>
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 text-fuchsia-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Real-time Analytics
                </h3>
                <p className="mt-2 text-white/80 text-sm text-center">
                  Monitor usage patterns, occupancy rates, and facility performance with detailed analytics and reporting.
                </p>
              </div>
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Smart Reservations
                </h3>
                <p className="mt-2 text-white/80 text-sm text-center">
                  Easy booking system with automated reminders, extension options, and flexible scheduling for users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-1 text-center uppercase tracking-widest text-xs font-semibold text-cyan-300/80">
              Pricing
            </p>
            <h2 className="text-center text-2xl sm:text-4xl font-bold text-white leading-tight">
              Simple, Transparent <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">Pricing</span>
            </h2>
            <p className="mt-4 text-center text-white/80 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include core features with no hidden fees.
            </p>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur transition-all shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40 hover:scale-[1.02]">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Starter</h3>
                  <p className="mt-2 text-white/70 text-sm">Perfect for small businesses</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">$49</span>
                    <span className="text-white/70">/month</span>
                  </div>
                  <button onClick={handleRegister} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-4 py-3 hover:border-cyan-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-colors">
                    Start Free Trial
                  </button>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 50 lockers
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic access control
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time monitoring
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email support
                  </li>
                </ul>
              </div>

              {/* Professional Plan - Featured */}
              <div className="group rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-300/30 p-6 sm:p-8 backdrop-blur transition-all shadow-[0_10px_30px_rgba(34,211,238,.2)] hover:shadow-[0_12px_40px_rgba(34,211,238,.3)] hover:scale-[1.02] relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/95 text-black font-semibold px-3 py-1 text-xs">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Most Popular
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Professional</h3>
                  <p className="mt-2 text-white/70 text-sm">Ideal for growing facilities</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-white/70">/month</span>
                  </div>
                  <button onClick={handleRegister} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/95 text-black font-semibold px-4 py-3 shadow-[0_8px_24px_rgba(34,211,238,.35)] hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(34,211,238,.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-all">
                    Start Free Trial
                  </button>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 200 lockers
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced access control
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-factor authentication
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
              </div>

              {/* Enterprise Plan */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur transition-all shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-purple-300/40 hover:scale-[1.02]">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Enterprise</h3>
                  <p className="mt-2 text-white/70 text-sm">For large organizations</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">Custom</span>
                  </div>
                  <button onClick={handleRegister} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-4 py-3 hover:border-purple-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 transition-colors">
                    Contact Sales
                  </button>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited lockers
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enterprise-grade security
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/80">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 premium support
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                All plans include a 14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-1 text-center uppercase tracking-widest text-xs font-semibold text-cyan-300/80">
              Get Started
            </p>
            <h2 className="text-center text-2xl sm:text-4xl font-bold text-white leading-tight">
              Ready to <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">transform</span> your storage management?
            </h2>
            <div className="mt-6 group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/80 text-center sm:text-left">Start your free trial and experience SmartLockers in action with your facility.</p>
              <div className="flex gap-3">
                <button onClick={handleRegister} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/95 text-black font-semibold px-6 py-3 shadow-[0_8px_24px_rgba(34,211,238,.35)] hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(34,211,238,.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                  Start Free Trial
                </button>
                <button onClick={handleAdminLogin} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-6 py-3 hover:border-purple-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300">
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-1 text-center uppercase tracking-widest text-xs font-semibold text-cyan-300/80">
              Contact Us
            </p>
            <h2 className="text-center text-2xl sm:text-4xl font-bold text-white leading-tight">
              Get in <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">Touch</span>
            </h2>
            
            <div className="mt-8 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Company Information */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                <h3 className="text-xl font-bold text-white mb-6">POPKEY PRIVATE LIMITED</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-cyan-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-white/80 text-sm mt-1">
                        43, Appadurai 1st St,<br />
                        Ayanavaram,<br />
                        Chennai, Tamil Nadu 600023
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-cyan-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-white/80 text-sm mt-1">(+91) 7400 500 200</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-cyan-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-white/80 text-sm mt-1">contact@popkey.in</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-cyan-400/10 border border-cyan-300/20 rounded-xl">
                  <p className="text-cyan-200 text-sm text-center">
                    We will Get in Touch
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40">
                <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/95 text-black font-semibold px-6 py-3 shadow-[0_8px_24px_rgba(34,211,238,.35)] hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(34,211,238,.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-all"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" aria-hidden />
              <div>
                <p className="text-white font-bold">SmartLockers</p>
                <p className="text-white/70 text-sm">by POPKEY PRIVATE LIMITED</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <p>43, Appadurai 1st St</p>
                  <p>Ayanavaram, Chennai</p>
                  <p>Tamil Nadu 600023</p>
                  <p>Phone: (+91) 7400 500 200</p>
                  <p>Email: contact@popkey.in</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a className="text-white/70 hover:text-white transition-colors" href="#features">Features</a>
                  <a className="text-white/70 hover:text-white transition-colors" href="#pricing">Pricing</a>
                  <a className="text-white/70 hover:text-white transition-colors" href="#contact">Contact</a>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">Privacy Policy</a>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">Terms of Service</a>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} POPKEY PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a className="text-white/70 hover:text-white transition-colors" href="#">Privacy</a>
              <a className="text-white/70 hover:text-white transition-colors" href="#">Terms</a>
              <a className="text-white/70 hover:text-white transition-colors" href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;