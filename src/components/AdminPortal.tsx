/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBrandData } from '../hooks/useBrandData';
import { X, Lock, Key, CheckCircle, Save, Video, Globe, Smartphone, Phone, FileText, Plus, Trash2, HelpCircle } from 'lucide-react';
import { VideoItem, ProjectItem, PrivacyPolicyCategory, ContactInfo } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const {
    brand,
    videos,
    projects,
    policies,
    contact,
    updateBrand,
    updateVideos,
    updateProjects,
    updatePolicies,
    updateContact
  } = useBrandData();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'videos' | 'projects' | 'contact' | 'policies'>('videos');
  const [successMsg, setSuccessMsg] = useState('');

  // Editable lists (local state copies)
  const [localVideos, setLocalVideos] = useState<VideoItem[]>(() => [...videos]);
  const [localProjects, setLocalProjects] = useState<ProjectItem[]>(() => [...projects]);
  const [localContact, setLocalContact] = useState<ContactInfo>(() => ({ ...contact }));
  const [localPolicies, setLocalPolicies] = useState<PrivacyPolicyCategory[]>(() => JSON.parse(JSON.stringify(policies)));

  // Form states for adding new elements
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    name: '',
    description: '',
    category: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    logoUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=200',
    version: 'v1.0.0',
    releaseStatus: 'Stable',
    websiteUrl: '',
    apkUrl: '',
    playStoreUrl: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sahid') {
      setIsAuthenticated(true);
      setAuthError('');
      // Sync local state copies
      setLocalVideos([...videos]);
      setLocalProjects([...projects]);
      setLocalContact({ ...contact });
      setLocalPolicies(JSON.parse(JSON.stringify(policies)));
    } else {
      setAuthError('ভুল পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Video managers
  const handleVideoChange = (index: number, field: keyof VideoItem, value: string) => {
    const updated = [...localVideos];
    updated[index] = { ...updated[index], [field]: value };
    setLocalVideos(updated);
  };

  const handleSaveVideos = () => {
    updateVideos(localVideos);
    triggerSuccess('হোমপেজ ভিডিওগুলো সফলভাবে সেভ করা হয়েছে!');
  };

  // Projects managers
  const handleProjectFieldChange = (projectId: string, field: keyof ProjectItem, value: any) => {
    const updated = localProjects.map((p) => {
      if (p.id === projectId) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setLocalProjects(updated);
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('অনুগ্রহ করে প্রজেক্টের নাম ও বিবরণ প্রদান করুন।');
      return;
    }
    const id = `proj-${newProject.category}-${Date.now()}`;
    const itemToAdd: ProjectItem = {
      id,
      name: newProject.name,
      description: newProject.description,
      category: newProject.category as 'website' | 'android',
      thumbnail: newProject.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
      logoUrl: newProject.logoUrl,
      version: newProject.version || 'v1.0.0',
      releaseStatus: newProject.releaseStatus || 'Stable',
      websiteUrl: newProject.websiteUrl,
      apkUrl: newProject.apkUrl,
      playStoreUrl: newProject.playStoreUrl
    };

    const updated = [...localProjects, itemToAdd];
    setLocalProjects(updated);
    updateProjects(updated);

    // Reset Form
    setNewProject({
      name: '',
      description: '',
      category: 'website',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
      logoUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=200',
      version: 'v1.0.0',
      releaseStatus: 'Stable',
      websiteUrl: '',
      apkUrl: '',
      playStoreUrl: ''
    });

    triggerSuccess('নতুন প্রজেক্ট ক্যাটাগরিতে যোগ করা হয়েছে!');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('আপনি কি এই প্রজেক্টটি ডিলিট করতে চান?')) {
      const updated = localProjects.filter((p) => p.id !== id);
      setLocalProjects(updated);
      updateProjects(updated);
      triggerSuccess('প্রজেক্টটি সফলভাবে ডিলিট করা হয়েছে!');
    }
  };

  const handleSaveProjects = () => {
    updateProjects(localProjects);
    triggerSuccess('প্রজেক্ট গ্যালারি সফলভাবে সেভ করা হয়েছে!');
  };

  // Contact manager
  const handleContactChange = (field: keyof ContactInfo, value: any) => {
    setLocalContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveContact = () => {
    updateContact(localContact);
    triggerSuccess('যোগাযোগের তথ্য ও স্লোগান সফলভাবে সেভ করা হয়েছে!');
  };

  // Policies managers
  const handlePolicySectionChange = (categoryIndex: number, sectionIndex: number, field: 'title' | 'content', value: string) => {
    const updated = JSON.parse(JSON.stringify(localPolicies));
    updated[categoryIndex].sections[sectionIndex][field] = value;
    setLocalPolicies(updated);
  };

  const handleSavePolicies = () => {
    updatePolicies(localPolicies);
    triggerSuccess('প্রাইভেসি পলিসি ধারাগুলো সফলভাবে আপডেট করা হয়েছে!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-6 text-white font-sans">
      
      {/* Background glass glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF007A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0072FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-5xl bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        
        {/* Header bar of admin console */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#FF007A]" />
            <h2 className="font-display font-bold text-lg tracking-wider uppercase text-white">
              ZYPHOREXA Control Center (হাইডেন এডমিন প্যানেল)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Login Security Gate */}
        {!isAuthenticated ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF007A] to-[#0072FF] p-[1.5px] flex items-center justify-center mb-6 shadow-lg shadow-pink-900/20">
              <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h3 className="font-display font-bold text-2xl tracking-wider text-white mb-2">
              High-Security Access Required
            </h3>
            <p className="text-gray-400 text-xs mb-8">
              এই কন্ট্রোল প্যানেলে অ্যাক্সেস করার জন্য আপনার সিকিউরিটি পাসওয়ার্ডটি প্রবেশ করান।
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  required
                  className="w-full px-5 py-3.5 bg-slate-950/60 border border-white/10 rounded-xl font-mono text-center tracking-widest text-white focus:outline-none focus:border-[#FF007A] transition-all"
                />
              </div>

              {authError && (
                <p className="text-red-500 font-mono text-xs">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#0072FF] hover:from-[#FF007A]/90 hover:to-[#0072FF]/90 font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-98"
              >
                Authenticate Access
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Portal Interface */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            
            {/* Left rail navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/30 flex flex-row md:flex-col gap-1 p-3 overflow-x-auto md:overflow-x-visible">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors whitespace-nowrap md:w-full ${
                  activeTab === 'videos' ? 'bg-[#FF007A]/10 text-[#FF007A] border border-[#FF007A]/20' : 'text-gray-400 hover:text-white hover:bg-white/3 border border-transparent'
                }`}
              >
                <Video className="w-4 h-4" />
                Hero Videos (ভিডিও)
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors whitespace-nowrap md:w-full ${
                  activeTab === 'projects' ? 'bg-[#0072FF]/10 text-[#0072FF] border border-[#0072FF]/20' : 'text-gray-400 hover:text-white hover:bg-white/3 border border-transparent'
                }`}
              >
                <Globe className="w-4 h-4" />
                Projects (প্রজেক্ট ও অ্যাপ)
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors whitespace-nowrap md:w-full ${
                  activeTab === 'contact' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/3 border border-transparent'
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact Info (যোগাযোগ)
              </button>

              <button
                onClick={() => setActiveTab('policies')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors whitespace-nowrap md:w-full ${
                  activeTab === 'policies' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:text-white hover:bg-white/3 border border-transparent'
                }`}
              >
                <FileText className="w-4 h-4" />
                Privacy Policy (পলিসি)
              </button>
            </div>

            {/* Right side editable viewport container */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-900/40">
              
              {/* Success Banner Alert */}
              {successMsg && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium text-sm animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  {successMsg}
                </div>
              )}

              {/* TAB 1: Hero videos editor */}
              {activeTab === 'videos' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Homepage Hero Videos (হোমপেজ ভিডিও গ্যালারি)</h3>
                    <p className="text-gray-400 text-xs">
                      হোমপেজ ভিডিও শোকেসের ৩টি স্পট এডিট করুন। আপনার ভিডিওর ডাইরেক্ট অনলাইন লিঙ্ক (যেমন: Mixkit, Imgur, বা Direct MP4) অথবা YouTube / Vimeo ভিডিওর লিংক বসান।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {localVideos.map((video, idx) => (
                      <div key={video.id} className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-4 relative">
                        <span className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 uppercase">Spot #{idx + 1}</span>
                        <h4 className="font-semibold text-sm text-[#FF007A] flex items-center gap-1.5">
                          <Video className="w-4 h-4" /> Video Item : {video.title || `Spot ${idx + 1}`}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Title (নাম/শিরোনাম)</label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => handleVideoChange(idx, 'title', e.target.value)}
                              className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Aspect Ratio (ভিডিওর অনুপাত)</label>
                            <select
                              value={video.aspectRatio}
                              onChange={(e) => handleVideoChange(idx, 'aspectRatio', e.target.value)}
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                            >
                              <option value="16:9">16:9 Landscape (যেমন: কম্পিউটার স্ক্রিন)</option>
                              <option value="9:16">9:16 Portrait (যেমন: মোবাইল স্ক্রিন/Shorts)</option>
                              <option value="1:1">1:1 Square (যেমন: চৌকোণ)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Video URL (ভিডিওর অনলাইন লিঙ্ক)</label>
                            <input
                              type="text"
                              value={video.url}
                              onChange={(e) => handleVideoChange(idx, 'url', e.target.value)}
                              placeholder="https://example.com/video.mp4"
                              className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none font-mono"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Source Type (উৎস)</label>
                            <select
                              value={video.type}
                              onChange={(e) => handleVideoChange(idx, 'type', e.target.value as any)}
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                            >
                              <option value="mp4">Direct MP4 File (ডাইরেক্ট ফাইল)</option>
                              <option value="youtube">YouTube (ইউটিউব)</option>
                              <option value="vimeo">Vimeo (ভিমিও)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Description (ছোট বিবরণ)</label>
                          <textarea
                            value={video.description}
                            onChange={(e) => handleVideoChange(idx, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveVideos}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF007A] hover:bg-[#FF007A]/90 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      <Save className="w-4 h-4" /> Save Homepage Videos
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Project list manager */}
              {activeTab === 'projects' && (
                <div className="space-y-10">
                  
                  {/* Current Projects Table/List */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white">Project Catalogue (প্রজেক্ট ও অ্যাপসমূহ)</h3>
                        <p className="text-gray-400 text-xs">
                          আপনার ওয়েবসাইটে শোকেস করা সমস্ত ওয়েবসাইট ও অ্যান্ড্রয়েড অ্যাপ এডিট বা ডিলিট করুন।
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {localProjects.map((p) => {
                        const isApp = p.category === 'android';
                        return (
                          <div key={p.id} className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-4 relative">
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center gap-2.5">
                              {isApp ? (
                                <Smartphone className="w-4 h-4 text-[#FF007A]" />
                              ) : (
                                <Globe className="w-4 h-4 text-[#0072FF]" />
                              )}
                              <span className="text-[10px] font-mono tracking-widest font-semibold px-2 py-0.5 rounded bg-white/5 uppercase">
                                {p.category} Category
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Project Name (প্রজেক্টের নাম)</label>
                                <input
                                  type="text"
                                  value={p.name}
                                  onChange={(e) => handleProjectFieldChange(p.id, 'name', e.target.value)}
                                  className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Version (ভার্সন)</label>
                                  <input
                                    type="text"
                                    value={p.version || ''}
                                    onChange={(e) => handleProjectFieldChange(p.id, 'version', e.target.value)}
                                    placeholder="v1.0.0"
                                    className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Release Status (অবস্থা)</label>
                                  <input
                                    type="text"
                                    value={p.releaseStatus || ''}
                                    onChange={(e) => handleProjectFieldChange(p.id, 'releaseStatus', e.target.value)}
                                    placeholder="Stable"
                                    className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Description (বিবরণ)</label>
                              <textarea
                                value={p.description}
                                onChange={(e) => handleProjectFieldChange(p.id, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs"
                              />
                            </div>

                            {/* Conditional inputs */}
                            {!isApp ? (
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                  Website Live URL (ওয়েবসাইটের আসল লিংক - এটি দিয়ে সরাসরি আইফ্রেমে প্রিভিউ হবে)
                                </label>
                                <input
                                  type="text"
                                  value={p.websiteUrl || ''}
                                  onChange={(e) => handleProjectFieldChange(p.id, 'websiteUrl', e.target.value)}
                                  placeholder="https://example.com"
                                  className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs font-mono"
                                />
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                      Thumbnail Graphic URL (থাম্বনেইল ফটোর লিংক)
                                    </label>
                                    <input
                                      type="text"
                                      value={p.thumbnail}
                                      onChange={(e) => handleProjectFieldChange(p.id, 'thumbnail', e.target.value)}
                                      className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs font-mono"
                                    />
                                    <p className="text-[9px] text-amber-400 font-mono">
                                      *ম্যান্ডেটরি সাইজ: ল্যান্ডস্কেপ অনুপাত (16:10 বা 800x500px) সুন্দর ফিট হওয়ার জন্য।
                                    </p>
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                      App Logo URL (অ্যাপ আইকন লোগো লিংক)
                                    </label>
                                    <input
                                      type="text"
                                      value={p.logoUrl || ''}
                                      onChange={(e) => handleProjectFieldChange(p.id, 'logoUrl', e.target.value)}
                                      className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs font-mono"
                                    />
                                    <p className="text-[9px] text-amber-400 font-mono">
                                      *ম্যান্ডেটরি সাইজ: স্কয়ার লোগো (1:1 অনুপাত)।
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                      Direct APK Download URL (Google Drive / GitHub লিংক)
                                    </label>
                                    <input
                                      type="text"
                                      value={p.apkUrl || ''}
                                      onChange={(e) => handleProjectFieldChange(p.id, 'apkUrl', e.target.value)}
                                      placeholder="https://drive.google.com/..."
                                      className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs font-mono"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                      Google Play Store URL (প্লে-স্টোর লিংক)
                                    </label>
                                    <input
                                      type="text"
                                      value={p.playStoreUrl || ''}
                                      onChange={(e) => handleProjectFieldChange(p.id, 'playStoreUrl', e.target.value)}
                                      placeholder="https://play.google.com/store/apps/details?id=..."
                                      className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs font-mono"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSaveProjects}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0072FF] to-[#0052D4] hover:from-[#00F0FF] hover:to-[#0072FF] text-xs font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        <Save className="w-4 h-4" /> Save Project Changes
                      </button>
                    </div>
                  </div>

                  {/* Add New Project Section */}
                  <div className="p-6 rounded-2xl bg-[#030712]/50 border border-dashed border-white/15 space-y-5">
                    <h4 className="font-display font-semibold text-base text-white flex items-center gap-2 text-gradient-flow">
                      <Plus className="w-4 h-4" /> Add New Project (নতুন প্রজেক্ট যোগ করুন)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Category (ক্যাটাগরি)</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#FF007A]"
                        >
                          <option value="website">Website (ওয়েবসাইট)</option>
                          <option value="android">Android App (মোবাইল অ্যাপ)</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Project/App Name (প্রজেক্টের নাম)</label>
                        <input
                          type="text"
                          value={newProject.name}
                          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                          placeholder="আমার নতুন অ্যাপ"
                          className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#FF007A]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Description (সংক্ষিপ্ত বিবরণ)</label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="প্রজেক্টের বৈশিষ্ট্যসমূহ এখানে গুছিয়ে লিখুন..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#FF007A]"
                      />
                    </div>

                    {newProject.category === 'website' ? (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Website URL (লাইভ ওয়েবসাইট লিংক)</label>
                        <input
                          type="text"
                          value={newProject.websiteUrl}
                          onChange={(e) => setNewProject({ ...newProject, websiteUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF007A]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Graphic Image URL (ফটোর ডাইরেক্ট লিংক)</label>
                            <input
                              type="text"
                              value={newProject.thumbnail}
                              onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF007A]"
                            />
                            <p className="text-[9px] text-gray-500">
                              *অবশ্যই ল্যান্ডস্কেপ ইমেজ দিবেন। থাম্বনেইল হিসেবে শো করবে।
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">App Logo/Icon URL (অ্যাপ লোগো লিংক)</label>
                            <input
                              type="text"
                              value={newProject.logoUrl}
                              onChange={(e) => setNewProject({ ...newProject, logoUrl: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF007A]"
                            />
                            <p className="text-[9px] text-gray-500">
                              *স্কয়ার লোগো (1:1 অনুপাত) লিংক।
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Direct APK Download Link (যেমন: Drive/GitHub)</label>
                            <input
                              type="text"
                              value={newProject.apkUrl}
                              onChange={(e) => setNewProject({ ...newProject, apkUrl: e.target.value })}
                              placeholder="https://drive.google.com/..."
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF007A]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Google Play Store Link (ঐচ্ছিক)</label>
                            <input
                              type="text"
                              value={newProject.playStoreUrl}
                              onChange={(e) => setNewProject({ ...newProject, playStoreUrl: e.target.value })}
                              placeholder="https://play.google.com/..."
                              className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF007A]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add to Showcase
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Contact & Slogans Editor */}
              {activeTab === 'contact' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Corporate Profile & Contacts (যোগাযোগ ও ব্র্যান্ড স্লোগান)</h3>
                    <p className="text-gray-400 text-xs">
                      ওয়েবসাইটের হেডলাইন, বায়ো, কন্টাক্ট নম্বর, ইমেল আইডি, ঠিকানা এবং কোম্পানির ভিশন/মিশন টেক্সট সফলভাবে এখান থেকে রিয়েল-টাইম আপডেট করুন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Headline (মূল স্লোগান/হেডলাইন)</label>
                      <input
                        type="text"
                        value={localContact.headline}
                        onChange={(e) => handleContactChange('headline', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Brand Sub-Slogan (সহায়ক স্লোগান)</label>
                      <input
                        type="text"
                        value={localContact.slogan}
                        onChange={(e) => handleContactChange('slogan', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Phone Number (ফোন নম্বর)</label>
                      <input
                        type="text"
                        value={localContact.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Email Address (ইমেইল ঠিকানা)</label>
                      <input
                        type="text"
                        value={localContact.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Corporate Address (অফিসিয়াল ঠিকানা)</label>
                      <input
                        type="text"
                        value={localContact.address}
                        onChange={(e) => handleContactChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Working Hours (কাজের সময়সীমা)</label>
                      <input
                        type="text"
                        value={localContact.workingHours}
                        onChange={(e) => handleContactChange('workingHours', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">About/Bio (কোম্পানির সাধারণ পরিচিতি)</label>
                    <textarea
                      value={localContact.bio}
                      onChange={(e) => handleContactChange('bio', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Mission Statement (আমাদের মিশন)</label>
                      <textarea
                        value={localContact.mission}
                        onChange={(e) => handleContactChange('mission', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Vision Statement (আমাদের ভিশন)</label>
                      <textarea
                        value={localContact.vision}
                        onChange={(e) => handleContactChange('vision', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs focus:border-[#FF007A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveContact}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300"
                    >
                      <Save className="w-4 h-4" /> Save Contact Settings
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Privacy Policies Section editor */}
              {activeTab === 'policies' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Privacy Policy Framework (প্রাইভেসি পলিসি ধারা এডিটর)</h3>
                    <p className="text-gray-400 text-xs">
                      মার্কেটপ্লেস ও সেলিং প্রাইভেসি পলিসি চুক্তির প্রতিটি ধারা ও আইনি নোটিশ এখান থেকে ইচ্ছামত এডিট করুন।
                    </p>
                  </div>

                  <div className="space-y-10">
                    {localPolicies.map((category, catIdx) => (
                      <div key={category.id} className="space-y-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                        <h4 className="font-semibold text-sm text-gradient-flow flex items-center gap-2">
                          <FileText className="w-4 h-4" /> {category.title}
                        </h4>

                        <div className="space-y-6">
                          {category.sections.map((section, secIdx) => (
                            <div key={secIdx} className="space-y-2 p-4 rounded-xl bg-slate-950/40 border border-white/5">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Section Title (ধারার শিরোনাম)</label>
                                <input
                                  type="text"
                                  value={section.title}
                                  onChange={(e) => handlePolicySectionChange(catIdx, secIdx, 'title', e.target.value)}
                                  className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#FF007A]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Section Content (ধারার বিবরণ)</label>
                                <textarea
                                  value={section.content}
                                  onChange={(e) => handlePolicySectionChange(catIdx, secIdx, 'content', e.target.value)}
                                  rows={4}
                                  className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-[#FF007A]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSavePolicies}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300"
                    >
                      <Save className="w-4 h-4" /> Save Policies Framework
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
