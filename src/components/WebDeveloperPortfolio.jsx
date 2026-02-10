import React, { useState, useEffect, useRef } from "react";

export default function WebDeveloperPortfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isVisible, setIsVisible] = useState({
    'hero-text': true,
    'hero-card': true,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Update localStorage and document class
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.closest('section');
            const id = section?.id || entry.target.id || entry.target.getAttribute('data-section') || 'default';
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe all elements with data-animate attribute
    const observeElements = () => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        const section = el.closest('section');
        if (section && section.id) {
          el.setAttribute('data-section', section.id);
        }
        observerRef.current.observe(el);
      });
    };

    // Initial observation
    observeElements();

    // Also observe after a short delay to catch dynamically rendered elements
    const timeoutId = setTimeout(observeElements, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, []);

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-500 overflow-x-hidden relative">
      {/* Animated Background Graphics */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-40 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${-mousePosition.y * 0.4}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm dark:shadow-gray-900/50 sticky top-0 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              AY
            </div>
            <div>
              <h1 className="text-lg font-semibold dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Ayush Kumar</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Web Developer</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110 transition-all duration-300 shadow-sm"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href="mailto:ayushjhasahab07@gmail.com?subject=Let's%20Work%20Together&body=Hi%20Ayush,%0D%0AI%20want%20to%20discuss%20a%20project%20with%20you."
              className="hidden sm:inline-block px-4 py-2 rounded-xl border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-105 transition-all duration-300 font-medium"
            >
              Hire me
            </a>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white text-sm hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg font-medium">
              Download CV
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <section className="grid md:grid-cols-2 gap-10 items-center min-h-[80vh]">
          <div 
            data-animate
            id="hero-text"
            className={`transition-all duration-1000 ${isVisible['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-indigo-900/30 dark:to-pink-900/30 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Hi, I'm Ayush 👋</p>
            </div>
            <h2 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight dark:text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Building clean, fast and accessible web apps
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              I build full-stack web applications with a focus on frontend — React, Tailwind, and modern tooling. I love turning ideas into delightful UIs and shipping production-ready code.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a 
                href="#projects" 
                className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium overflow-hidden"
              >
                <span className="relative z-10">See projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:scale-105 transition-all duration-300 font-medium"
              >
                Let's talk
              </a>
            </div>

            <div className="mt-8 flex gap-4 items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <span className="text-lg">⚡</span>
                <span>Available for freelance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <span className="text-lg">📍</span>
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <span className="text-lg">✉️</span>
                <span>ayush@example.com</span>
              </div>
            </div>
          </div>

          <div 
            data-animate
            id="hero-card"
            className={`transition-all duration-1000 delay-300 ${isVisible['hero-card'] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold dark:text-white bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Project</h3>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                      🚀
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    A modern e-learning platform built with React, Express and PostgreSQL. Includes authentication, payments and analytics dashboard.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</p>
                      <p className="text-sm font-semibold mt-2 dark:text-white">Frontend Lead</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-100 dark:border-pink-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stack</p>
                      <p className="text-sm font-semibold mt-2 dark:text-white">React • Tailwind • Node</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <a className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 group" href="#">
                      Live demo
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 group" href="#">
                      Source
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section 
          id="about"
          className="mt-20 md:mt-32"
        >
          <div 
            data-animate
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">About</span>
              <h3 className="text-3xl md:text-4xl font-bold dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">About me</h3>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a Chemical Engineering student turned Web Developer. I enjoy crafting performant frontends and building end-to-end products. Currently learning more about Web3 and Solana development.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <span className="text-2xl">💼</span>
                </div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Experience</h4>
                <p className="font-semibold mt-2 dark:text-white text-lg">2+ years building web apps</p>
              </div>
              <div className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open-source</h4>
                <p className="font-semibold mt-2 dark:text-white text-lg">Contributor to student projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-sm dark:text-gray-300 mb-6">I'm open to freelancing and internships. Message me and let's build something cool.</p>
            <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <p className="font-semibold dark:text-white">ayush@example.com</p>
            </div>
            <div className="flex gap-3">
              {['GitHub', 'LinkedIn', 'Instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:scale-105 transition-all duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Projects */}
        <section 
          id="projects"
          className="mt-20 md:mt-32"
        >
          <div 
            data-animate
            className={`transition-all duration-1000 ${isVisible['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">Projects</span>
              <h3 className="text-3xl md:text-4xl font-bold dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Projects</h3>
            </div>
            <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 group">
              View all
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => {
              const gradients = [
                'from-indigo-500 via-purple-500 to-pink-500',
                'from-blue-500 via-cyan-500 to-teal-500',
                'from-purple-500 via-pink-500 to-red-500',
                'from-green-500 via-emerald-500 to-teal-500',
                'from-orange-500 via-red-500 to-pink-500',
                'from-indigo-500 via-blue-500 to-cyan-500',
              ];
              return (
                <article
                  key={i}
                  className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible['projects'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${gradients[i]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-lg drop-shadow-lg">Project {i + 1}</h4>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Short description of the project, the problem it solves and the tech used.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">React</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">Node</span>
                      </div>
                      <div className="flex gap-3">
                        <a className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group/link" href="#">
                          Demo
                          <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                        <a className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group/link" href="#">
                          Code
                          <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        </section>

        {/* Skills */}
        <section 
          id="skills"
          className="mt-20 md:mt-32"
        >
          <div 
            data-animate
            className={`grid md:grid-cols-2 gap-8 items-start transition-all duration-1000 ${isVisible['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">Skills</span>
            <h3 className="text-3xl md:text-4xl font-bold dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Skills</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Technologies I use to build fast and maintainable apps.</p>

            <div className="space-y-6">
              {[
                { name: "React", level: 90, color: "from-indigo-500 to-purple-500" },
                { name: "JavaScript", level: 88, color: "from-yellow-500 to-orange-500" },
                { name: "Tailwind CSS", level: 85, color: "from-cyan-500 to-blue-500" },
                { name: "Node.js", level: 75, color: "from-green-500 to-emerald-500" },
                { name: "Solana", level: 45, color: "from-purple-500 to-pink-500" },
              ].map((s, index) => (
                <div 
                  key={s.name}
                  className={`transition-all duration-1000 ${isVisible['skills'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold dark:text-white">{s.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{s.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${s.color} shadow-lg transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible['skills'] ? `${s.level}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-xl dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h4 className="text-xl font-bold dark:text-white mb-4">Tools & workflow</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Git • GitHub — Version control and PR-based workflow
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Vite • Webpack — Modern build tooling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Testing — Playwright / Jest
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                CI/CD — GitHub Actions
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/50">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Availability</h5>
              <div className="text-sm text-gray-600 dark:text-gray-400">Open for freelance (part-time) • Student-friendly rates              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Contact */}
        <section 
          id="contact"
          className="mt-20 md:mt-32"
        >
          <div 
            data-animate
            className={`transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">Contact</span>
            <h3 className="text-3xl md:text-4xl font-bold dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">Want to work together? Send a message — I'll reply within a few days.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <form className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 h-32 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent resize-none transition-all"
                  placeholder="Let's build..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
              >
                Send message
              </button>
            </form>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 space-y-6">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="text-xl font-bold dark:text-white mb-4">Other ways to reach me</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg">✉️</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">ayush@example.com</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg">📱</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">+91 90000 00000</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg">🐙</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">github.com/ayush</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Location</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>📍</span>
                  Agartala, India
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 mt-20 md:mt-32 py-12 text-center border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                AY
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Ayush Kumar</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Built with <span className="text-red-500">❤️</span> using React & Tailwind
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Privacy
              </a>
              <span className="text-gray-400">•</span>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

