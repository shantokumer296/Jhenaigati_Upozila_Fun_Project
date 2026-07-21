import React, { useState } from 'react';
import { styled, keyframes } from '../stitches.config';
import { PageHeader } from './PageHeader';
import { 
  FileDown, ShieldCheck, ChevronDown, ChevronUp, Users, 
  HelpCircle, CheckCircle2, Clock, Calendar, ArrowRight, Loader2 
} from 'lucide-react';
import { translations, committeesData, LocalizedCommittee as StandingCommittee } from '../translations';

interface ServicesViewProps {
  onNavigateHome: () => void;
  lang: 'en' | 'bn';
}
// Keyframe Animations
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// Stitches Styled Components
const ViewContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

const LayoutGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@bp3': {
    gridTemplateColumns: '2fr 1fr',
  }
});

const LeftSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const Card = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
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

const DownloadCard = styled('div', {
  backgroundColor: '$primary',
  backgroundImage: 'linear-gradient(135deg, #1a5c38 0%, #113a23 100%)',
  color: '$surface',
  borderRadius: '$large',
  padding: '$3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  boxShadow: '$md',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-40px',
    right: '-40px',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }
});

const DownloadTitle = styled('h4', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$lg',
  fontWeight: 700,
  margin: 0,
});

const DownloadDesc = styled('p', {
  fontSize: '$sm',
  color: 'rgba(255, 255, 255, 0.85)',
  lineHeight: 1.5,
});

const ActionButton = styled('button', {
  backgroundColor: '$secondary',
  color: '$surface',
  border: 'none',
  padding: '12px 16px',
  borderRadius: '$base',
  fontSize: '$sm',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s',

  '&:hover': {
    opacity: 0.95,
    transform: 'translateY(-1px)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  '&:disabled': {
    opacity: 0.75,
    cursor: 'not-allowed',
  }
});

const Spinner = styled(Loader2, {
  animation: `${spin} 1s linear infinite`,
});

const AccordionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const AccordionItem = styled('div', {
  border: '1px solid $border',
  borderRadius: '$base',
  overflow: 'hidden',
  backgroundColor: '$surface',
  transition: 'border-color 0.2s',

  '&:hover': {
    borderColor: '$primary',
  }
});

const AccordionHeader = styled('button', {
  width: '100%',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
});

const AccordionTitleRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const NumberBadge = styled('span', {
  backgroundColor: '$primaryLight',
  color: '$primary',
  fontWeight: 700,
  fontSize: '$sm',
  fontFamily: 'JetBrains Mono, monospace',
  width: '28px',
  height: '28px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const CommitteeName = styled('span', {
  fontSize: '$sm',
  fontWeight: 600,
  color: '$text',

  '@bp1': {
    fontSize: '$base',
  }
});

const AccordionContent = styled('div', {
  padding: '16px',
  backgroundColor: '$background',
  borderTop: '1px solid $border',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontSize: '$sm',
  lineHeight: 1.5,
  color: '$text',
});

const MetaGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '8px',

  '@bp1': {
    gridTemplateColumns: '1fr 1fr',
  }
});

const MetaBox = styled('div', {
  backgroundColor: '$surface',
  padding: '8px 12px',
  borderRadius: '$base',
  border: '1px solid $border',

  'strong': {
    fontSize: '11px',
    color: '$textMuted',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '2px',
  },

  'span': {
    fontWeight: 600,
    color: '$text',
  }
});

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigateHome, lang }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Simulated download state: 'idle' | 'preparing' | 'downloading' | 'completed'
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'downloading' | 'completed'>('idle');

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleDownloadSimulation = () => {
    setDownloadState('preparing');
    setTimeout(() => {
      setDownloadState('downloading');
      setTimeout(() => {
        setDownloadState('completed');
        setTimeout(() => {
          setDownloadState('idle');
        }, 3000);
      }, 1500);
    }, 1000);
  };

  return (
    <ViewContainer id="services-view">
      <PageHeader 
        title={lang === 'en' ? 'Citizen Services & Committees' : 'নাগরিক সেবা ও কমিটিসমূহ'} 
        breadcrumbs={[lang === 'en' ? 'Citizen Services' : 'নাগরিক সেবা']} 
        onNavigateHome={onNavigateHome}
      />

      <LayoutGrid>
        {/* Left Side: 17 Standing Committees Accordion */}
        <LeftSection>
          <Card id="committees-list-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '2px solid var(--colors-border)', paddingBottom: '8px' }}>
              <SectionTitle id="standing-committees-title">
                <Users size={20} style={{ color: '#1a5c38' }} />
                {lang === 'en' ? 'Upazila Standing Committees (17)' : 'উপজেলা স্থায়ী কমিটিসমূহ (১৭)'}
              </SectionTitle>
              <span style={{ fontSize: '12px', color: 'var(--colors-textMuted)', fontWeight: 500 }}>
                {lang === 'en' ? 'Click to Expand Details' : 'বিস্তারিত দেখতে ক্লিক করুন'}
              </span>
            </div>

            <AccordionContainer id="committees-accordion">
              {committeesData.map((comm) => {
                const isExpanded = expandedId === comm.id;
                return (
                  <AccordionItem key={comm.id} id={`committee-${comm.id}`}>
                    <AccordionHeader onClick={() => toggleAccordion(comm.id)} aria-expanded={isExpanded} id={`comm-header-${comm.id}`}>
                      <AccordionTitleRow>
                        <NumberBadge>{lang === 'en' ? comm.number : comm.number.toLocaleString('bn-BD')}</NumberBadge>
                        <CommitteeName>{comm.name[lang]}</CommitteeName>
                      </AccordionTitleRow>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </AccordionHeader>

                    {isExpanded && (
                      <AccordionContent id={`comm-content-${comm.id}`}>
                        <p style={{ fontWeight: 400, color: 'var(--colors-text)', fontSize: '13.5px' }}>
                          <strong>{lang === 'en' ? 'Primary Responsibility' : 'প্রধান দায়িত্ব'}:</strong> {comm.responsibility[lang]}
                        </p>
                        
                        <MetaGrid>
                          <MetaBox>
                            <strong>{lang === 'en' ? 'Committee Convener' : 'কমিটি আহ্বায়ক'}</strong>
                            <span>{comm.convener[lang]}</span>
                          </MetaBox>
                          <MetaBox>
                            <strong>{lang === 'en' ? 'Meeting Frequency' : 'সভা অনুষ্ঠানের সময়কাল'}</strong>
                            <span>{comm.frequency[lang]}</span>
                          </MetaBox>
                        </MetaGrid>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </AccordionContainer>
          </Card>
        </LeftSection>

        {/* Right Side: Quick Citizen Actions / Downloads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Download Citizen Charter */}
          <DownloadCard id="citizen-charter-download-card">
            <DownloadTitle>{lang === 'en' ? 'Citizen Charter (PDF)' : 'নাগরিক চার্টার (পিডিএফ)'}</DownloadTitle>
            <DownloadDesc>
              {lang === 'en' 
                ? "Download the official Upazila Parishad citizen charter detailing statutory service delivery times, required fees, application files, and departmental officials' phone logs."
                : "উপজেলা পরিষদের অফিসিয়াল নাগরিক চার্টার ডাউনলোড করুন, যেখানে সংবিধিবদ্ধ সেবা প্রদানের সময়, প্রয়োজনীয় ফি, আবেদনপত্র এবং বিভাগীয় কর্মকর্তাদের ফোন নম্বর বিস্তারিত রয়েছে।"}
            </DownloadDesc>

            <ActionButton 
              id="download-charter-btn"
              onClick={handleDownloadSimulation}
              disabled={downloadState !== 'idle'}
            >
              {downloadState === 'idle' && (
                <>
                  <FileDown size={18} /> {lang === 'en' ? 'Download Citizen Charter (2.4 MB)' : 'নাগরিক চার্টার ডাউনলোড করুন (২.৪ এমবি)'}
                </>
              )}
              {downloadState === 'preparing' && (
                <>
                  <Spinner size={18} /> {lang === 'en' ? 'Preparing Document...' : 'নথিপত্র প্রস্তুত হচ্ছে...'}
                </>
              )}
              {downloadState === 'downloading' && (
                <>
                  <Spinner size={18} /> {lang === 'en' ? 'Compiling & Transmitting...' : 'সংকলন এবং প্রেরণ করা হচ্ছে...'}
                </>
              )}
              {downloadState === 'completed' && (
                <>
                  <CheckCircle2 size={18} /> {lang === 'en' ? 'Downloaded Successfully!' : 'সফলভাবে ডাউনলোড করা হয়েছে!'}
                </>
              )}
            </ActionButton>
          </DownloadCard>

          {/* Quick Informational Box */}
          <Card id="info-box-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--colors-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={16} style={{ color: '#1a5c38' }} /> {lang === 'en' ? 'Citizen Service Guide' : 'নাগরিক সেবা নির্দেশিকা'}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--colors-textMuted)', lineHeight: 1.5 }}>
              {lang === 'en' 
                ? "In compliance with the Local Government Act 2009, Jhenaigati Upazila Parishad maintains these 17 Standing Committees to ensure decentralized, accountable public administration."
                : "স্থানীয় সরকার আইন ২০০৯ অনুযায়ী, ঝিনাইগাতী উপজেলা পরিষদ বিকেন্দ্রীভূত ও জবাবদিহিতামূলক গণপ্রশাসন নিশ্চিত করতে এই ১৭টি স্থায়ী কমিটি পরিচালনা করে থাকে।"}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--colors-textMuted)', lineHeight: 1.5 }}>
              {lang === 'en' 
                ? "For queries or service feedback, contact our dedicated Citizen Desk inside the UNO Headquarters or use the copiable official emails in the Administration wing."
                : "যেকোনো জিজ্ঞাসা বা সেবার মতামতের জন্য, উপজেলা নির্বাহী অফিসারের (ইউএনও) কার্যালয়ের ভেতরে আমাদের নির্ধারিত নাগরিক সহায়তা ডেস্কে যোগাযোগ করুন অথবা প্রশাসনিক শাখার অনুলিপিযোগ্য ইমেইলগুলো ব্যবহার করুন।"}
            </p>
          </Card>
        </div>
      </LayoutGrid>
    </ViewContainer>
  );
};
