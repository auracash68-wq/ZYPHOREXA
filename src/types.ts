/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string; // YouTube, Vimeo, or Direct MP4 link
  type: 'youtube' | 'vimeo' | 'mp4';
  aspectRatio: '16:9' | '9:16' | '1:1' | string;
}

export interface TechIconItem {
  id: string;
  name: string;
  description: string;
  iconName: 'Smartphone' | 'Globe' | 'Cpu'; // Corresponds to Lucide icons
  glowColor: string; // Tailwind glow border color or custom HEX
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: 'website' | 'android';
  thumbnail: string;
  logoUrl?: string;
  version?: string;
  releaseStatus?: string;
  websiteUrl?: string;
  apkUrl?: string;
  playStoreUrl?: string;
}

export interface PolicySection {
  title: string;
  content: string;
}

export interface PrivacyPolicyCategory {
  id: string;
  title: string;
  icon: string;
  sections: PolicySection[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  bio: string;
  mission: string;
  vision: string;
  headline: string;
  slogan: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
  };
}

export interface GlobalBrandConfig {
  logoName: string;
  ownerName: string;
  tagline: string;
}
