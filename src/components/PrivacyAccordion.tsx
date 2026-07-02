/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, ShieldCheck, ShoppingBag, Coins, Scale, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBrandData } from '../hooks/useBrandData';

export default function PrivacyAccordion() {
  const { policies: privacyPolicies } = useBrandData();
  const [activeTab, setActiveTab] = useState<string>('marketplace-policy');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Collect all titles across policies to keep first section expanded
    return {};
  });

  const activeCategory = privacyPolicies.find((p) => p.id === activeTab);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div id="privacy-policy-hub" className="w-full max-w-4xl mx-auto relative z-10">
      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
        {privacyPolicies.map((category) => {
          const isActive = activeTab === category.id;
          const isSelling = category.id === 'selling-policy';
          return (
            <button
              key={category.id}
              id={`policy-tab-${category.id}`}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-display font-medium text-sm tracking-wide border transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? isSelling
                    ? 'bg-[#FF007A]/10 border-[#FF007A]/40 text-white shadow-[0_0_20px_rgba(255,0,122,0.15)]'
                    : 'bg-[#0072FF]/10 border-[#0072FF]/40 text-white shadow-[0_0_20px_rgba(0,114,255,0.15)]'
                  : 'bg-slate-950/40 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isActive
                  ? isSelling ? 'bg-[#FF007A]/20' : 'bg-[#0072FF]/20'
                  : 'bg-white/5'
              }`}>
                {category.id === 'marketplace-policy' ? (
                  <ShoppingBag className="w-4 h-4" />
                ) : (
                  <Coins className="w-4 h-4" />
                )}
              </div>
              <div className="text-left">
                <span className="block font-semibold">{category.title}</span>
                <span className="block text-[10px] text-gray-500 font-mono">
                  {category.id === 'marketplace-policy' ? 'Store & Account Policy' : 'Digital Commerce Policy'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Accordion list */}
      <div className="glass-panel rounded-2xl p-6 md:p-10 border border-white/5 relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className={`absolute top-0 right-0 w-48 h-48 rounded-full filter blur-[80px] opacity-10 pointer-events-none ${
          activeTab === 'selling-policy' ? 'bg-[#FF007A]' : 'bg-[#0072FF]'
        }`} />

        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00F0FF]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-display font-semibold text-lg">
              {activeCategory?.title}
            </h3>
            <p className="text-xs text-gray-400">
              Official legal declarations governing the {activeTab === 'marketplace-policy' ? 'marketplace engine' : 'digital distribution system'}.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {activeCategory?.sections.map((section, idx) => {
              const isExpanded = !!expandedSections[section.title];
              return (
                <div
                  key={section.title}
                  id={`accordion-section-${idx}`}
                  className={`border rounded-xl transition-all duration-300 ${
                    isExpanded
                      ? activeTab === 'selling-policy'
                        ? 'bg-gradient-to-r from-[#FF007A]/5 to-transparent border-[#FF007A]/30'
                        : 'bg-gradient-to-r from-[#0072FF]/5 to-transparent border-[#0072FF]/30'
                      : 'bg-white/2 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left text-white"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className={`w-4 h-4 ${
                        isExpanded
                          ? activeTab === 'selling-policy' ? 'text-[#FF007A]' : 'text-[#00F0FF]'
                          : 'text-gray-500'
                      }`} />
                      <span className="font-display font-medium text-sm md:text-base">
                        {section.title}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-white' : ''
                    }`} />
                  </button>

                  {/* Expandable Content Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust disclaimer */}
      <div className="text-center mt-8 text-xs text-gray-500 flex items-center justify-center gap-2 font-mono">
        <Scale className="w-3.5 h-3.5" />
        All policy terms comply with standard data governance directives. Updated July 2026.
      </div>
    </div>
  );
}
