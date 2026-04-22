import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import PaymentStatusBanner from './components/PaymentStatusBanner';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <PaymentStatusBanner />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
