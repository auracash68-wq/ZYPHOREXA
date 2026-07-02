/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { brandConfig, heroVideos, projectItems, privacyPolicies, contactInfo } from '../data';
import { GlobalBrandConfig, VideoItem, ProjectItem, PrivacyPolicyCategory, ContactInfo } from '../types';

const KEYS = {
  BRAND_CONFIG: 'zyph_brand_config',
  HERO_VIDEOS: 'zyph_hero_videos',
  PROJECT_ITEMS: 'zyph_project_items',
  PRIVACY_POLICIES: 'zyph_privacy_policies',
  CONTACT_INFO: 'zyph_contact_info',
};

export function getStoredBrandConfig(): GlobalBrandConfig {
  const data = localStorage.getItem(KEYS.BRAND_CONFIG);
  if (!data) {
    localStorage.setItem(KEYS.BRAND_CONFIG, JSON.stringify(brandConfig));
    return brandConfig;
  }
  return JSON.parse(data);
}

export function saveStoredBrandConfig(config: GlobalBrandConfig) {
  localStorage.setItem(KEYS.BRAND_CONFIG, JSON.stringify(config));
}

export function getStoredHeroVideos(): VideoItem[] {
  const data = localStorage.getItem(KEYS.HERO_VIDEOS);
  if (!data) {
    localStorage.setItem(KEYS.HERO_VIDEOS, JSON.stringify(heroVideos));
    return heroVideos;
  }
  return JSON.parse(data);
}

export function saveStoredHeroVideos(videos: VideoItem[]) {
  localStorage.setItem(KEYS.HERO_VIDEOS, JSON.stringify(videos));
}

export function getStoredProjectItems(): ProjectItem[] {
  const data = localStorage.getItem(KEYS.PROJECT_ITEMS);
  if (!data) {
    localStorage.setItem(KEYS.PROJECT_ITEMS, JSON.stringify(projectItems));
    return projectItems;
  }
  return JSON.parse(data);
}

export function saveStoredProjectItems(projects: ProjectItem[]) {
  localStorage.setItem(KEYS.PROJECT_ITEMS, JSON.stringify(projects));
}

export function getStoredPrivacyPolicies(): PrivacyPolicyCategory[] {
  const data = localStorage.getItem(KEYS.PRIVACY_POLICIES);
  if (!data) {
    localStorage.setItem(KEYS.PRIVACY_POLICIES, JSON.stringify(privacyPolicies));
    return privacyPolicies;
  }
  return JSON.parse(data);
}

export function saveStoredPrivacyPolicies(policies: PrivacyPolicyCategory[]) {
  localStorage.setItem(KEYS.PRIVACY_POLICIES, JSON.stringify(policies));
}

export function getStoredContactInfo(): ContactInfo {
  const data = localStorage.getItem(KEYS.CONTACT_INFO);
  if (!data) {
    localStorage.setItem(KEYS.CONTACT_INFO, JSON.stringify(contactInfo));
    return contactInfo;
  }
  return JSON.parse(data);
}

export function saveStoredContactInfo(info: ContactInfo) {
  localStorage.setItem(KEYS.CONTACT_INFO, JSON.stringify(info));
}
