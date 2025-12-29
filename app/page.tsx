'use client';

import LandingNavbar from '@/features/landing/components/LandingNavbar';
import LandingFooter from '@/features/landing/components/LandingFooter';
import HeroSection from '@/features/landing/components/Hero';
import FeaturesSection from '@/features/landing/components/Features';
import AboutSection from '@/features/landing/components/About';
import ContactSection from '@/features/landing/components/Contact';

export default function HomePage() {
    return (
        <div className="bg-background min-h-screen">
            <LandingNavbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <ContactSection />
            </main>
            <LandingFooter />
        </div>
    );
}
