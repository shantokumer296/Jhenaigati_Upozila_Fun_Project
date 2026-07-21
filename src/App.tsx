import React, { useState, useEffect, useRef } from 'react';
import { styled, globalCss, darkTheme } from './stitches.config';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { AdministrationView } from './components/AdministrationView';
import { ProjectsView } from './components/ProjectsView';
import { ServicesView } from './components/ServicesView';
import { 
  Landmark, Menu, X, Globe, Award, ShieldCheck, Mail, Phone, MapPin, Sun, Moon,
  Search, Building2, User, Briefcase, FileText, Compass, Copy, Check, ArrowRight, CornerDownLeft,
  ShieldAlert, Flame, Scale, CloudLightning, Car, Info, Users
} from 'lucide-react';
import { 
  translations, 
  officersData, 
  departmentsData, 
  projectsData, 
  committeesData, 
  touristSpotsData, 
  noticesData,
  unionsData,
  emergencyHotlinesData
} from './translations';

// Define global CSS resets & standard scroll behaviors using Stitches globalCss
const injectGlobalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'body': {
    fontFamily: '$sans',
    backgroundColor: '$background',
    color: '$text',
    fontSize: '$base',
    lineHeight: 1.5,
  },
  'a, button': {
    transition: 'all 0.2s ease',
  },
  '@keyframes slideUp': {
    '0%': { transform: 'translateY(15px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
});

// Stitches Layout Components
const LayoutContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StickyHeader = styled('header', {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: '$surface',
  borderBottom: '1px solid $border',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
});


const HeaderContent = styled('div', {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 $2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '64px',

  '@bp2': {
    padding: '0 $4',
  }
});

const LogoLink = styled('button', {
  background: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  textAlign: 'left',
});

const EmblemWrapper = styled('div', {
  width: '42px',
  height: '42px',
  borderRadius: '$round',
  backgroundColor: '$primary',
  color: '$surface',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
});

const TitleWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const PortalTitle = styled('h1', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$base',
  fontWeight: 700,
  color: '$primary',
  margin: 0,
  lineHeight: 1.2,

  '@bp1': {
    fontSize: '$lg',
  }
});

const PortalSubTitle = styled('span', {
  fontSize: '10px',
  color: '$textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: 600,
});

const DesktopNav = styled('nav', {
  display: 'none',
  alignItems: 'center',
  gap: '6px',

  '@bp3': {
    display: 'flex',
  }
});

const ControlGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ToggleButton = styled('button', {
  background: '$surface',
  border: '1px solid $border',
  color: '$text',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'all 0.2s ease',
  boxShadow: '$sm',

  '&:hover': {
    backgroundColor: '$primaryLight',
    color: '$primary',
    borderColor: '$primary',
  },
});

const NavButton = styled('button', {
  background: 'none',
  border: 'none',
  padding: '8px 16px',
  fontSize: '$sm',
  fontWeight: 500,
  color: '$textMuted',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'all 0.2s ease',

  '&:hover': {
    color: '$text',
    backgroundColor: '$primaryLight',
  },

  variants: {
    active: {
      true: {
        color: '$primary',
        fontWeight: 600,
        backgroundColor: '$primaryLight',
      }
    }
  }
});

const HamburgerButton = styled('button', {
  background: 'none',
  border: 'none',
  color: '$text',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@bp3': {
    display: 'none',
  }
});

// Mobile Drawer Overlay & Menu
const MobileMenuDrawer = styled('div', {
  position: 'fixed',
  top: '72px',
  left: 0,
  right: 0,
  backgroundColor: '$surface',
  borderBottom: '1px solid $border',
  boxShadow: '$lg',
  zIndex: 99,
  padding: '$2',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  animation: 'slideUp 0.2s ease-out',

  '@bp3': {
    display: 'none',
  }
});

const MobileNavButton = styled('button', {
  width: '100%',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  padding: '12px 16px',
  fontSize: '$sm',
  fontWeight: 600,
  color: '$text',
  cursor: 'pointer',
  borderRadius: '$base',

  '&:hover': {
    color: '$primary',
    backgroundColor: '$primaryLight',
  },

  variants: {
    active: {
      true: {
        color: '$primary',
        backgroundColor: '$primaryLight',
      }
    }
  }
});

const MainContent = styled('main', {
  flexGrow: 1,
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '$2',
  animation: 'slideUp 0.4s ease-out',

  '@bp2': {
    padding: '$3',
  }
});

const PortalFooter = styled('footer', {
  backgroundColor: '$surface',
  color: '$textMuted',
  borderTop: '1px solid $border',
  padding: '$4 $2',
  marginTop: '$4',

  '@bp2': {
    padding: '$5 $4',
  }
});

const FooterGrid = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',

  '@bp2': {
    gridTemplateColumns: '1.2fr 1fr 1fr',
  }
});

const FooterColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const FooterTitle = styled('h4', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$sm',
  fontWeight: 600,
  color: '$text',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid $border',
  paddingBottom: '8px',
});

const FooterLinkList = styled('ul', {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const FooterLink = styled('button', {
  background: 'none',
  border: 'none',
  color: '$textMuted',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '$sm',
  padding: '4px 0',

  '&:hover': {
    color: '$primary',
    textDecoration: 'underline',
  }
});

const BottomFooter = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  borderTop: '1px solid $border',
  paddingTop: '$3',
  marginTop: '$4',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  fontSize: '$xs',
  color: '$textMuted',

  '@bp2': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

const HotlinesContainer = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  borderTop: '1px solid $border',
  paddingTop: '$3',
  marginTop: '$4',
  marginBottom: '$3',
});

const HotlinesTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$2',
});

const HotlinesTitleLeft = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '$text',
  fontFamily: 'Space Grotesk, sans-serif',
  fontWeight: 700,
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const HotlinesTitleRight = styled('div', {
  fontSize: '$xs',
  color: '$textMuted',
  display: 'none',
  '@bp1': {
    display: 'block',
  }
});

const HotlinesGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  
  '@bp1': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@bp2': {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  '@bp3': {
    gridTemplateColumns: 'repeat(8, 1fr)',
  }
});

const HotlineCard = styled('button', {
  backgroundColor: '$background',
  border: '1px solid $border',
  borderRadius: '$large',
  padding: '12px 8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  outline: 'none',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '$sm',
    borderColor: '$$accentColor',
    backgroundColor: '$$accentBg',
  },

  '&:active': {
    transform: 'translateY(1px)',
  }
});

const HotlineIconWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '$round',
  color: '$$iconColor',
  backgroundColor: '$$iconBg',
});

const HotlineNumber = styled('div', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '18px',
  fontWeight: 800,
  color: '$text',
  lineHeight: 1.1,
});

const HotlineLabel = styled('div', {
  fontSize: '11px',
  fontWeight: 600,
  color: '$text',
  lineHeight: 1.2,
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  height: '26px',
});

const HotlineDesc = styled('div', {
  fontSize: '9.5px',
  color: '$textMuted',
  lineHeight: 1.2,
  marginTop: '2px',
  display: 'none',
  '@bp1': {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  }
});

const HotlineCopyToast = styled('div', {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  backgroundColor: '$text',
  color: '$surface',
  padding: '10px 16px',
  borderRadius: '$large',
  fontSize: '$xs',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  boxShadow: '$lg',
  zIndex: 1000,
  animation: 'slideUp 0.2s ease-out',
});

// --- GLOBAL PORTAL SEARCH SYSTEM ---

interface SearchResultItem {
  id: string;
  type: 'service' | 'officer' | 'department' | 'project' | 'notice' | 'tourism' | 'union';
  title: string;
  subtitle: string;
  meta?: string;
  extra?: string;
  view: string;
  elementId?: string;
  phone?: string;
  email?: string;
}

const getSearchItems = (currentLang: 'en' | 'bn'): SearchResultItem[] => {
  const items: SearchResultItem[] = [];

  // 1. Standing Committees
  committeesData.forEach(c => {
    items.push({
      id: c.id,
      type: 'service',
      title: c.name[currentLang],
      subtitle: c.responsibility[currentLang],
      meta: currentLang === 'en' ? `Convener: ${c.convener[currentLang]}` : `আহ্বায়ক: ${c.convener[currentLang]}`,
      extra: currentLang === 'en' ? `Frequency: ${c.frequency[currentLang]}` : `সময়কাল: ${c.frequency[currentLang]}`,
      view: 'services',
      elementId: `committee-${c.id}`,
    });
  });

  // 2. Officers
  officersData.forEach(o => {
    items.push({
      id: o.id,
      type: 'officer',
      title: o.name[currentLang],
      subtitle: o.role[currentLang],
      meta: currentLang === 'en' ? `Office: ${o.office[currentLang]}` : `কার্যালয়: ${o.office[currentLang]}`,
      extra: `${o.phone} | ${o.email}`,
      view: 'administration',
      elementId: `avatar-${o.id}`,
      phone: o.phone,
      email: o.email,
    });
  });

  // 3. Departments
  departmentsData.forEach(d => {
    items.push({
      id: d.id,
      type: 'department',
      title: d.name[currentLang],
      subtitle: currentLang === 'en' ? `Officer: ${d.officer[currentLang]}` : `কর্মকর্তা: ${d.officer[currentLang]}`,
      meta: currentLang === 'en' ? `Category: ${d.category[currentLang]}` : `বিভাগ: ${d.category[currentLang]}`,
      extra: `${d.phone} | ${d.email}`,
      view: 'administration',
      elementId: `dept-${d.id}`,
      phone: d.phone,
      email: d.email,
    });
  });

  // 4. Projects
  projectsData.forEach(p => {
    const budgetStr = currentLang === 'en' 
      ? `Budget: ৳${p.budget.toLocaleString('en-IN')}` 
      : `বাজেট: ৳${p.budget.toLocaleString('bn-BD')}`;
    const statusStr = currentLang === 'en' ? `Status: ${p.status}` : `অবস্থা: ${p.statusBn}`;
    const wardStr = currentLang === 'en' ? `Ward ${p.wardNo}` : `ওয়ার্ড ${p.wardNo.toLocaleString('bn-BD')}`;
    
    items.push({
      id: p.id,
      type: 'project',
      title: p.name[currentLang],
      subtitle: `${p.agency} | ${wardStr}`,
      meta: budgetStr,
      extra: statusStr,
      view: 'projects',
      elementId: `row-${p.id}`,
    });
  });

  // 5. Notices
  noticesData.forEach(n => {
    items.push({
      id: n.id,
      type: 'notice',
      title: n.title[currentLang],
      subtitle: n.content[currentLang],
      meta: `${n.date[currentLang]} | ${n.category[currentLang]}`,
      extra: currentLang === 'en' ? `File: ${n.fileSize[currentLang]}` : `নথি: ${n.fileSize[currentLang]}`,
      view: 'home',
      elementId: `notice-${n.id}`,
    });
  });

  // 6. Tourist Spots
  touristSpotsData.forEach(t => {
    items.push({
      id: t.id,
      type: 'tourism',
      title: t.name[currentLang],
      subtitle: t.tagline[currentLang],
      meta: t.description[currentLang],
      extra: currentLang === 'en' ? `Distance: ${t.distance[currentLang]}` : `দূরত্ব: ${t.distance[currentLang]}`,
      view: 'about',
      elementId: `spot-${t.id}`,
    });
  });

  // 7. Unions
  unionsData.forEach(u => {
    const villagesStr = currentLang === 'en'
      ? `${u.villagesCount} Villages`
      : `${u.villagesCount.toLocaleString('bn-BD')} টি গ্রাম`;
    items.push({
      id: u.id,
      type: 'union',
      title: u.name[currentLang],
      subtitle: currentLang === 'en' ? `Chairman: ${u.chairman[currentLang]}` : `চেয়ারম্যান: ${u.chairman[currentLang]}`,
      meta: currentLang === 'en' ? `Area: ${u.area[currentLang]} | ${villagesStr}` : `আয়তন: ${u.area[currentLang]} | ${villagesStr}`,
      extra: currentLang === 'en' ? `Population: ${u.population[currentLang]}` : `জনসংখ্যা: ${u.population[currentLang]} জন`,
      view: 'about',
      elementId: `union-${u.id}`,
      phone: u.phone,
    });
  });

  return items;
};

const searchTranslations = {
  en: {
    placeholder: 'Search services, contacts, projects, or notices...',
    noResults: 'No matches found. Try keywords like "UNO", "Road", "Budget", "Deep Well", or "Committee".',
    copyPhone: 'Copy Phone',
    copyEmail: 'Copy Email',
    copied: 'Copied!',
    popularSearches: 'Popular Searches',
    popularTips: 'Try searching for: "UNO", "LGED", "Deep Well", "Law and Order", "Gajni", or "Stipend".',
    shortcutHint: 'Use ↑↓ to navigate, Enter to select, Esc to close.',
    goToPage: 'Go to page',
    categoryNames: {
      service: 'Service / Committee',
      officer: 'Administrative Officer',
      department: 'Government Department',
      project: 'Development Project',
      notice: 'Notice / Board',
      tourism: 'Tourism / Heritage',
      union: 'Union Parishad',
    }
  },
  bn: {
    placeholder: 'সেবা, যোগাযোগ, প্রকল্প বা নোটিশ খুঁজুন...',
    noResults: 'কোনো মিল খুঁজে পাওয়া যায়নি। "ইউএনও", "রাস্তা", "বাজেট", "নলকূপ", বা "কমিটি" লিখে চেষ্টা করুন।',
    copyPhone: 'ফোন কপি করুন',
    copyEmail: 'ইমেইল কপি করুন',
    copied: 'কপি হয়েছে!',
    popularSearches: 'জনপ্রিয় অনুসন্ধান',
    popularTips: 'অনুসন্ধান করে দেখতে পারেন: "ইউএনও", "এলজিইডি", "নলকূপ", "আইন-শৃঙ্খলা", "গজনী", বা "উপবৃত্তি"।',
    shortcutHint: 'নেভিগেট করতে ↑↓ চাপুন, নির্বাচন করতে Enter চাপুন, বন্ধ করতে Esc চাপুন।',
    goToPage: 'পৃষ্ঠায় যান',
    categoryNames: {
      service: 'সেবা / স্থায়ী কমিটি',
      officer: 'প্রশাসনিক কর্মকর্তা',
      department: 'সরকারি বিভাগ',
      project: 'উন্নয়ন প্রকল্প',
      notice: 'নোটিশ / বোর্ড',
      tourism: 'পর্যটন / ঐতিহ্য',
      union: 'ইউনিয়ন পরিষদ',
    }
  }
};

const SearchTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: '$primaryLight',
  border: '1px solid $border',
  color: '$textMuted',
  borderRadius: '20px',
  fontSize: '$sm',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  alignSelf: 'center',
  marginRight: '8px',

  '&:hover': {
    borderColor: '$primary',
    color: '$primary',
    backgroundColor: '$surface',
  },

  width: '36px',
  height: '36px',
  justifyContent: 'center',
  padding: 0,

  '@bp1': {
    width: '180px',
    height: '36px',
    padding: '0 12px',
    justifyContent: 'flex-start',
  },
  
  '@bp2': {
    width: '240px',
  }
});

const SearchTriggerText = styled('span', {
  display: 'none',
  fontSize: '$xs',
  '@bp1': {
    display: 'inline',
  }
});

const SearchTriggerShortcut = styled('span', {
  fontSize: '9px',
  background: '$surface',
  border: '1px solid $border',
  padding: '1px 5px',
  borderRadius: '4px',
  color: '$textMuted',
  marginLeft: 'auto',
  display: 'none',
  '@bp1': {
    display: 'inline-block',
  }
});

const SearchModalBackdrop = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '40px $2',

  '@bp1': {
    padding: '80px $4',
  }
});

const SearchModalContainer = styled('div', {
  width: '100%',
  maxWidth: '640px',
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  boxShadow: '$lg',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp 0.15s ease-out',
});

const SearchModalHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  borderBottom: '1px solid $border',
});

const SearchModalInput = styled('input', {
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  fontSize: '$base',
  color: '$text',
  fontFamily: '$sans',

  '&::placeholder': {
    color: '$textMuted',
  }
});

const SearchModalCloseBtn = styled('button', {
  background: 'none',
  border: 'none',
  color: '$textMuted',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: '$background',
    color: '$text',
  }
});

const SearchResultsList = styled('div', {
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const SearchResultRow = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px',
  borderRadius: '$base',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  userSelect: 'none',
  border: '1px solid transparent',

  variants: {
    active: {
      true: {
        backgroundColor: '$primaryLight',
        borderColor: '$primary',
      },
      false: {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$background',
        }
      }
    }
  }
});

const ResultIconWrapper = styled('div', {
  width: '36px',
  height: '36px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,

  variants: {
    type: {
      service: { backgroundColor: '$primaryLight', color: '$primary' },
      officer: { backgroundColor: '$primaryLight', color: '$primary' },
      department: { backgroundColor: '#e6f7ff', color: '#1890ff' },
      project: { backgroundColor: '#fff7e6', color: '#ffa940' },
      notice: { backgroundColor: '#fff0f6', color: '#eb2f96' },
      tourism: { backgroundColor: '#f9f0ff', color: '#722ed1' },
    }
  }
});

const ResultContent = styled('div', {
  flexGrow: 1,
  minWidth: 0,
});

const ResultTitle = styled('h4', {
  fontSize: '$sm',
  fontWeight: 600,
  color: '$text',
  margin: 0,
  lineHeight: 1.3,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ResultSubtitle = styled('p', {
  fontSize: '$xs',
  color: '$textMuted',
  margin: '4px 0 0 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const ResultMeta = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '6px',
  fontSize: '11px',
});

const ResultBadge = styled('span', {
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',

  variants: {
    type: {
      service: { backgroundColor: '$primaryLight', color: '$primary' },
      officer: { backgroundColor: '$primaryLight', color: '$primary' },
      department: { backgroundColor: '#e6f7ff', color: '#1890ff' },
      project: { backgroundColor: '#fff7e6', color: '#ffa940' },
      notice: { backgroundColor: '#fff0f6', color: '#eb2f96' },
      tourism: { backgroundColor: '#f9f0ff', color: '#722ed1' },
    }
  }
});

const CopyButton = styled('button', {
  background: '$surface',
  border: '1px solid $border',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '10px',
  color: '$textMuted',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  transition: 'all 0.1s ease',

  '&:hover': {
    color: '$primary',
    borderColor: '$primary',
    backgroundColor: '$primaryLight',
  }
});

const SearchEmptyState = styled('div', {
  padding: '40px 16px',
  textAlign: 'center',
  color: '$textMuted',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
});

export default function App() {
  // Inject global CSS rules
  injectGlobalStyles();

  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Theme and Language toggling states
  const [lang, setLang] = useState<'en' | 'bn'>('bn');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Search system state variables
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input on search open
  useEffect(() => {
    if (searchOpen) {
      setActiveIndex(0);
      setSearchQuery('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Listen to global Ctrl+K and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem('portal_lang');
    if (savedLang === 'en' || savedLang === 'bn') {
      setLang(savedLang);
    }
    const savedDark = localStorage.getItem('portal_dark');
    if (savedDark === 'true') {
      setIsDark(true);
    }
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === 'en' ? 'bn' : 'en';
    setLang(newLang);
    localStorage.setItem('portal_lang', newLang);
  };

  const handleToggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('portal_dark', String(newDark));
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search items and filtering calculations
  const searchItems = getSearchItems(lang);
  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : searchItems.filter(item => {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = item.title.toLowerCase().includes(query);
        const subtitleMatch = item.subtitle.toLowerCase().includes(query);
        const metaMatch = item.meta ? item.meta.toLowerCase().includes(query) : false;
        const extraMatch = item.extra ? item.extra.toLowerCase().includes(query) : false;
        return titleMatch || subtitleMatch || metaMatch || extraMatch;
      });

  // Handle search key presses for navigation and Enter selection
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % filteredResults.length;
      setActiveIndex(nextIndex);
      
      const activeEl = document.getElementById(`search-result-row-${nextIndex}`);
      activeEl?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + filteredResults.length) % filteredResults.length;
      setActiveIndex(prevIndex);
      
      const activeEl = document.getElementById(`search-result-row-${prevIndex}`);
      activeEl?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = filteredResults[activeIndex];
      if (selectedItem) {
        handleSearchResultClick(selectedItem.view, selectedItem.elementId);
      }
    }
  };

  // Scroll-to-view navigation handler
  const handleSearchResultClick = (view: string, elementId?: string) => {
    setCurrentView(view);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    
    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          const originalTransition = element.style.transition;
          element.style.transition = 'all 0.3s ease';
          element.style.outline = '3px solid var(--colors-primary)';
          element.style.outlineOffset = '6px';
          element.style.borderRadius = '8px';
          
          setTimeout(() => {
            element.style.outline = 'none';
            element.style.outlineOffset = '';
            setTimeout(() => {
              element.style.transition = originalTransition;
            }, 300);
          }, 2500);
        }
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Copy text helper
  const handleCopyText = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const t = translations[lang];

  const navItems = [
    { label: t.homeNav, value: 'home' },
    { label: t.aboutNav, value: 'about' },
    { label: t.adminNav, value: 'administration' },
    { label: t.projectsNav, value: 'projects' },
    { label: t.servicesNav, value: 'services' },
  ];

  return (
    <LayoutContainer id="layout-container" className={isDark ? darkTheme : ''}>
      {/* Sticky Header */}
      <StickyHeader id="portal-header">
        <HeaderContent>
          {/* Logo link back to home */}
          <LogoLink id="logo-nav-home" onClick={() => handleNavigate('home')}>
            <EmblemWrapper>
              <Landmark size={24} />
            </EmblemWrapper>
            <TitleWrapper>
              <PortalTitle>{t.portalTitle}</PortalTitle>
              <PortalSubTitle>{t.portalSubtitle}</PortalSubTitle>
            </TitleWrapper>
          </LogoLink>

          {/* Desktop Navigation */}
          <DesktopNav id="desktop-nav">
            {navItems.map((item) => (
              <NavButton
                key={item.value}
                id={`nav-${item.value}`}
                active={currentView === item.value}
                onClick={() => handleNavigate(item.value)}
              >
                {item.label}
              </NavButton>
            ))}
          </DesktopNav>

          {/* Global Search Bar Trigger Button */}
          <SearchTrigger id="global-search-trigger" onClick={() => setSearchOpen(true)} title={lang === 'en' ? "Search portal (Ctrl+K)" : "পোর্টাল অনুসন্ধান করুন (Ctrl+K)"}>
            <Search size={16} />
            <SearchTriggerText>
              {lang === 'en' ? 'Search portal...' : 'পোর্টাল অনুসন্ধান করুন...'}
            </SearchTriggerText>
            <SearchTriggerShortcut>Ctrl K</SearchTriggerShortcut>
          </SearchTrigger>

          {/* Action Toggles */}
          <ControlGroup id="header-action-controls">
            <ToggleButton id="toggle-theme-btn" onClick={handleToggleTheme} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {isDark ? <Sun size={14} style={{ color: '#eab308' }} /> : <Moon size={14} />}
              <span style={{ display: 'none', '@bp1': { display: 'inline' } }}>
                {isDark ? (lang === 'en' ? 'Light' : 'লাইট') : (lang === 'en' ? 'Dark' : 'ডার্ক')}
              </span>
            </ToggleButton>
            
            <ToggleButton id="toggle-lang-btn" onClick={handleToggleLang} title={lang === 'en' ? "বাংলায় দেখুন" : "View in English"}>
              <Globe size={14} style={{ color: '#1a5c38' }} />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </ToggleButton>
          </ControlGroup>

          {/* Hamburger menu for mobile */}
          <HamburgerButton id="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </HamburgerButton>
        </HeaderContent>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <MobileMenuDrawer id="mobile-menu-drawer">
            {navItems.map((item) => (
              <MobileNavButton
                key={item.value}
                id={`mobile-nav-${item.value}`}
                active={currentView === item.value}
                onClick={() => handleNavigate(item.value)}
              >
                {item.label}
              </MobileNavButton>
            ))}
          </MobileMenuDrawer>
        )}
      </StickyHeader>

      {/* Main Content Area */}
      <MainContent id="main-content-view">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} lang={lang} />}
        {currentView === 'about' && <AboutView onNavigateHome={() => handleNavigate('home')} lang={lang} />}
        {currentView === 'administration' && <AdministrationView onNavigateHome={() => handleNavigate('home')} lang={lang} />}
        {currentView === 'projects' && <ProjectsView onNavigateHome={() => handleNavigate('home')} lang={lang} />}
        {currentView === 'services' && <ServicesView onNavigateHome={() => handleNavigate('home')} lang={lang} />}
      </MainContent>

      {/* Structured Modern Footer */}
      <PortalFooter id="portal-footer">
        <FooterGrid>
          {/* Column 1: Government Node */}
          <FooterColumn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--colors-text)', marginBottom: '4px' }}>
              <Landmark size={20} style={{ color: '#1a5c38' }} />
              <strong style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem' }}>
                {lang === 'en' ? 'Jhenaigati Upazila Parishad' : 'ঝিনাইগাতী উপজেলা পরিষদ'}
              </strong>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--colors-textMuted)' }}>
              {lang === 'en' 
                ? 'Official web node for local public administration, transparency, and sustainable rural development in the Sherpur District, Division of Mymensingh, Bangladesh.'
                : 'শেরপুর জেলা, ময়মনসিংহ বিভাগ, বাংলাদেশের স্থানীয় গণপ্রশাসন, স্বচ্ছতা এবং টেকসই গ্রামীণ উন্নয়নের জন্য অফিসিয়াল ওয়েব পোর্টাল।'}
            </p>
          </FooterColumn>

          {/* Column 2: Portal Quick Nav links */}
          <FooterColumn>
            <FooterTitle>{t.quickDirectory}</FooterTitle>
            <FooterLinkList>
              <li><FooterLink id="footer-link-home" onClick={() => handleNavigate('home')}>{lang === 'en' ? 'Home Dashboard' : 'হোম ড্যাশবোর্ড'}</FooterLink></li>
              <li><FooterLink id="footer-link-about" onClick={() => handleNavigate('about')}>{lang === 'en' ? 'About Jhenaigati' : 'ঝিনাইগাতী পরিচিতি'}</FooterLink></li>
              <li><FooterLink id="footer-link-admin" onClick={() => handleNavigate('administration')}>{lang === 'en' ? 'Upazila Parishad Directory' : 'উপজেলা পরিষদ ডিরেক্টরি'}</FooterLink></li>
              <li><FooterLink id="footer-link-projects" onClick={() => handleNavigate('projects')}>{lang === 'en' ? 'Development Projects' : 'উন্নয়ন প্রকল্পসমূহ'}</FooterLink></li>
              <li><FooterLink id="footer-link-services" onClick={() => handleNavigate('services')}>{lang === 'en' ? 'Standing Committees' : 'স্থায়ী কমিটিসমূহ'}</FooterLink></li>
            </FooterLinkList>
          </FooterColumn>

          {/* Column 3: Contact & Help desk */}
          <FooterColumn>
            <FooterTitle>{t.helpDesk}</FooterTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--colors-textMuted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: '#1a5c38' }} />
                <span>{t.directorate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} style={{ color: '#1a5c38' }} />
                <span>unojhenaigati@mopa.gov.bd</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} style={{ color: '#1a5c38' }} />
                <span>+880 1712-112233 (UNO Office)</span>
              </div>
            </div>
          </FooterColumn>
        </FooterGrid>

        {/* National Emergency Hotlines Box */}
        <HotlinesContainer id="portal-emergency-hotlines">
          <HotlinesTitle>
            <HotlinesTitleLeft>
              <Phone size={14} style={{ color: '#1a5c38' }} />
              {lang === 'en' ? 'National Emergency Hotlines' : 'জাতীয় জরুরি সেবা নম্বরসমূহ'}
            </HotlinesTitleLeft>
            <HotlinesTitleRight>
              {lang === 'en' ? 'Click to copy number' : 'নম্বর কপি করতে ক্লিক করুন'}
            </HotlinesTitleRight>
          </HotlinesTitle>
          
          <HotlinesGrid id="hotlines-grid-items">
            {emergencyHotlinesData.map((hotline) => {
              const renderIcon = () => {
                const props = { size: 14, style: { strokeWidth: 2.2 } };
                switch (hotline.iconName) {
                  case 'ShieldAlert': return <ShieldAlert {...props} />;
                  case 'Info': return <Info {...props} />;
                  case 'Users': return <Users {...props} />;
                  case 'ShieldCheck': return <ShieldCheck {...props} />;
                  case 'Flame': return <Flame {...props} />;
                  case 'Scale': return <Scale {...props} />;
                  case 'CloudLightning': return <CloudLightning {...props} />;
                  case 'Car': return <Car {...props} />;
                  default: return <Phone {...props} />;
                }
              };

              return (
                <HotlineCard 
                  key={hotline.id}
                  id={`hotline-card-${hotline.number}`}
                  css={{
                    '$$accentColor': hotline.color,
                    '$$accentBg': hotline.bgColor,
                  }}
                  onClick={(e) => handleCopyText(hotline.number, e)}
                  title={lang === 'en' ? `Copy ${hotline.name.en} (${hotline.number})` : `${hotline.name.bn} কপি করুন (${hotline.numberBn})`}
                >
                  <HotlineIconWrapper 
                    css={{
                      '$$iconColor': hotline.color,
                      '$$iconBg': hotline.bgColor,
                    }}
                  >
                    {renderIcon()}
                  </HotlineIconWrapper>
                  <HotlineNumber>{lang === 'en' ? hotline.number : hotline.numberBn}</HotlineNumber>
                  <HotlineLabel>{hotline.name[lang]}</HotlineLabel>
                  <HotlineDesc>{hotline.description[lang]}</HotlineDesc>
                </HotlineCard>
              );
            })}
          </HotlinesGrid>
        </HotlinesContainer>

        <BottomFooter>
          <div>
            {lang === 'en' 
              ? `© ${new Date().getFullYear()} Jhenaigati Upazila Parishad. All Rights Reserved. National Web Portal Ecosystem of Bangladesh.`
              : `© ${new Date().getFullYear().toLocaleString('bn-BD').replace(/,/g, '')} ঝিনাইগাতী উপজেলা পরিষদ। সর্বস্বত্ব সংরক্ষিত। বাংলাদেশ জাতীয় তথ্য বাতায়ন ভুবন।`}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>{lang === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}</span>
            <span>{lang === 'en' ? 'Terms of Service' : 'ব্যবহারের শর্তাবলী'}</span>
            <span>{lang === 'en' ? 'Union Digital Nodes' : 'ইউনিয়ন ডিজিটাল সেন্টারসমূহ'}</span>
          </div>
        </BottomFooter>
      </PortalFooter>

      {/* Search Modal Backdrop Overlay */}
      {searchOpen && (
        <SearchModalBackdrop id="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <SearchModalContainer id="search-modal-container" onClick={(e) => e.stopPropagation()}>
            <SearchModalHeader id="search-modal-header">
              <Search size={20} style={{ color: 'var(--colors-primary)' }} />
              <SearchModalInput
                id="search-modal-input"
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchTranslations[lang].placeholder}
              />
              <span style={{ fontSize: '10px', background: 'var(--colors-background)', border: '1px solid var(--colors-border)', padding: '2px 6px', borderRadius: '4px', color: 'var(--colors-textMuted)' }}>
                ESC
              </span>
              <SearchModalCloseBtn id="search-modal-close-btn" onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </SearchModalCloseBtn>
            </SearchModalHeader>

            <SearchResultsList id="search-results-list" ref={resultsContainerRef}>
              {searchQuery.trim() === '' ? (
                <div style={{ padding: '16px 8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--colors-text)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {searchTranslations[lang].popularSearches}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--colors-textMuted)', lineHeight: '1.6' }}>
                    {searchTranslations[lang].popularTips}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                    {['UNO', 'LGED', 'Deep Well', 'Gajni', 'Budget', 'Committee'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        style={{
                          background: 'var(--colors-background)',
                          border: '1px solid var(--colors-border)',
                          borderRadius: '16px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          color: 'var(--colors-text)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--colors-primary)';
                          e.currentTarget.style.color = 'var(--colors-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--colors-border)';
                          e.currentTarget.style.color = 'var(--colors-text)';
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                <>
                  {filteredResults.map((item, index) => {
                    const isActive = index === activeIndex;
                    let icon = <Compass size={18} />;
                    if (item.type === 'service') icon = <ShieldCheck size={18} />;
                    if (item.type === 'officer') icon = <User size={18} />;
                    if (item.type === 'department') icon = <Building2 size={18} />;
                    if (item.type === 'project') icon = <Briefcase size={18} />;
                    if (item.type === 'notice') icon = <FileText size={18} />;

                    return (
                      <SearchResultRow
                        key={`${item.type}-${item.id}`}
                        id={`search-result-row-${index}`}
                        active={isActive}
                        onClick={() => handleSearchResultClick(item.view, item.elementId)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <ResultIconWrapper type={item.type}>
                          {icon}
                        </ResultIconWrapper>
                        <ResultContent>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <ResultTitle>
                              {item.title}
                            </ResultTitle>
                            <ResultBadge type={item.type}>
                              {searchTranslations[lang].categoryNames[item.type]}
                            </ResultBadge>
                          </div>
                          <ResultSubtitle title={item.subtitle}>
                            {item.subtitle}
                          </ResultSubtitle>
                          
                          {(item.meta || item.extra) && (
                            <ResultMeta>
                              {item.meta && <span style={{ color: 'var(--colors-textMuted)' }}>{item.meta}</span>}
                              {item.meta && item.extra && <span style={{ color: 'var(--colors-border)' }}>•</span>}
                              {item.extra && <span style={{ color: 'var(--colors-textMuted)' }}>{item.extra}</span>}
                            </ResultMeta>
                          )}

                          {/* Render copy shortcuts for phone / email inside result card */}
                          {(item.phone || item.email) && (
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                              {item.phone && (
                                <CopyButton onClick={(e) => handleCopyText(item.phone!, e)}>
                                  {copiedText === item.phone ? <Check size={10} style={{ color: 'var(--colors-primary)' }} /> : <Copy size={10} />}
                                  <span>{copiedText === item.phone ? searchTranslations[lang].copied : (lang === 'en' ? 'Phone' : 'ফোন')}</span>
                                </CopyButton>
                              )}
                              {item.email && (
                                <CopyButton onClick={(e) => handleCopyText(item.email!, e)}>
                                  {copiedText === item.email ? <Check size={10} style={{ color: 'var(--colors-primary)' }} /> : <Copy size={10} />}
                                  <span>{copiedText === item.email ? searchTranslations[lang].copied : (lang === 'en' ? 'Email' : 'ইমেইল')}</span>
                                </CopyButton>
                              )}
                            </div>
                          )}
                        </ResultContent>
                        <div style={{ display: 'flex', alignSelf: 'center', color: isActive ? 'var(--colors-primary)' : 'var(--colors-textMuted)', marginLeft: '4px' }}>
                          <ArrowRight size={16} />
                        </div>
                      </SearchResultRow>
                    );
                  })}
                </>
              ) : (
                <SearchEmptyState id="search-empty-state">
                  <Compass size={32} style={{ color: 'var(--colors-textMuted)', opacity: 0.6 }} />
                  <div style={{ fontSize: '14px', color: 'var(--colors-textMuted)' }}>
                    {searchTranslations[lang].noResults}
                  </div>
                </SearchEmptyState>
              )}
            </SearchResultsList>

            {filteredResults.length > 0 && (
              <div style={{ padding: '10px 16px', background: 'var(--colors-background)', borderTop: '1px solid var(--colors-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--colors-textMuted)' }}>
                <span>{searchTranslations[lang].shortcutHint}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{searchTranslations[lang].goToPage}</span>
                  <CornerDownLeft size={10} />
                </div>
              </div>
            )}
          </SearchModalContainer>
        </SearchModalBackdrop>
      )}

      {/* Floating Action Feedback Toast */}
      {copiedText && (
        <HotlineCopyToast id="hotline-copy-toast">
          <Check size={14} style={{ color: '#1a5c38' }} />
          <span>
            {lang === 'en' 
              ? `Copied: ${copiedText}` 
              : `কপি করা হয়েছে: ${copiedText}`}
          </span>
        </HotlineCopyToast>
      )}
    </LayoutContainer>
  );
}
