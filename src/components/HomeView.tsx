import React, { useState, useMemo } from 'react';
import { styled } from '../stitches.config';
import { 
  Search, FileText, Landmark, ShieldCheck, MapPin, 
  Calendar, FileDown, ArrowRight, X, ExternalLink, Award 
} from 'lucide-react';
import { translations, noticesData, LocalizedNotice as Notice } from '../translations';

const jhenaigatiMap = '/src/assets/images/jhenaigati_map_1784636921049.jpg';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  lang: 'en' | 'bn';
}


// Stitches Styled Components
const ViewContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

const HeroSection = styled('section', {
  background: 'linear-gradient(to right, #1a5c38, #2d8a56)',
  color: '$surface',
  borderRadius: '16px',
  padding: '32px 24px',
  textAlign: 'left',
  boxShadow: '$sm',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '24px',

  '@bp2': {
    padding: '40px 48px',
    minHeight: '220px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.12) 0%, transparent 50%)',
    pointerEvents: 'none',
  }
});

const HeroContent = styled('div', {
  position: 'relative',
  zIndex: 1,
  maxWidth: '550px',
  margin: 0,
});

const MapThumbnailContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '140px',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '3px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,

  '&:hover': {
    transform: 'scale(1.03)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
  },

  '@bp2': {
    width: '240px',
    height: '170px',
    flexShrink: 0,
  }
});

const MapImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.3s ease',

  [`${MapThumbnailContainer}:hover &`]: {
    transform: 'scale(1.08)',
  }
});

const MapOverlay = styled('div', {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '12px',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 600,
  gap: '4px',
  textAlign: 'center',
  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
});

const MapModalContainer = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  width: '100%',
  maxWidth: '700px',
  boxShadow: '$lg',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp 0.3s ease-out',
});

const MapModalBody = styled('div', {
  padding: '$2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8fafc',
  maxHeight: '75vh',
  overflowY: 'auto',
});

const FullMapImage = styled('img', {
  maxWidth: '100%',
  maxHeight: '65vh',
  objectFit: 'contain',
  borderRadius: '$base',
  boxShadow: '$sm',
});

const GovBadge = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$1',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  padding: '6px 14px',
  borderRadius: '$round',
  fontSize: '$xs',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#ffffff',
  marginBottom: '$2',
});

const HeroTitle = styled('h2', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: '$1',

  '@bp2': {
    fontSize: '$3xl',
  },
  '@bp3': {
    fontSize: '2.5rem',
  }
});

const HeroSubtitle = styled('p', {
  fontSize: '$sm',
  color: 'rgba(255, 255, 255, 0.85)',
  fontWeight: 400,
  marginBottom: '$3',
  maxWidth: '600px',
  margin: '0 0 $3 0',

  '@bp2': {
    fontSize: '$base',
  }
});

const SearchWrapper = styled('div', {
  position: 'relative',
  maxWidth: '450px',
  marginTop: '$3',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '4px',
  transition: 'all 0.2s ease',

  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  }
});

const SearchInput = styled('input', {
  width: '100%',
  padding: '10px 12px 10px 40px',
  fontSize: '$sm',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.6)',
  }
});

const SearchIconWrapper = styled('div', {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
});

const MainGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@bp3': {
    gridTemplateColumns: '1.6fr 1fr',
  }
});

const GridSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const SectionHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '8px',
  borderBottom: '2px solid $border',
});

const SectionTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$lg',
  fontWeight: 600,
  color: '$text',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

const QuickGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@bp1': {
    gridTemplateColumns: '1fr 1fr',
  }
});

const ServiceCard = styled('div', {
  backgroundColor: '$surface',
  border: '1px solid #f3f4f6',
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',

  '&:hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    borderColor: '#e5e7eb',
    transform: 'translateY(-2px)',
  }
});

const ServiceHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  marginBottom: '12px',
});

const IconBox = styled('div', {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  transition: 'transform 0.2s ease',

  variants: {
    color: {
      primary: {
        backgroundColor: '#fef3c7',
        color: '#d97706',
      },
      secondary: {
        backgroundColor: '#ecfdf5',
        color: '#059669',
      },
      blue: {
        backgroundColor: '#eff6ff',
        color: '#2563eb',
      },
      purple: {
        backgroundColor: '#f5f3ff',
        color: '#7c3aed',
      }
    }
  }
});

const ServiceTitle = styled('h4', {
  fontSize: '$base',
  fontWeight: 700,
  color: '$text',
  marginBottom: '4px',
});

const ServiceDesc = styled('p', {
  fontSize: '$sm',
  color: '$textMuted',
  lineHeight: 1.5,
  marginBottom: '12px',
});

const CardFooterLink = styled('span', {
  fontSize: '$xs',
  fontWeight: 600,
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: 'auto',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
});

const NoticeWidget = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '16px',
  border: '1px solid #f3f4f6',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const NoticeWidgetHeader = styled('div', {
  padding: '16px 20px',
  borderBottom: '1px solid #f3f4f6',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(249, 250, 251, 0.5)',
});

const NoticeWidgetTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$base',
  fontWeight: 700,
  color: '$text',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const PulsingDot = styled('span', {
  width: '8px',
  height: '8px',
  backgroundColor: '#f23a3a',
  borderRadius: '50%',
  display: 'inline-block',
  animation: 'pulse 1.5s infinite ease-in-out',

  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
    '50%': { opacity: 1, transform: 'scale(1.2)' },
  }
});

const NoticeItem = styled('div', {
  display: 'flex',
  gap: '16px',
  padding: '16px',
  cursor: 'pointer',
  borderRadius: '12px',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#f9fafb',
    
    '& h4': {
      color: '$primary',
    }
  },

  '&:not(:last-child)': {
    borderBottom: '1px dashed #e5e7eb',
  }
});

const DateBlock = styled('div', {
  width: '48px',
  height: '56px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  variants: {
    color: {
      red: {
        backgroundColor: '#fff5f5',
        color: '#f23a3a',
        border: '1px solid #fee2e2',
      },
      gray: {
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        border: '1px solid #e5e7eb',
      }
    }
  },
  defaultVariants: {
    color: 'gray'
  }
});

const MonthText = styled('span', {
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  lineHeight: 1,
});

const DayText = styled('span', {
  fontSize: '18px',
  fontWeight: 900,
  lineHeight: 1.1,
});

const NoticeInfo = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const NoticeTitle = styled('h4', {
  fontSize: '$sm',
  fontWeight: 600,
  color: '$text',
  lineHeight: 1.4,
  transition: 'color 0.2s ease',
});

const NoticeMeta = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '2px',
});

const CategoryBadge = styled('span', {
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#9ca3af',
  letterSpacing: '0.02em',
});

// Modal Overlay & Container
const ModalOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '$2',
  backdropFilter: 'blur(4px)',
});

const ModalContainer = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '$lg',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp 0.3s ease-out',
});

const ModalHeader = styled('div', {
  backgroundColor: '$primary',
  color: '$surface',
  padding: '$3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ModalTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$lg',
  fontWeight: 600,
  margin: 0,
});

const CloseButton = styled('button', {
  background: 'rgba(255, 255, 255, 0.1)',
  border: 'none',
  color: '$surface',
  cursor: 'pointer',
  width: '32px',
  height: '32px',
  borderRadius: '$round',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

const ModalBody = styled('div', {
  padding: '$3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  maxHeight: '70vh',
  overflowY: 'auto',
});

const ModalMetaRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  paddingBottom: '$2',
  borderBottom: '1px solid $border',
});

const ModalContent = styled('p', {
  fontSize: '$base',
  color: '$text',
  lineHeight: 1.6,
});

const ModalFooter = styled('div', {
  padding: '$3',
  borderTop: '1px solid $border',
  backgroundColor: '$background',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
});

const DownloadActionBtn = styled('a', {
  backgroundColor: '$secondary',
  color: '$surface',
  padding: '10px 18px',
  borderRadius: '$base',
  fontSize: '$sm',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$1',
  cursor: 'pointer',
  transition: 'opacity 0.2s',

  '&:hover': {
    opacity: 0.9,
  }
});

const SecondaryBtn = styled('button', {
  backgroundColor: 'transparent',
  border: '1px solid $border',
  color: '$text',
  padding: '10px 18px',
  borderRadius: '$base',
  fontSize: '$sm',
  fontWeight: 600,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$border',
  }
});

const NoResultsText = styled('p', {
  textAlign: 'center',
  color: '$textMuted',
  fontSize: '$sm',
  padding: '$3 0',
});

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const t = translations[lang];

  // Filter notices based on search query
  const filteredNotices = useMemo(() => {
    if (!searchQuery.trim()) return noticesData;
    const query = searchQuery.toLowerCase();
    return noticesData.filter(notice => 
      notice.title[lang].toLowerCase().includes(query) || 
      notice.content[lang].toLowerCase().includes(query) ||
      notice.category[lang].toLowerCase().includes(query)
    );
  }, [searchQuery, lang]);

  return (
    <ViewContainer id="home-view">
      {/* Hero Banner with Search */}
      <HeroSection id="home-hero">
        <HeroContent>
          <GovBadge id="gov-badge">
            <Award size={14} /> {t.officialWebPortal}
          </GovBadge>
          <HeroTitle id="hero-title">{t.welcomeHero}</HeroTitle>
          <HeroSubtitle id="hero-subtitle">
            {t.welcomeHeroSub}
          </HeroSubtitle>
          <SearchWrapper>
            <SearchIconWrapper>
              <Search size={20} />
            </SearchIconWrapper>
            <SearchInput 
              id="hero-search-input"
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
        </HeroContent>

        {/* Map Thumbnail */}
        <MapThumbnailContainer id="hero-map-thumbnail" onClick={() => setIsMapModalOpen(true)}>
          <MapImage 
            src={jhenaigatiMap} 
            alt="Jhenaigati Road Map" 
            referrerPolicy="no-referrer"
          />
          <MapOverlay id="map-overlay">
            <MapPin size={16} />
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              {lang === 'en' ? 'Jhenaigati Road Map' : 'ঝিনাইগাতী সড়ক মানচিত্র'}
            </span>
          </MapOverlay>
        </MapThumbnailContainer>
      </HeroSection>

      {/* Main Grid: Left Column Services, Right Column Notice Board */}
      <MainGrid>
        {/* Left Column: Quick Services */}
        <GridSection>
          <SectionHeader>
            <SectionTitle id="services-grid-title">
              <Landmark size={20} style={{ color: '#1a5c38' }} />
              {t.quickAccess}
            </SectionTitle>
          </SectionHeader>

          <QuickGrid id="services-grid">
            <ServiceCard id="card-citizen-charter" onClick={() => onNavigate('services')}>
              <ServiceHeader>
                <IconBox color="primary">
                  <ShieldCheck size={22} />
                </IconBox>
                <ServiceTitle>{t.citizenCharterTitle}</ServiceTitle>
              </ServiceHeader>
              <ServiceDesc>
                {t.citizenCharterDesc}
              </ServiceDesc>
              <CardFooterLink>
                {t.openCharter} <ArrowRight size={14} />
              </CardFooterLink>
            </ServiceCard>

            <ServiceCard id="card-administration" onClick={() => onNavigate('administration')}>
              <ServiceHeader>
                <IconBox color="blue">
                  <Landmark size={22} />
                </IconBox>
                <ServiceTitle>{t.upazilaParishadTitle}</ServiceTitle>
              </ServiceHeader>
              <ServiceDesc>
                {lang === 'en' 
                  ? 'Administrative directory, profile cards of current Chairman and UNO, and detailed list of departmental nodes.'
                  : 'উপজেলা প্রশাসন ডিরেক্টরি, বর্তমান চেয়ারম্যান ও ইউএনও-এর পরিচিতি এবং বিভিন্ন সরকারি বিভাগের তালিকা।'}
              </ServiceDesc>
              <CardFooterLink>
                {t.viewOfficers} <ArrowRight size={14} />
              </CardFooterLink>
            </ServiceCard>

            <ServiceCard id="card-projects" onClick={() => onNavigate('projects')}>
              <ServiceHeader>
                <IconBox color="purple">
                  <FileText size={22} />
                </IconBox>
                <ServiceTitle>{t.devBudgetTitle}</ServiceTitle>
              </ServiceHeader>
              <ServiceDesc>
                {t.devBudgetDesc}
              </ServiceDesc>
              <CardFooterLink>
                {t.checkProjects} <ArrowRight size={14} />
              </CardFooterLink>
            </ServiceCard>

            <ServiceCard id="card-tourism" onClick={() => onNavigate('about')}>
              <ServiceHeader>
                <IconBox color="secondary">
                  <MapPin size={22} />
                </IconBox>
                <ServiceTitle>{t.tourismTitle}</ServiceTitle>
              </ServiceHeader>
              <ServiceDesc>
                {t.tourismDesc}
              </ServiceDesc>
              <CardFooterLink>
                {t.exploreSpots} <ArrowRight size={14} />
              </CardFooterLink>
            </ServiceCard>
          </QuickGrid>
        </GridSection>

        {/* Right Column: Notice Board Widget */}
        <GridSection>
          <NoticeWidget id="notice-board-widget">
            <NoticeWidgetHeader>
              <NoticeWidgetTitle id="notice-board-title">
                <PulsingDot />
                {t.noticeBoardTitle}
              </NoticeWidgetTitle>
            </NoticeWidgetHeader>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, index) => {
                  const [day, month] = notice.date[lang].split(' ');
                  return (
                    <NoticeItem 
                      key={notice.id} 
                      id={`notice-${notice.id}`}
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <DateBlock color={index === 0 ? 'red' : 'gray'}>
                        <MonthText>{month}</MonthText>
                        <DayText>{day}</DayText>
                      </DateBlock>
                      <NoticeInfo>
                        <NoticeTitle>
                          {notice.title[lang]}
                        </NoticeTitle>
                        <NoticeMeta>
                          <CategoryBadge>{notice.category[lang]}</CategoryBadge>
                          <span style={{ fontSize: '11px', color: 'var(--colors-textMuted)' }}>• {notice.fileSize[lang]}</span>
                        </NoticeMeta>
                      </NoticeInfo>
                    </NoticeItem>
                  );
                })
              ) : (
                <NoResultsText id="notice-no-results" style={{ padding: '24px', textAlign: 'center' }}>
                  {t.noNoticesFound}
                </NoResultsText>
              )}
            </div>
          </NoticeWidget>
        </GridSection>
      </MainGrid>

      {/* Notice Viewer Modal */}
      {selectedNotice && (
        <ModalOverlay id="notice-modal-overlay" onClick={() => setSelectedNotice(null)}>
          <ModalContainer id="notice-modal" onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{lang === 'en' ? 'Notice Details' : 'নোটিশ বিবরণী'}</ModalTitle>
              <CloseButton id="close-modal-btn" onClick={() => setSelectedNotice(null)}>
                <X size={18} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalMetaRow>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f23a3a', backgroundColor: '#fff5f5', padding: '4px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono, monospace', border: '1px solid #fee2e2' }}>
                  {selectedNotice.date[lang]}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1a5c38', backgroundColor: '#ecfdf5', padding: '4px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono, monospace', border: '1px solid #d1fae5', marginLeft: '6px' }}>
                  {selectedNotice.category[lang]}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--colors-textMuted)', fontFamily: 'JetBrains Mono, monospace', marginLeft: 'auto' }}>
                  {t.sizeLabel}: {selectedNotice.fileSize[lang]}
                </span>
              </ModalMetaRow>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 600, color: 'var(--colors-text)', marginTop: '10px' }}>
                {selectedNotice.title[lang]}
              </h3>
              <ModalContent style={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
                {selectedNotice.content[lang]}
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <SecondaryBtn id="close-modal-secondary-btn" onClick={() => setSelectedNotice(null)}>{t.closeBtn}</SecondaryBtn>
              <DownloadActionBtn 
                id="modal-download-btn"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Starting download of Notice_${selectedNotice.id}.pdf (${selectedNotice.fileSize[lang]})`);
                }}
              >
                <FileDown size={16} /> {t.downloadBtn} ({selectedNotice.fileSize[lang]})
              </DownloadActionBtn>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Jhenaigati Road Map Modal */}
      {isMapModalOpen && (
        <ModalOverlay id="map-modal-overlay" onClick={() => setIsMapModalOpen(false)}>
          <MapModalContainer id="map-modal" onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {lang === 'en' ? 'Jhenaigati Upazila Road Map' : 'ঝিনাইগাতী উপজেলা সড়ক মানচিত্র'}
              </ModalTitle>
              <CloseButton id="close-map-modal-btn" onClick={() => setIsMapModalOpen(false)}>
                <X size={18} />
              </CloseButton>
            </ModalHeader>
            <MapModalBody>
              <FullMapImage 
                src={jhenaigatiMap} 
                alt="Jhenaigati Upazila Road Map" 
                referrerPolicy="no-referrer"
              />
            </MapModalBody>
            <ModalFooter>
              <SecondaryBtn id="close-map-modal-secondary-btn" onClick={() => setIsMapModalOpen(false)}>
                {t.closeBtn}
              </SecondaryBtn>
              <DownloadActionBtn 
                id="download-map-btn"
                href={jhenaigatiMap}
                download="Jhenaigati_Road_Map.jpg"
                target="_blank"
                rel="noreferrer"
              >
                <FileDown size={16} /> {lang === 'en' ? 'Download Map' : 'মানচিত্র ডাউনলোড করুন'}
              </DownloadActionBtn>
            </ModalFooter>
          </MapModalContainer>
        </ModalOverlay>
      )}
    </ViewContainer>
  );
};
