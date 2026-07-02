/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  getStoredBrandConfig,
  getStoredHeroVideos,
  getStoredProjectItems,
  getStoredPrivacyPolicies,
  getStoredContactInfo,
  saveStoredBrandConfig,
  saveStoredHeroVideos,
  saveStoredProjectItems,
  saveStoredPrivacyPolicies,
  saveStoredContactInfo
} from '../lib/storage';
import { GlobalBrandConfig, VideoItem, ProjectItem, PrivacyPolicyCategory, ContactInfo } from '../types';

export const ZYPH_UPDATE_EVENT = 'zyph-data-updated';

export function triggerDataRefresh() {
  window.dispatchEvent(new CustomEvent(ZYPH_UPDATE_EVENT));
}

export function useBrandData() {
  const [brand, setBrand] = useState<GlobalBrandConfig>(() => getStoredBrandConfig());
  const [videos, setVideos] = useState<VideoItem[]>(() => getStoredHeroVideos());
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredProjectItems());
  const [policies, setPolicies] = useState<PrivacyPolicyCategory[]>(() => getStoredPrivacyPolicies());
  const [contact, setContact] = useState<ContactInfo>(() => getStoredContactInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setBrand(getStoredBrandConfig());
      setVideos(getStoredHeroVideos());
      setProjects(getStoredProjectItems());
      setPolicies(getStoredPrivacyPolicies());
      setContact(getStoredContactInfo());
    };

    window.addEventListener(ZYPH_UPDATE_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(ZYPH_UPDATE_EVENT, handleUpdate);
    };
  }, []);

  const updateBrand = (newBrand: GlobalBrandConfig) => {
    saveStoredBrandConfig(newBrand);
    setBrand(newBrand);
    triggerDataRefresh();
  };

  const updateVideos = (newVideos: VideoItem[]) => {
    saveStoredHeroVideos(newVideos);
    setVideos(newVideos);
    triggerDataRefresh();
  };

  const updateProjects = (newProjects: ProjectItem[]) => {
    saveStoredProjectItems(newProjects);
    setProjects(newProjects);
    triggerDataRefresh();
  };

  const updatePolicies = (newPolicies: PrivacyPolicyCategory[]) => {
    saveStoredPrivacyPolicies(newPolicies);
    setPolicies(newPolicies);
    triggerDataRefresh();
  };

  const updateContact = (newContact: ContactInfo) => {
    saveStoredContactInfo(newContact);
    setContact(newContact);
    triggerDataRefresh();
  };

  return {
    brand,
    videos,
    projects,
    policies,
    contact,
    updateBrand,
    updateVideos,
    updateProjects,
    updatePolicies,
    updateContact,
    refresh: triggerDataRefresh
  };
}
