/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoPlayer from './components/VideoPlayer';
import TechShowcase from './components/TechShowcase';
import ProjectGrid from './components/ProjectGrid';
import PrivacyAccordion from './components/PrivacyAccordion';
import ContactHub from './components/ContactHub';
import { useBrandData } from './hooks/useBrandData';
import AdminPortal from './components/AdminPortal';
import logoImg from './assets/images/zyphorexa_logo_1782990352956.jpg';

export default function App() {
  const { brand: brandConfig, videos: heroVideos } = useBrandData();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
  };

  // Render correct sub-view based on the state router
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div id="home-view" className="space-y-28">
            {/* 1. Hero Text Banner Section */}
            <section id="hero-banner-section" className="text-center pt-16 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 uppercase tracking-widest mb-8"
              >
                <Sparkles className="text-[#00F0FF] w-3.5 h-3.5 animate-pulse" />
                Next-Gen Corporate Portfolio
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                className="font-display font-bold text-4.5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-8"
              >
                ZYPHOREXA <br className="hidden sm:inline" />
                <span className="text-gradient-flow">DIGITAL ECOSYSTEMS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4"
              >
                An ultra-premium corporate technology brand crafting high-performance Android frameworks, 
                dynamic glassmorphism web software, and modular, cloud-native automation microservices.
              </motion.p>

              {/* Central Slogan badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <button
                  id="hero-explore-projects"
                  onClick={() => handlePageChange('projects')}
                  className="px-6 py-3 rounded-xl bg-[#0072FF] hover:bg-[#00F0FF] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-[#0072FF]/20 active:scale-95"
                >
                  Explore Catalog <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-contact-trigger"
                  onClick={() => handlePageChange('contact')}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                >
                  Initiate Inquiry
                </button>
              </motion.div>
            </section>

            {/* 2. Hero Video Showcase */}
            <section id="hero-videos-section" className="space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-3">
                  Hero Video Showcase
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Examine our production pipelines and interactive software modules running on active target frameworks.
                </p>
              </div>
              <VideoPlayer videos={heroVideos} />
            </section>

            {/* 3. Animated Technology Showcase */}
            <section id="animated-tech-section" className="space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-3">
                  Animated Technology Showcase
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Our system architecture loops through three core specializations in direct response to modern operational demands.
                </p>
              </div>
              <TechShowcase />
            </section>

            {/* 4. Brand Owner Section */}
            <section id="brand-owner-section" className="py-12">
              <div className="text-center max-w-xl mx-auto mb-10">
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-2">
                  Brand Owner
                </h2>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">
                  Principal Executive Officer
                </p>
              </div>

              {/* Floating Glassmorphic Owner Card */}
              <motion.div
                id="owner-card-sahid-gazi"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                animate={{
                  y: [0, -8, 0],
                }}
                // @ts-ignore
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
                className="relative max-w-md mx-auto rounded-2xl glass-panel p-[1.5px] border border-white/5 shadow-2xl hover:border-white/15 transition-all duration-300"
              >
                <div className="relative z-10 bg-[#030712]/90 rounded-2xl p-8 text-center flex flex-col items-center">
                  {/* Glowing Ring Silhouette around Owner Profile Emblem */}
                  <div className="relative w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-[#0072FF] to-[#FF007A] p-[2px] shadow-[0_0_25px_rgba(0,114,255,0.25)] overflow-hidden">
                    <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={logoImg}
                        alt="Sahid Gazi Brand Emblem"
                        className="w-full h-full object-contain rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Pulsating Ring Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0072FF] to-[#FF007A] rounded-full blur-md opacity-35 animate-pulse pointer-events-none" />
                  </div>

                  <h3 className="font-display font-bold text-2xl tracking-wider text-white mb-2">
                    {brandConfig.ownerName}
                  </h3>
                  <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-[0.2em] mb-4">
                    Founder • Lead Architect
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    Directing computational framework construction, native Android automation systems, and high-fidelity client design matrices under the corporate standard of ZYPHOREXA.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handlePageChange('contact')}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#0072FF] to-[#FF007A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    >
                      Connect Directly
                    </button>
                  </div>
                </div>

                {/* Ambient Soft Breathing Highlights */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#0072FF]/20 to-[#FF007A]/15 rounded-full blur-3xl opacity-30 pointer-events-none" />
              </motion.div>
            </section>
          </div>
        );

      case 'projects':
        return (
          <div id="projects-view" className="space-y-16">
            <section className="text-center pt-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0072FF]/10 border border-[#0072FF]/20 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-6">
                <Cpu className="w-3.5 h-3.5" /> Project Portfolio
              </div>
              <h1 className="font-display font-bold text-3.5xl sm:text-5xl text-white tracking-tight mb-4">
                My Project Catalogue
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed px-4">
                Discover the advanced digital solutions and native Android engines published under the ZYPHOREXA brand umbrella.
              </p>
            </section>
            <ProjectGrid />
          </div>
        );

      case 'privacy':
        return (
          <div id="privacy-view" className="space-y-16">
            <section className="text-center pt-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/10 border border-[#FF007A]/20 text-xs font-mono text-[#FF007A] uppercase tracking-widest mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> Governance
              </div>
              <h1 className="font-display font-bold text-3.5xl sm:text-5xl text-white tracking-tight mb-4">
                Brand Privacy Policy
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed px-4">
                Review the cryptographic standards, licensing declarations, and secure data pipelines guiding customer operations.
              </p>
            </section>
            <PrivacyAccordion />
          </div>
        );

      case 'contact':
        return (
          <div id="contact-view" className="space-y-16">
            <section className="text-center pt-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" /> Contact Portal
              </div>
              <h1 className="font-display font-bold text-3.5xl sm:text-5xl text-white tracking-tight mb-4">
                Brand Contact Hub
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed px-4">
                We are always available for high-end corporate partnerships, technical consultations, and digital system inquiries.
              </p>
            </section>
            <ContactHub />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="zyphorexa-app-shell" className="min-h-screen bg-[#02050e] text-white font-sans relative overflow-x-hidden selection:bg-[#0072FF]/30 selection:text-[#00F0FF]">
      {/* 1. Global Animated Ambient Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-blue pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[55%] h-[55%] rounded-full ambient-pink pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[15%] w-[45%] h-[45%] rounded-full bg-[#0072FF]/5 filter blur-[120px] pointer-events-none z-0" />

      {/* Decorative Top subtle light line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0072FF]/30 to-[#FF007A]/25 pointer-events-none z-40" />

      {/* 2. Fixed Corporate Navigation Header */}
      <Header currentPage={currentPage} onPageChange={handlePageChange} />

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Global Corporate Footer */}
      <Footer onPageChange={handlePageChange} onAdminOpen={() => setIsAdminOpen(true)} />

      {/* 5. Hidden Administrative Gate & Control Panel */}
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
