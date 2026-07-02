/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Twitter, Youtube, Facebook, Terminal, ArrowUp, Lock } from 'lucide-react';
import { useBrandData } from '../hooks/useBrandData';
import logoImg from '../assets/images/zyphorexa_logo_1782990352956.jpg';

interface FooterProps {
  onPageChange: (pageId: string) => void;
  onAdminOpen?: () => void;
}

export default function Footer({ onPageChange, onAdminOpen }: FooterProps) {
  const { brand: brandConfig, contact: contactInfo } = useBrandData();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="zyphorexa-footer"
      className="relative z-10 mt-24 border-t border-white/5 bg-[#030712]/80 backdrop-blur-md pt-16 pb-12 overflow-hidden"
    >
      {/* Background glow flares */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#0072FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FF007A]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo, tagline and bio */}
          <div className="col-span-1 md:col-span-2">
            <div
              className="flex items-center gap-3 cursor-pointer mb-6"
              onClick={() => handleLinkClick('home')}
            >
              <div className="relative h-11 flex items-center justify-center transition-all duration-500 hover:scale-105">
                <img
                  src={logoImg}
                  alt="ZYPHOREXA Logo"
                  className="h-full w-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {contactInfo.bio}
            </p>
            {/* Slogan */}
            <div className="inline-block px-4 py-2 rounded-xl bg-white/3 border border-white/5 shadow-inner">
              <span className="text-xs font-mono font-medium text-gradient-flow">
                {contactInfo.slogan}
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm tracking-widest uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  Home / Represent
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('projects')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  My Project Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('privacy')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  Brand Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  Brand Contact Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media Links & Connectivity */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm tracking-widest uppercase mb-6">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={contactInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-xs text-gray-400">
              <p className="font-semibold text-gray-300 mb-1">Corporate Inquiries:</p>
              <a href={`mailto:${contactInfo.email}`} className="text-[#00F0FF] hover:underline">
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 font-mono text-center md:text-left flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} ZYPHOREXA. All Rights Reserved. Built under stewardship of</span>
            <span className="text-gray-300 font-semibold">{brandConfig.ownerName}</span>
            {onAdminOpen && (
              <button
                onClick={onAdminOpen}
                className="inline-flex items-center justify-center p-1 rounded bg-white/5 hover:bg-[#FF007A]/20 hover:text-white border border-white/10 hover:border-[#FF007A]/40 transition-all duration-300 cursor-pointer text-gray-500"
                title="Admin Control Center"
              >
                <Lock className="w-3 h-3 text-[#FF007A]" />
              </button>
            )}
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">
              {brandConfig.tagline}
            </span>
            <button
              onClick={handleScrollToTop}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/3 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
