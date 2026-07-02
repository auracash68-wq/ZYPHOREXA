/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Globe, Smartphone, Download, ExternalLink, ShieldCheck, FolderOpen, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBrandData } from '../hooks/useBrandData';
import { ProjectItem } from '../types';

export default function ProjectGrid() {
  const { projects: projectItems } = useBrandData();
  const [activeCategory, setActiveCategory] = useState<'website' | 'android'>('website');

  // Filter projects by selected active category
  const filteredProjects = projectItems.filter(
    (project) => project.category === activeCategory
  );

  return (
    <div id="project-catalogue-root" className="w-full">
      {/* Premium Category Navigation Tabs */}
      <div className="flex justify-center mb-16 relative z-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/5 shadow-2xl relative">
          <button
            id="tab-website-projects"
            onClick={() => setActiveCategory('website')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-medium text-sm tracking-wide relative z-10 transition-colors duration-500 ${
              activeCategory === 'website' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            Website Projects
            {activeCategory === 'website' && (
              <motion.div
                layoutId="activeCategoryGlow"
                className="absolute inset-0 bg-gradient-to-r from-[#0072FF]/20 to-[#0072FF]/10 border border-[#0072FF]/30 rounded-xl -z-10 shadow-[0_0_20px_rgba(0,114,255,0.15)]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
          </button>

          <button
            id="tab-android-applications"
            onClick={() => setActiveCategory('android')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-medium text-sm tracking-wide relative z-10 transition-colors duration-500 ${
              activeCategory === 'android' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Android Applications
            {activeCategory === 'android' && (
              <motion.div
                layoutId="activeCategoryGlow"
                className="absolute inset-0 bg-gradient-to-r from-[#FF007A]/20 to-[#FF007A]/10 border border-[#FF007A]/30 rounded-xl -z-10 shadow-[0_0_20px_rgba(255,0,122,0.15)]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Grid Container with smooth height layout transition */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl glass-panel border border-dashed border-white/10"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-6">
                <FolderOpen className="w-8 h-8" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">No Projects Found</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                No projects are currently available in this category. Please check back soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { key?: string; project: ProjectItem; index: number }) {
  const isAndroid = project.category === 'android';
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefreshIframe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIframeKey((prev) => prev + 1);
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl glass-panel flex flex-col justify-between h-full border border-white/5 hover:border-white/10 transition-all duration-300 bg-slate-950/40"
    >
      {/* Background glow flair */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] opacity-10 pointer-events-none ${
        isAndroid ? 'bg-[#FF007A]' : 'bg-[#0072FF]'
      }`} />

      {/* Card Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        {isAndroid ? (
          // Android app shows standard graphic photo (using the custom URL)
          <>
            <img
              src={project.thumbnail}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              referrerPolicy="no-referrer"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
          </>
        ) : (
          // Website Category renders an interactive direct iframe live view!
          <div className="relative w-full h-full bg-[#030712]">
            <iframe
              key={iframeKey}
              src={project.websiteUrl && project.websiteUrl !== '#' ? project.websiteUrl : 'about:blank'}
              title={`Live Preview of ${project.name}`}
              className="w-full h-full border-0 rounded-t-xl select-none"
              sandbox="allow-scripts allow-same-origin allow-popups"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            
            {/* Glassmorphic interactive header inside the little viewport */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[9px] font-mono select-none">
              <span className="text-[#00F0FF] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                LIVE VIEW
              </span>
              <button
                onClick={handleRefreshIframe}
                className="text-gray-400 hover:text-white transition-colors active:rotate-180 duration-500"
                title="Reload Frame"
              >
                <RefreshCw className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Badges overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          {project.version && (
            <span className="text-[10px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-white/10 text-[#00F0FF]">
              {project.version}
            </span>
          )}

          {project.releaseStatus && (
            <span className={`text-[10px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-white/10 ${
              project.releaseStatus.toLowerCase().includes('stable') || project.releaseStatus.toLowerCase().includes('production')
                ? 'text-[#00FF87]'
                : 'text-[#FFD700]'
            }`}>
              {project.releaseStatus}
            </span>
          )}
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-3.5">
            {project.logoUrl ? (
              <img
                src={project.logoUrl}
                alt={`${project.name} logo`}
                className="w-8 h-8 rounded-lg object-contain bg-slate-900/80 p-0.5 border border-white/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 ${
                isAndroid ? 'bg-[#FF007A]/10 text-[#FF007A]' : 'bg-[#0072FF]/10 text-[#0072FF]'
              }`}>
                {isAndroid ? <Smartphone className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              </div>
            )}
            <h3 className="font-display font-semibold text-lg text-white group-hover:text-gradient-flow transition-colors leading-snug">
              {project.name}
            </h3>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Action Button Rails based on Project Category */}
        <div className="border-t border-white/5 pt-4 mt-auto">
          {isAndroid ? (
            <div className="grid grid-cols-2 gap-3" id={`action-buttons-${project.id}`}>
              {/* APK Download Button */}
              <a
                href={project.apkUrl && project.apkUrl !== '#' ? project.apkUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!project.apkUrl || project.apkUrl === '#') {
                    e.preventDefault();
                    alert('APK Link is not provided or currently being set up.');
                  }
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#9600FF] hover:from-[#FF007A]/90 hover:to-[#9600FF]/90 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 text-center"
              >
                <Download className="w-3.5 h-3.5" />
                APK Install
              </a>

              {/* Google Play Redirect Button */}
              <a
                href={project.playStoreUrl && project.playStoreUrl !== '#' ? project.playStoreUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!project.playStoreUrl || project.playStoreUrl === '#') {
                    e.preventDefault();
                    alert('Play Store Link is not provided or currently being set up.');
                  }
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/3 hover:bg-[#FF007A]/15 border border-white/10 hover:border-[#FF007A]/40 text-gray-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 text-center"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#FF007A]" />
                Play Store
              </a>
            </div>
          ) : (
            <div id={`action-buttons-${project.id}`}>
              {/* Website Launch Button - opens website fully in client's own browser */}
              <a
                href={project.websiteUrl && project.websiteUrl !== '#' ? project.websiteUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!project.websiteUrl || project.websiteUrl === '#') {
                    e.preventDefault();
                    alert('Website Link is not provided or currently being set up.');
                  }
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#0072FF] hover:bg-[#00F0FF] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#0072FF]/20 active:scale-95 text-center"
              >
                <Globe className="w-3.5 h-3.5" />
                Visit Website
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
