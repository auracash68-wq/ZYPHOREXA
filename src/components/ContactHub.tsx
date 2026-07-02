/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Copy, Check, ExternalLink, Award, Sparkles, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBrandData } from '../hooks/useBrandData';

export default function ContactHub() {
  const { contact: contactInfo } = useBrandData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div id="contact-hub-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto relative z-10">
      {/* Success Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {copiedEmail && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              className="px-4 py-3 bg-slate-900 border border-[#00F0FF]/30 text-white rounded-xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
            >
              <Check className="w-4 h-4 text-[#00FF87]" />
              <span className="text-xs font-mono">Email copied to clipboard!</span>
            </motion.div>
          )}

          {copiedPhone && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              className="px-4 py-3 bg-slate-900 border border-[#FF007A]/30 text-white rounded-xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
            >
              <Check className="w-4 h-4 text-[#FF007A]" />
              <span className="text-xs font-mono">Phone copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left Column: Bio, Slogan, Mission & Vision (7 cols on desktop) */}
      <div className="lg:col-span-7 space-y-10">
        <div id="contact-brand-headline">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-6 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" /> Corporate Identity
          </div>
          <h2 className="font-display font-bold text-3.5xl md:text-4.5xl text-white tracking-tight leading-tight mb-6">
            {contactInfo.headline}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
            {contactInfo.bio}
          </p>
        </div>

        {/* Brand Slogan */}
        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          // @ts-ignore
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative inline-block overflow-hidden rounded-2xl bg-gradient-to-tr from-[#0072FF]/10 to-[#FF007A]/10 p-[1.5px] border border-white/5 shadow-2xl"
        >
          <div className="bg-[#030712]/90 rounded-[15px] px-6 py-4 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF007A] animate-pulse" />
            <span className="font-display font-medium text-sm md:text-base tracking-widest text-gradient-flow uppercase">
              {contactInfo.slogan}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0072FF] to-[#FF007A] opacity-10 blur-md pointer-events-none" />
        </motion.div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Mission Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#0072FF]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#0072FF]/15 flex items-center justify-center text-[#00F0FF] mb-5">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-white font-display font-semibold text-base mb-3">Our Mission</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              {contactInfo.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#FF007A]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FF007A]/15 flex items-center justify-center text-[#FF007A] mb-5">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-white font-display font-semibold text-base mb-3">Our Vision</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              {contactInfo.vision}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Details Card & Action Deck (5 cols on desktop) */}
      <div className="lg:col-span-5">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
          {/* Backdrop Glow */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tr from-[#0072FF]/10 to-[#FF007A]/10 rounded-full blur-[60px] pointer-events-none" />

          <h3 className="text-white font-display font-semibold text-xl mb-6 pb-4 border-b border-white/5">
            Communication Portal
          </h3>

          {/* Details List */}
          <div className="space-y-6 mb-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0072FF]/10 border border-[#0072FF]/20 flex items-center justify-center text-[#00F0FF] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Phone</span>
                <a href={`tel:${contactInfo.phone}`} className="text-white font-mono text-sm font-medium hover:text-[#00F0FF] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF007A]/10 border border-[#FF007A]/20 flex items-center justify-center text-[#FF007A] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Email</span>
                <a href={`mailto:${contactInfo.email}`} className="text-white font-mono text-sm font-medium hover:text-[#FF007A] transition-colors break-all">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Corporate HQ</span>
                <span className="text-white font-sans text-sm font-medium">
                  {contactInfo.address}
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Operational Window</span>
                <span className="text-white font-sans text-sm font-medium">
                  {contactInfo.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Action Buttons Deck */}
          <div className="space-y-3.5">
            {/* Primary Action Button Bar */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0072FF] to-[#0052D4] hover:from-[#00F0FF] hover:to-[#0072FF] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF007A] hover:bg-[#FF007A]/85 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
            </div>

            {/* Clipboard Copy actions */}
            <button
              onClick={() => copyToClipboard(contactInfo.email, 'email')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-gray-300 hover:text-white hover:bg-white/8 transition-all duration-300 text-xs font-mono"
            >
              <span className="flex items-center gap-2.5">
                <Copy className="w-3.5 h-3.5 text-gray-500" /> Copy Email Address
              </span>
              <span className="text-[10px] text-gray-500">Ctrl+C</span>
            </button>

            <button
              onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-gray-300 hover:text-white hover:bg-white/8 transition-all duration-300 text-xs font-mono"
            >
              <span className="flex items-center gap-2.5">
                <Copy className="w-3.5 h-3.5 text-gray-500" /> Copy Phone Number
              </span>
              <span className="text-[10px] text-gray-500">Ctrl+C</span>
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/3 hover:bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Visit Repository <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
