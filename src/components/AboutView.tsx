import React, { useState } from 'react';
import { styled } from '../stitches.config';
import { PageHeader } from './PageHeader';
import { Map, Users, Trees, Calendar, Landmark, HelpCircle, X, Compass, Star, Phone, Building2, Copy, Check, GraduationCap } from 'lucide-react';
import { translations, touristSpotsData, unionsData, LocalizedTouristSpot as TouristSpot, LocalizedUnion as Union } from '../translations';

interface AboutViewProps {
  onNavigateHome: () => void;
  lang: 'en' | 'bn';
}


// Stitches Styles
const PageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

const AboutLayout = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@bp2': {
    gridTemplateColumns: '1.2fr 1.8fr',
  },
  '@bp3': {
    gridTemplateColumns: '1fr 2fr',
  }
});

const Card = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
});

const CardTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$lg',
  fontWeight: 600,
  color: '$text',
  marginBottom: '$2',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  paddingBottom: '8px',
  borderBottom: '2px solid $border',
});

const StatGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$2',
});

const StatItem = styled('div', {
  backgroundColor: '$background',
  padding: '$2',
  borderRadius: '$base',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const StatVal = styled('span', {
  fontSize: '$lg',
  fontWeight: 700,
  color: '$primary',
  fontFamily: 'JetBrains Mono, monospace',
});

const StatLabel = styled('span', {
  fontSize: '$xs',
  color: '$textMuted',
  fontWeight: 500,
});

const EduSection = styled('div', {
  marginTop: '$3',
  borderTop: '1px solid $border',
  paddingTop: '$3',
});

const EduTitle = styled('h4', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '$text',
  marginBottom: '$2',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const EduGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const EduItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 10px',
  backgroundColor: '$background',
  borderRadius: '$base',
  fontSize: '$xs',
});

const EduLabel = styled('span', {
  color: '$text',
  fontWeight: 500,
});

const EduCount = styled('span', {
  color: '$primary',
  fontWeight: 700,
  fontFamily: 'JetBrains Mono, monospace',
});

const HistoryContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  fontSize: '$base',
  lineHeight: 1.6,
  color: '$text',

  'p': {
    marginBottom: '$1',
  }
});

const HighlightBox = styled('div', {
  backgroundColor: '$primaryLight',
  borderLeft: '4px solid $primary',
  padding: '$2',
  borderRadius: '$base',
  fontSize: '$sm',
  color: '$text',
  fontWeight: 500,
  lineHeight: 1.5,
  marginTop: '$1',
});

const SectionTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$xl',
  fontWeight: 600,
  color: '$text',
  marginTop: '$2',
  marginBottom: '$1',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

const UnionsSection = styled('div', {
  marginTop: '$4',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const UnionsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@bp2': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@bp3': {
    gridTemplateColumns: '1fr 1fr 1fr',
  }
});

const UnionCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  transition: 'all 0.2s ease',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '$hover',
    borderColor: '$primary',
  }
});

const UnionCardHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid $border',
  paddingBottom: '8px',
});

const UnionCardTitle = styled('h4', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$base',
  fontWeight: 700,
  color: '$primary',
});

const UnionCardBadge = styled('span', {
  fontSize: '10px',
  fontWeight: 600,
  backgroundColor: '$primaryLight',
  color: '$primary',
  padding: '2px 8px',
  borderRadius: '$round',
  textTransform: 'uppercase',
});

const UnionDetailList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const UnionDetailRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '$sm',
  color: '$textMuted',

  'strong': {
    color: '$text',
    fontWeight: 500,
  }
});

const ToastFeedback = styled('div', {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  backgroundColor: '$text',
  color: '$surface',
  padding: '12px 20px',
  borderRadius: '$large',
  fontSize: '$sm',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '$lg',
  zIndex: 1000,
  animation: 'slideUp 0.2s ease-out',
});

const TourismGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@bp2': {
    gridTemplateColumns: '1fr 1fr 1fr',
  }
});

const SpotCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  overflow: 'hidden',
  boxShadow: '$sm',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '$hover',
    borderColor: '$primary',
  }
});

const ImagePlaceholder = styled('div', {
  height: '160px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$surface',
  fontSize: '$sm',
  fontWeight: 600,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
});

const ImageText = styled('span', {
  position: 'relative',
  zIndex: 1,
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$lg',
  textAlign: 'center',
  padding: '$1',
});

const SpotCardBody = styled('div', {
  padding: '$2',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const SpotTagline = styled('p', {
  fontSize: '$xs',
  color: '$textMuted',
  lineHeight: 1.4,
  fontStyle: 'italic',
});

const LearnMoreLink = styled('span', {
  fontSize: '$xs',
  fontWeight: 600,
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '4px',
});

// Spot Detail Panel Modal
const ModalOverlay = styled('div', {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
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
  maxWidth: '650px',
  boxShadow: '$lg',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp 0.3s ease-out',
});

const ModalHeader = styled('div', {
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

const ModalFooter = styled('div', {
  padding: '$3',
  borderTop: '1px solid $border',
  backgroundColor: '$background',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
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

const DetailBody = styled('div', {
  padding: '$3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  maxHeight: '75vh',
  overflowY: 'auto',
});

const HighlightBadge = styled('span', {
  backgroundColor: '$background',
  color: '$text',
  border: '1px solid $border',
  padding: '4px 10px',
  borderRadius: '$base',
  fontSize: '$xs',
  fontWeight: 500,
});

const ReviewBox = styled('div', {
  backgroundColor: '$background',
  padding: '$2',
  borderRadius: '$base',
  borderLeft: '3px solid #ffd700',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginTop: '6px',
});

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateHome, lang }) => {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const t = translations[lang];

  const handleCopyPhone = (phone: string, unionName: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(lang === 'en' ? `Copied contact for ${unionName}: ${phone}` : `${unionName} এর যোগাযোগ নম্বর কপি করা হয়েছে: ${phone}`);
    setTimeout(() => {
      setCopiedPhone(null);
    }, 2500);
  };

  return (
    <PageContainer id="about-view">
      <PageHeader 
        title={lang === 'en' ? 'About Jhenaigati Upazila' : 'ঝিনাইগাতী উপজেলা সম্পর্কে'} 
        breadcrumbs={[lang === 'en' ? 'About Upazila' : 'উপজেলা পরিচিতি']} 
        onNavigateHome={onNavigateHome}
      />

      <AboutLayout>
        {/* At a Glance Panel */}
        <Card id="at-a-glance-card">
          <CardTitle id="at-a-glance-title">
            <Compass size={18} style={{ color: '#1a5c38' }} />
            {lang === 'en' ? 'At a Glance' : 'এক নজরে'}
          </CardTitle>
          <StatGrid id="demographics-grid">
            <StatItem>
              <StatVal>{lang === 'en' ? '231.14' : '২৩১.১৪'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Area (Sq Km)' : 'আয়তন (বর্গ কিমি)'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatVal>{lang === 'en' ? '1,65,000+' : '১,৬৫,০০০+'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Total Population' : 'মোট জনসংখ্যা'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatVal>{lang === 'en' ? '7' : '৭'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Unions' : 'ইউনিয়নসমূহ'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatVal>{lang === 'en' ? '117' : '১১৭'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Villages' : 'গ্রামসমূহ'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatVal>{lang === 'en' ? '1' : '১'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Govt Hospital' : 'সরকারি হাসপাতাল'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatVal>{lang === 'en' ? '48%' : '৪৮%'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Literacy Rate' : 'শিক্ষার হার'}</StatLabel>
            </StatItem>
            <StatItem style={{ gridColumn: 'span 2' }}>
              <StatVal style={{ fontSize: '1rem', color: 'var(--colors-text)' }}>{lang === 'en' ? 'Sherpur District' : 'শেরপুর জেলা'}</StatVal>
              <StatLabel>{lang === 'en' ? 'Administrative District' : 'প্রশাসনিক জেলা'}</StatLabel>
            </StatItem>
          </StatGrid>

          <EduSection id="edu-institutions-section">
            <EduTitle id="edu-institutions-title">
              <GraduationCap size={16} style={{ color: '#1a5c38' }} />
              {lang === 'en' ? 'Educational Institutions' : 'শিক্ষা প্রতিষ্ঠানের তালিকা'}
            </EduTitle>
            <EduGrid id="edu-institutions-grid">
              {[
                { name: { en: 'General College', bn: 'সাধারণ কলেজ' }, count: { en: '4', bn: '৪' } },
                { name: { en: 'Women\'s College', bn: 'মহিলা কলেজ' }, count: { en: '1', bn: '১' } },
                { name: { en: 'Technical College', bn: 'কারিগরি কলেজ' }, count: { en: '2', bn: '২' } },
                { name: { en: 'Higher Secondary School', bn: 'উচ্চ মাধ্যমিক বিদ্যালয়' }, count: { en: '18', bn: '১৮' } },
                { name: { en: 'Junior Secondary School', bn: 'নিম্ন মাধ্যমিক বিদ্যালয়' }, count: { en: '3', bn: '৩' } },
                { name: { en: 'Govt. Primary School', bn: 'সরকারি প্রাথমিক বিদ্যালয়' }, count: { en: '101', bn: '১০১' } },
                { name: { en: 'Non-Govt. Primary School', bn: 'বেসরকারি প্রাথমিক বিদ্যালয়' }, count: { en: '27', bn: '২৭' } },
                { name: { en: 'Madrasah', bn: 'মাদ্রাসা' }, count: { en: '13', bn: '১৩' } }
              ].map((item, idx) => (
                <EduItem key={idx} id={`edu-item-${idx}`}>
                  <EduLabel>{item.name[lang]}</EduLabel>
                  <EduCount>{item.count[lang]}</EduCount>
                </EduItem>
              ))}
            </EduGrid>
          </EduSection>
        </Card>

        {/* History and Heritage Panel */}
        <Card id="history-heritage-card">
          <CardTitle id="history-heritage-title">
            <Landmark size={18} style={{ color: '#1a5c38' }} />
            {lang === 'en' ? 'History & Heritage' : 'ইতিহাস ও ঐতিহ্য'}
          </CardTitle>
          <HistoryContent id="history-text">
            {lang === 'en' ? (
              <>
                <p>
                  <strong>Origins & Thana Establishment:</strong> The name <em>Jhenaigati</em> is historically believed to be derived from <em>Jhinuk</em> (freshwater shells/oysters) and <em>Gati</em> (assembly or pile), referencing the early settlement where tribal gatherers accumulated shells along the Maharshi and Someswari rivers. Jhenaigati was established as a Thana in 1975 and upgraded to an administrative Upazila on July 2, 1983.
                </p>
                <p>
                  <strong>Indigenous Heritage:</strong> Bounded by the scenic Garo Hills of Meghalaya to the north, Jhenaigati spans 245.92 sq km. It is a vibrant cultural melting pot where indigenous ethnic minorities—primarily the <strong>Garo</strong>, <strong>Hajong</strong>, and <strong>Koch</strong> communities—have lived peacefully alongside Bengalis for centuries, maintaining rich matriarchal customs and unique festivals like <em>Wangala</em>.
                </p>
                <p>
                  <strong>Archaeological Symbols:</strong> The region boasts outstanding cultural artifacts, notably the historic <strong>Three-Domed Mughal Mosque</strong> at Gariana, built during the late Mughal era, reflecting classical Islamic architecture, alongside centuries-old missionary settlements.
                </p>
                <p>
                  <strong>1971 Liberation War:</strong> Under Sector 11, directed by Sector Commander Major M. Abu Taher, Jhenaigati played a critical strategic role. Freedom fighters led fierce guerrilla operations from their mountain bases. Jhenaigati was proudly liberated from occupation forces on <strong>December 4, 1971</strong>. The heroes are honored today at the Jhenaigati Upazila Parishad monument and the Kilaguri mass grave.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>নামকরণ ও থানা প্রতিষ্ঠা:</strong> ঐতিহাসিক তথ্যমতে, পাহাড়ি নদী মহারশী ও সোমেশ্বরী অববাহিকা থেকে সংগৃহীত প্রচুর ‘ঝিনুক’ এবং তা স্তূপ করে রাখার স্থান ‘গাতি’ বা জড়ো করা থেকে ‘ঝিনাইগাতী’ নামের উৎপত্তি। ১৯৭৫ সালে ঝিনাইগাতী থানা হিসেবে প্রতিষ্ঠিত হয় এবং পরবর্তীতে ১৯৮৩ সালের ২ জুলাই একে পূর্ণাঙ্গ প্রশাসনিক উপজেলায় উন্নীত করা হয়।
                </p>
                <p>
                  <strong>আদিবাসী ঐতিহ্য:</strong> ২৪৫.৯২ বর্গ কিলোমিটারের এই অঞ্চলটি উত্তরে ভারতের মেঘালয় সীমানা ও নৈসর্গিক গারো পাহাড় দ্বারা বেষ্টিত। এটি সংস্কৃতির এক চমৎকার মিলনমেলা, যেখানে শত শত বছর ধরে বাঙালি জনগোষ্ঠীর সাথে আদিবাসী <strong>গারো</strong>, <strong>হাজং</strong> এবং <strong>কোচ</strong> সম্প্রদায় সম্পূর্ণ সম্প্রীতির সাথে বসবাস করছে। তারা তাদের মাতৃতান্ত্রিক পারিবারিক ব্যবস্থা এবং <em>ওয়ানগালা</em>-র মতো ঐতিহ্যবাহী উৎসব সগৌরবে পালন করে।
                </p>
                <p>
                  <strong>প্রত্নতাত্ত্বিক নিদর্শন:</strong> ঝিনাইগাতী অঞ্চলে ঐতিহাসিক ও স্থাপত্য ঐতিহ্যের অনন্য প্রতীক হিসেবে দাঁড়িয়ে আছে মোঘল আমলে নির্মিত গরিয়ানা গ্রামের বিখ্যাত <strong>তিন গম্বুজ বিশিষ্ট মোঘল মসজিদ</strong>, যা এ অঞ্চলের প্রাচীন ইসলামী ঐতিহ্যের এক পরম নিদর্শন।
                </p>
                <p>
                  <strong>১৯৭১ সালের মুক্তিযুদ্ধ:</strong> মহান মুক্তিযুদ্ধে ১১ নম্বর সেক্টরের অধীনে (সেক্টর কমান্ডার মেজর এম. আবু তাহের) ঝিনাইগাতীর রণকৌশলগত অবদান ছিল অনস্বীকার্য। মুক্তিযোদ্ধারা সীমান্তবর্তী পাহাড়ি ঘাঁটি থেকে একাধিক সফল guerrilla হামলা পরিচালনা করেন। অবশেষে ১৯৭১ সালের <strong>৪ ডিসেম্বর</strong> ঝিনাইগাতী সম্পূর্ণ শত্রুমুক্ত হয়। বীর শহীদদের স্মরণে উপজেলা পরিষদ প্রাঙ্গণে স্মৃতিস্তম্ভ এবং কিলাগুড়িতে বধ্যভূমি নির্মিত হয়েছে।
                </p>
              </>
            )}
            <HighlightBox>
              {lang === 'en'
                ? '"Jhenaigati was proudly liberated on December 4, 1971, when the brave freedom fighters hosted the sovereign flag of Bangladesh, leading the strategic march toward Sherpur and Mymensingh."'
                : '"১৯৭১ সালের ৪ ডিসেম্বর ঝিনাইগাতী অঞ্চল শত্রুমুক্ত হয় এবং বীর মুক্তিযোদ্ধারা বাংলাদেশের গৌরবময় লাল-সবুজ পতাকা উত্তোলন করে শেরপুর ও ময়মনসিংহের দিকে কৌশলগত অগ্রযাত্রা নিশ্চিত করেন।"'}
            </HighlightBox>
          </HistoryContent>
        </Card>
      </AboutLayout>

      {/* Tourist Attractions Section */}
      <div id="tourism-section" style={{ marginTop: '16px' }}>
        <SectionTitle id="tourist-spots-header">
          <Trees size={22} style={{ color: '#1a5c38' }} />
          {lang === 'en' ? 'Scenic Tourism & Spots' : 'দর্শনীয় পর্যটন ও স্থানসমূহ'}
        </SectionTitle>
        <TourismGrid id="tourist-spots-grid">
          {touristSpotsData.map((spot) => (
            <SpotCard key={spot.id} id={`spot-${spot.id}`} onClick={() => setSelectedSpot(spot)}>
              <ImagePlaceholder style={{ backgroundImage: `url(${spot.imageUrl})` }}>
                <ImageText>{spot.name[lang]}</ImageText>
              </ImagePlaceholder>
              <SpotCardBody>
                <SpotTagline>{spot.tagline[lang]}</SpotTagline>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--colors-textMuted)' }}>
                  <Map size={12} /> {spot.distance[lang]}
                </div>
                <LearnMoreLink>
                  {lang === 'en' ? 'Plan Visit & Details' : 'ভ্রমণ পরিকল্পনা ও বিবরণ'} &rarr;
                </LearnMoreLink>
              </SpotCardBody>
            </SpotCard>
          ))}
        </TourismGrid>
      </div>

      {/* Union Parishads Section */}
      <UnionsSection id="unions-section">
        <SectionTitle id="unions-header">
          <Building2 size={22} style={{ color: '#1a5c38' }} />
          {lang === 'en' ? 'Union Parishads (7)' : 'ইউনিয়ন পরিষদসমূহ (৭)'}
        </SectionTitle>
        <p style={{ fontSize: '13.5px', color: 'var(--colors-textMuted)', marginBottom: '10px', lineHeight: 1.5 }}>
          {lang === 'en'
            ? 'Jhenaigati Upazila is partitioned into 7 local administrative Union Parishads. Each union is headed by an elected Chairman and maintains rural community support hubs.'
            : 'ঝিনাইগাতী উপজেলা ৭টি স্থানীয় প্রশাসনিক ইউনিয়ন পরিষদে বিভক্ত। প্রতিটি ইউনিয়ন একজন নির্বাচিত চেয়ারম্যান দ্বারা পরিচালিত হয় এবং গ্রামীণ সেবা সহায়তা কেন্দ্র তদারকি করে।'}
        </p>
        <UnionsGrid id="unions-grid">
          {unionsData.map((union) => (
            <UnionCard key={union.id} id={`union-${union.id}`}>
              <UnionCardHeader>
                <UnionCardTitle>{union.name[lang]}</UnionCardTitle>
                <UnionCardBadge>
                  {lang === 'en' ? 'Union' : 'ইউনিয়ন'}
                </UnionCardBadge>
              </UnionCardHeader>
              <UnionDetailList>
                <UnionDetailRow>
                  <span>{lang === 'en' ? 'Chairman:' : 'চেয়ারম্যান:'}</span>
                  <strong>{union.chairman[lang]}</strong>
                </UnionDetailRow>
                <UnionDetailRow>
                  <span>{lang === 'en' ? 'Area:' : 'আয়তন:'}</span>
                  <strong>{union.area[lang]}</strong>
                </UnionDetailRow>
                <UnionDetailRow>
                  <span>{lang === 'en' ? 'Villages:' : 'গ্রামসমূহ:'}</span>
                  <strong>
                    {lang === 'en'
                      ? `${union.villagesCount} Villages`
                      : `${union.villagesCount.toLocaleString('bn-BD')} টি গ্রাম`}
                  </strong>
                </UnionDetailRow>
                <UnionDetailRow>
                  <span>{lang === 'en' ? 'Population:' : 'জনসংখ্যা:'}</span>
                  <strong>
                    {lang === 'en'
                      ? union.population[lang]
                      : `${union.population[lang]}`}
                  </strong>
                </UnionDetailRow>
                <UnionDetailRow style={{ borderTop: '1px solid var(--colors-border)', paddingTop: '8px', marginTop: '4px' }}>
                  <a 
                    href={`tel:${union.phone}`}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      color: 'var(--colors-primary)', 
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  >
                    <Phone size={12} /> {union.phone}
                  </a>
                  <button 
                    onClick={() => handleCopyPhone(union.phone, union.name[lang])}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--colors-primary)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={lang === 'en' ? 'Copy Phone' : 'ফোন নম্বর কপি করুন'}
                  >
                    <Copy size={12} />
                  </button>
                </UnionDetailRow>
              </UnionDetailList>
            </UnionCard>
          ))}
        </UnionsGrid>
      </UnionsSection>

      {/* Tourism Details Modal */}
      {selectedSpot && (
        <ModalOverlay id="about-modal-overlay" onClick={() => setSelectedSpot(null)}>
          <ModalContainer id="about-modal" onClick={(e) => e.stopPropagation()}>
            <ModalHeader style={{ backgroundColor: selectedSpot.accentColor }}>
              <div>
                <ModalTitle>{selectedSpot.name[lang]}</ModalTitle>
                <span style={{ fontSize: '12px', opacity: 0.9 }}>{selectedSpot.tagline[lang]}</span>
              </div>
              <CloseButton id="close-about-modal" onClick={() => setSelectedSpot(null)}>
                <X size={18} />
              </CloseButton>
            </ModalHeader>
            <DetailBody>
              {/* Detailed Description */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1a5c38', marginBottom: '6px' }}>
                  {lang === 'en' ? 'About the Destination' : 'গন্তব্য সম্পর্কে বিস্তারিত'}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--colors-textMuted)' }}>{selectedSpot.description[lang]}</p>
              </div>

              {/* Quick Trip Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '10px 0', padding: '10px', backgroundColor: 'var(--colors-background)', borderRadius: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--colors-textMuted)', display: 'block' }}>{lang === 'en' ? 'Location & Distance' : 'অবস্থান ও দূরত্ব'}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--colors-text)' }}>{selectedSpot.distance[lang]}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--colors-textMuted)', display: 'block' }}>{lang === 'en' ? 'Best Time to Visit' : 'ভ্রমণের উপযুক্ত সময়'}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--colors-text)' }}>{selectedSpot.bestTime[lang]}</span>
                </div>
              </div>

              {/* Highlights List */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--colors-text)', marginBottom: '6px' }}>{lang === 'en' ? 'Key Highlights' : 'প্রধান আকর্ষণসমূহ'}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedSpot.highlights[lang].map((item, idx) => (
                    <HighlightBadge key={idx}>{item}</HighlightBadge>
                  ))}
                </div>
              </div>

              {/* Traveler Reviews */}
              <div style={{ marginTop: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--colors-text)', marginBottom: '4px' }}>{lang === 'en' ? 'Traveler Reviews' : 'ভ্রমণকারীদের মন্তব্য'}</h4>
                {(selectedSpot.reviews || []).map((rev, idx) => (
                  <ReviewBox key={idx}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--colors-text)' }}>{rev.author}</strong>
                      <div style={{ display: 'flex', color: '#ffd700' }}>
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="#ffd700" />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--colors-textMuted)', fontStyle: 'italic' }}>"{rev.text}"</p>
                  </ReviewBox>
                ))}
              </div>
            </DetailBody>
            <ModalFooter>
              <SecondaryBtn id="close-about-modal-sec" onClick={() => setSelectedSpot(null)}>
                {lang === 'en' ? 'Close Guide' : 'বন্ধ করুন'}
              </SecondaryBtn>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Floating Action Feedback Toast */}
      {copiedPhone && (
        <ToastFeedback id="toast-feedback">
          <Check size={16} style={{ color: '#1a5c38' }} />
          {copiedPhone}
        </ToastFeedback>
      )}
    </PageContainer>
  );
};
