import { LangProvider } from './context/LangContext'
import { BackgroundPaths } from './components/BackgroundPaths'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PortfolioSection from './components/PortfolioSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import AISection from './components/AISection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

function App() {
  return (
    <LangProvider>
    <div className="app">
      <BackgroundPaths />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <TestimonialsSection />
        <AISection />
        <FAQSection />
      </main>
      <Footer />
    </div>
    </LangProvider>
  )
}

export default App
