/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VideoItem, TechIconItem, ProjectItem, PrivacyPolicyCategory, ContactInfo, GlobalBrandConfig } from './types';

export const brandConfig: GlobalBrandConfig = {
  logoName: 'ZYPHOREXA',
  ownerName: 'SAHID GAZI',
  tagline: 'Designed for the Future',
};

export const heroVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Android Engineering Lab',
    description: 'High-performance Android framework compiling and system architecture development.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34284-large.mp4',
    type: 'mp4',
    aspectRatio: '16:9',
  },
  {
    id: 'vid-2',
    title: 'ZYPHOREXA Mobile UI',
    description: 'Ultra-smooth interactive elements and state mechanics on high-density displays.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-phone-with-a-blue-chroma-key-41484-large.mp4',
    type: 'mp4',
    aspectRatio: '9:16',
  },
  {
    id: 'vid-3',
    title: 'Intelligent Web Engines',
    description: 'Futuristic glassmorphism design layouts running on highly optimized rendering pipelines.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-cyber-security-code-on-a-screen-40713-large.mp4',
    type: 'mp4',
    aspectRatio: '16:9',
  }
];

export const techShowcaseItems: TechIconItem[] = [
  {
    id: 'tech-android',
    name: 'Android Development',
    description: 'Compiling high-performance native kernels, secure SDK architecture, and custom ROM optimization.',
    iconName: 'Smartphone',
    glowColor: 'from-[#00F0FF] to-[#0072FF]',
  },
  {
    id: 'tech-web',
    name: 'Website Development',
    description: 'Crafting responsive glassmorphism client engines with cinematic transitions and sub-300ms loads.',
    iconName: 'Globe',
    glowColor: 'from-[#FF007A] to-[#9600FF]',
  },
  {
    id: 'tech-automation',
    name: 'Automation Solutions',
    description: 'Building intelligent workflows, serverless backend microservices, and AI-driven agent pipelines.',
    iconName: 'Cpu',
    glowColor: 'from-[#00FF87] to-[#60EFFF]',
  },
];

export const projectItems: ProjectItem[] = [
  {
    id: 'proj-web-1',
    name: 'ZYPHOREXA Official Website',
    description: 'A futuristic premium corporate website designed with a modern Glassmorphism UI, responsive layouts, cinematic animations, and high-performance architecture.',
    category: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=200&auto=format&fit=crop',
    version: 'v1.0.0',
    releaseStatus: 'Stable',
    websiteUrl: '#',
  },
  {
    id: 'proj-web-2',
    name: 'Aetherial Cloud Console',
    description: 'An advanced cloud orchestration control panel with real-time analytics, automated scaling triggers, and full telemetry tracking.',
    category: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    version: 'v2.4.1',
    releaseStatus: 'Enterprise',
    websiteUrl: 'https://github.com',
  },
  {
    id: 'proj-app-1',
    name: 'ZYPHOREXA Mobile',
    description: 'A modern Android application demonstrating premium UI design, optimized performance, secure architecture, and a seamless user experience.',
    category: 'android',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop',
    version: 'v1.2.0',
    releaseStatus: 'Production',
    apkUrl: '#', // Simulate direct download link
    playStoreUrl: 'https://play.google.com',
  },
  {
    id: 'proj-app-2',
    name: 'Nexus Automation Agent',
    description: 'An on-device background automation utility that automates notification routing, scheduling, and device sync via secure SSH tunnels.',
    category: 'android',
    thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop',
    version: 'v0.9.8-Beta',
    releaseStatus: 'Beta Testing',
    apkUrl: '#',
    playStoreUrl: 'https://play.google.com',
  }
];

export const privacyPolicies: PrivacyPolicyCategory[] = [
  {
    id: 'marketplace-policy',
    title: 'Marketplace Privacy Policy (মার্কেটপ্লেস পলিসি)',
    icon: 'ShoppingBag',
    sections: [
      {
        title: 'Free App Downloads (ফ্রি অ্যাপ ডাউনলোড)',
        content: 'All official applications published by ZYPHOREXA are completely free to download from our verified distribution channels. (আমাদের তৈরি করা সকল অ্যাপ্লিকেশন ডিস্ট্রিবিউশন চ্যানেল থেকে একদম বিনামূল্যে ডাউনলোড করা যাবে।)'
      },
      {
        title: 'Free App Usage (ফ্রি অ্যাপ ব্যবহার)',
        content: 'Users can fully experience and use the core functionalities of our applications without any mandatory subscription fees. (আমাদের যেকোনো অ্যাপ ব্যবহারের জন্য কোনো বাধ্যতামূলক সাবস্ক্রিপশন ফি দিতে হবে না এবং এটি সম্পূর্ণ ফ্রি থাকবে।)'
      },
      {
        title: 'Advertising Integration (বিজ্ঞাপন সংযুক্তি)',
        content: 'To support the continuous development of high-quality products, non-intrusive advertisements may be displayed inside our mobile applications. (অ্যাপ্লিকেশন তৈরির কাজ চালু রাখতে এবং খরচ চালানোর জন্য অ্যাপের ভিতরে বিজ্ঞাপন বা অ্যাড যুক্ত থাকবে।)'
      },
      {
        title: 'Critical User Data Transparency (গুরুত্বপূর্ণ ডেটা সংগ্রহ ও স্বচ্ছতা)',
        content: 'If any application requires access to or collects critical user data (e.g., location, contacts, files, account details), it will be explicitly declared here and in the app\'s internal prompt prior to collection. (যদি কোনো অ্যাপ্লিকেশন ইউজারের কোনো গুরুত্বপূর্ণ ডাটা সংগ্রহ করে, তবে তা এই প্রাইভেসি পলিসি পেজে এবং অ্যাপের ভিতর স্পষ্ট করে উল্লেখ করা হবে।)'
      },
      {
        title: 'Free Website Usage (ফ্রি ওয়েবসাইট ব্যবহার)',
        content: 'Browsing, querying, and interacting with ZYPHOREXA\'s digital ecosystem and websites is completely free of charge. (ZYPHOREXA-এর অফিশিয়াল ওয়েবসাইট এবং পোর্টাল ভিজিট ও ব্যবহার করা সম্পূর্ণ ফ্রি ও উন্মুক্ত।)'
      },
      {
        title: 'Website Advertising (ওয়েবসাইটে বিজ্ঞাপন)',
        content: 'Our public websites and dashboards may include clean and non-intrusive advertisements to offset server and domain hosting expenses. (ওয়েবসাইটের হোস্টিং ও ডোমেইন খরচ চালানোর জন্য আমাদের বিভিন্ন ওয়েবসাইটে অ্যাড বা বিজ্ঞাপন লাগানো থাকতে পারে।)'
      },
      {
        title: 'Website Data Disclosure (ওয়েবসাইট ডেটা ব্যবহারের নিয়ম)',
        content: 'We prioritize your digital safety. Any cookies, cache storage, or tracking logs necessary for performance will be transparently outlined right here, and your privacy will never be compromised. (আমরা আপনার নিরাপত্তার সর্বোচ্চ খেয়াল রাখি। পারফরম্যান্স বৃদ্ধির জন্য প্রয়োজনীয় কুকিজ বা ট্র্যাকিং ডেটার ব্যবহার সম্পূর্ণ স্বচ্ছভাবে এখানে উল্লেখ করা থাকবে।)'
      }
    ]
  },
  {
    id: 'selling-policy',
    title: 'Selling Privacy Policy (সেলিং ও চুক্তি পলিসি)',
    icon: 'Coins',
    sections: [
      {
        title: 'Target Clients & Services (কাদের জন্য সার্ভিস)',
        content: 'We design, compile, and engineer high-performance mobile applications and custom premium websites tailored specifically for small businesses and small organizations. (আমরা মূলত ক্ষুদ্র ব্যবসা এবং ছোট অর্গানাইজেশন বা প্রতিষ্ঠানের জন্য প্রফেশনাল মোবাইল অ্যাপ ও কাস্টম ওয়েবসাইট ডিজাইন ও ডেভেলপ করে থাকি।)'
      },
      {
        title: '100% Full Client Ownership (সম্পূর্ণ মালিকানা হস্তান্তর)',
        content: 'Once the website or application is successfully completed and deployed, 100% full administrative ownership, database keys, and server access will belong strictly to the business owner. The developer retains absolutely nothing. (কাজ সম্পন্ন ও ডেলিভারি হওয়ার পর ওয়েবসাইট বা অ্যাপের সম্পূর্ণ অ্যাক্সেস এবং কন্ট্রোল ওনার বা মালিকের কাছে থাকবে। ডেভেলপারের কাছে এর কোনো অংশ বা ব্যাকডোর থাকবে না।)'
      },
      {
        title: 'Absolute Control Over Backend & Server (সার্ভার ও ডেভেলপমেন্ট কিটের অ্যাক্সেস)',
        content: 'The entire development kit, source files, deployment keys, and raw backend servers will reside fully under the owner\'s credentials. The developer has 0% access post-delivery. (অ্যাপ বা ওয়েবসাইটের সমস্ত ডেভেলপমেন্ট কিট, সোর্স কোড ও সার্ভার অ্যাক্সেস সম্পূর্ণভাবে ওনারের নিয়ন্ত্রণে থাকবে, ডেভেলপারের সেখানে কোনো অধিকার থাকবে না।)'
      },
      {
        title: 'No Revenue or Data Sharing Claims (ভবিষ্যতে কোনো অংশীদারিত্ব দাবি করা যাবে না)',
        content: 'The developer cannot apply for, request, or claim any future earning shares, monthly margins, or operational user data generated by the delivered application or website. The complete authority lies solely with the owner. (ভবিষ্যতে এই অ্যাপ বা ওয়েবসাইট থেকে হওয়া কোনো আয় (Earning Share) বা কোনো গুরুত্বপূর্ণ তথ্য ওনার থেকে ডেভেলপার দাবি করতে পারবে না। মালিকানাধীন সম্পূর্ণ নোটিশ ওনারের কাছেই থাকবে।)'
      },
      {
        title: 'Secure Payment Milestones (পেমেন্ট পলিসি)',
        content: 'To initiate any dynamic website or mobile application building service, a 10% advance deposit is required based on the estimated project budget. The remaining 90% is payable strictly upon work completion and client satisfaction. (যেকোনো সার্ভিস শুরু করার পূর্বে মোট খরচের ১০% টাকা অগ্রিম অ্যাডভান্স হিসেবে দিতে হবে এবং বাকি ৯০% টাকা কাজ সম্পূর্ণ করার পর প্রদান করতে হবে।)'
      },
      {
        title: 'Mandatory Digital Legal Contract (ডিজিটাল আইনি চুক্তি)',
        content: 'Before initiating any official service, a formal Legal Instruction and Guideline agreement must be reviewed and signed online by both the owner and the developer. This legally binding copy will be preserved digitally by both parties to avoid any judicial concerns. (সার্ভিস নেওয়ার আগে ওনার ও ডেভেলপার দুজনের সম্মতি নিয়ে একটি অনলাইন লিগ্যাল নোটিশ বা আইনি চুক্তি স্বাক্ষর করা হবে। এই ডিজিটাল কপি আইনি সুরক্ষার জন্য দুজনের কাছেই থাকবে।)'
      },
      {
        title: 'Client-Provided Credentials for Billing (মালিকের আইনি ডকুমেন্টস ব্যবহারের নিয়ম)',
        content: 'All operational parameters, legal files, business identity proofs, email IDs, and setup credentials needed to generate bills and host production servers must be provided by the owner. Under no circumstances will personal developer credentials be utilized to host active systems. (বিল বা অ্যাকাউন্ট রেজিস্টার করতে প্রয়োজনীয় সমস্ত লিগ্যাল ডকুমেন্টস, ইমেইল আইডি বা ব্যবসা সংক্রান্ত কাগজপত্র ওনার বা মালিককে দিতে হবে। ডেভেলপারের পার্সোনাল ডকুমেন্ট দিয়ে কোনো অফিশিয়াল কাজ করা হবে না।)'
      }
    ]
  }
];

export const contactInfo: ContactInfo = {
  phone: '+91 82504 74684',
  email: 'contact@zyphorexa.com',
  address: 'Kolkata, West Bengal, India',
  workingHours: 'Monday - Friday • 09:00 AM - 06:00 PM (IST)',
  bio: 'ZYPHOREXA is a modern technology brand dedicated to delivering innovative Android applications, premium websites, and intelligent automation solutions. Our mission is to build secure, elegant, and high-performance digital experiences for businesses and individuals around the world.',
  mission: 'Our mission is to simplify technology through innovative design, reliable software, and premium digital solutions that empower businesses and users.',
  vision: 'Our vision is to become a globally recognized technology brand known for innovation, quality, creativity, and customer satisfaction.',
  headline: 'Innovating the Future of Digital Technology',
  slogan: 'Build Smart. Design Better. Grow Together.',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com'
  }
};
