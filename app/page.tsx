'use client';

import Navbar from '@/components/NavbarLanding';
import Footer from '@/components/Footer';
import HeroSection from '@/layouts/Landing/Hero';
import FeaturesSection from '@/layouts/Landing/Features';
import AboutSection from '@/layouts/Landing/About';
import ContactSection from '@/layouts/Landing/Contact';

export default function HomePage() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
