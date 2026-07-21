import React, { useState } from 'react';
import { styled } from '../stitches.config';
import { PageHeader } from './PageHeader';
import { User, Mail, Phone, Search, Building2, ShieldAlert, Check, Copy } from 'lucide-react';
import { translations, officersData, departmentsData, LocalizedOfficer as OfficerProfile, LocalizedDepartment as Department } from '../translations';

interface AdministrationViewProps {
  onNavigateHome: () => void;
  lang: 'en' | 'bn';
}


// Stitches Styled Components
const ViewContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

const SectionTitle = styled('h3', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$xl',
  fontWeight: 600,
  color: '$text',
  marginBottom: '$1',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

const OfficersGrid = styled('div', {
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

const OfficerCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '$hover',
    borderColor: '$primary',
  }
});

const AvatarWrapper = styled('div', {
  width: '72px',
  height: '72px',
  borderRadius: '$round',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$surface',
  fontSize: '$xl',
  fontWeight: 700,
  fontFamily: 'Space Grotesk, sans-serif',
  marginBottom: '$2',
  boxShadow: '$md',
});

const OfficerName = styled('h4', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$base',
  fontWeight: 700,
  color: '$text',
  marginBottom: '2px',
});

const OfficerRole = styled('p', {
  fontSize: '$xs',
  fontWeight: 600,
  color: '$primary',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  marginBottom: '$2',
  backgroundColor: '$primaryLight',
  padding: '4px 10px',
  borderRadius: '$round',
});

const OfficerContactList = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '$2',
  borderTop: '1px solid $border',
  paddingTop: '$2',
  textAlign: 'left',
});

const ContactItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '$sm',
  color: '$textMuted',

  'span': {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    maxWidth: '85%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
});

const IconButton = styled('button', {
  background: 'none',
  border: 'none',
  color: '$primary',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',

  '&:hover': {
    backgroundColor: '$primaryLight',
  }
});

const ExtraDetailContainer = styled('div', {
  width: '100%',
  backgroundColor: '$background',
  padding: '8px 12px',
  borderRadius: '$base',
  marginTop: '2px',
  marginBottom: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  border: '1px solid $border',
});

const ExtraDetailRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '11px',
  color: '$textMuted',
  
  'span:first-child': {
    fontWeight: 500,
    color: '$textMuted',
  },
  
  'span:last-child': {
    fontWeight: 600,
    color: '$text',
  }
});

const DepartmentSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  marginTop: '$2',
});

const DeptHeaderRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderBottom: '2px solid $border',
  paddingBottom: '8px',

  '@bp2': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

const SearchBarWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: '350px',
});

const SearchInput = styled('input', {
  width: '100%',
  padding: '10px 12px 10px 36px',
  fontSize: '$sm',
  border: '1px solid $border',
  borderRadius: '$base',
  backgroundColor: '$surface',
  outline: 'none',

  '&:focus': {
    borderColor: '$primary',
    boxShadow: '0 0 0 2px $primaryLight',
  }
});

const DeptGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@bp2': {
    gridTemplateColumns: '1fr 1fr',
  }
});

const DeptCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const DeptBadge = styled('span', {
  fontSize: '10px',
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: '$round',
  textTransform: 'uppercase',
  width: 'fit-content',
  variants: {
    category: {
      Development: {
        backgroundColor: '$primaryLight',
        color: '$primary',
      },
      Engineering: {
        backgroundColor: '#f9f0ff',
        color: '#531dab',
      },
      Health: {
        backgroundColor: '#fff1f0',
        color: '#f5222d',
      },
      Social: {
        backgroundColor: '#fffbe6',
        color: '#d46b08',
      },
      Education: {
        backgroundColor: '#e6f4ff',
        color: '#0958d9',
      }
    }
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

export const AdministrationView: React.FC<AdministrationViewProps> = ({ onNavigateHome, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const t = translations[lang];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    const labelTranslated = lang === 'en' ? label : (label === 'Phone' ? 'ফোন নম্বর' : 'ইমেইল');
    setCopiedText(lang === 'en' ? `Copied ${labelTranslated}: ${text}` : `${labelTranslated} কপি করা হয়েছে: ${text}`);
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  // Filter departments
  const filteredDepartments = departmentsData.filter(dept => 
    dept.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.officer[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.category[lang].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ViewContainer id="admin-view">
      <PageHeader 
        title={lang === 'en' ? 'Administration Directory' : 'প্রশাসনিক ডিরেক্টরি'} 
        breadcrumbs={[lang === 'en' ? 'Administration' : 'প্রশাসন']} 
        onNavigateHome={onNavigateHome}
      />

      {/* Leadership Profile Cards */}
      <div id="leadership-section">
        <SectionTitle id="key-officials-title">
          <User size={20} style={{ color: '#1a5c38' }} />
          {lang === 'en' ? 'Key Administrative Leaders' : 'প্রধান প্রশাসনিক কর্মকর্তাবৃন্দ'}
        </SectionTitle>
        <OfficersGrid id="officers-grid" style={{ marginTop: '12px' }}>
          {officersData.map((off) => (
            <OfficerCard key={off.id} id={`officer-${off.id}`}>
              <AvatarWrapper style={{ backgroundColor: off.avatarBg }} id={`avatar-${off.id}`}>
                {off.avatarInitials}
              </AvatarWrapper>
              <OfficerName>{off.name[lang]}</OfficerName>
              <OfficerRole>{off.role[lang]}</OfficerRole>
              <p style={{ fontSize: '12px', color: 'var(--colors-textMuted)', marginBottom: '10px' }}>
                {lang === 'en' ? 'Office' : 'কার্যালয়'}: {off.office[lang]}
              </p>
              
              {(off.bcsBatch || off.joiningDate || off.homeDistrict) && (
                <ExtraDetailContainer id={`extra-details-${off.id}`}>
                  {off.bcsBatch && (
                    <ExtraDetailRow id={`batch-row-${off.id}`}>
                      <span>{lang === 'en' ? 'BCS Batch:' : 'বিসিএস ব্যাচ:'}</span>
                      <span>{off.bcsBatch[lang]}</span>
                    </ExtraDetailRow>
                  )}
                  {off.joiningDate && (
                    <ExtraDetailRow id={`joining-row-${off.id}`}>
                      <span>{lang === 'en' ? 'Joining Date:' : 'যোগদানের তারিখ:'}</span>
                      <span>{off.joiningDate[lang]}</span>
                    </ExtraDetailRow>
                  )}
                  {off.homeDistrict && (
                    <ExtraDetailRow id={`district-row-${off.id}`}>
                      <span>{lang === 'en' ? 'Home District:' : 'নিজ জেলা:'}</span>
                      <span>{off.homeDistrict[lang]}</span>
                    </ExtraDetailRow>
                  )}
                </ExtraDetailContainer>
              )}

              <OfficerContactList>
                {off.phoneOffice && (
                  <ContactItem id={`phone-office-item-${off.id}`}>
                    <span>
                      <Phone size={14} style={{ color: '#0958d9' }} />
                      {off.phoneOffice} ({lang === 'en' ? 'Office' : 'অফিস'})
                    </span>
                    <IconButton 
                      id={`copy-phone-office-${off.id}`}
                      onClick={() => handleCopy(off.phoneOffice!, 'Phone')}
                      title={lang === 'en' ? 'Copy Office Phone' : 'অফিস ফোন নম্বর কপি করুন'}
                    >
                      <Copy size={14} />
                    </IconButton>
                  </ContactItem>
                )}
                <ContactItem>
                  <span>
                    <Phone size={14} style={{ color: '#1a5c38' }} />
                    {off.phone} {off.phoneOffice ? `(${lang === 'en' ? 'Mobile' : 'মোবাইল'})` : ''}
                  </span>
                  <IconButton 
                    id={`copy-phone-${off.id}`}
                    onClick={() => handleCopy(off.phone, 'Phone')}
                    title={lang === 'en' ? 'Copy Phone' : 'ফোন নম্বর কপি করুন'}
                  >
                    <Copy size={14} />
                  </IconButton>
                </ContactItem>
                <ContactItem>
                  <span>
                    <Mail size={14} style={{ color: '#1a5c38' }} />
                    {off.email}
                  </span>
                  <IconButton 
                    id={`copy-email-${off.id}`}
                    onClick={() => handleCopy(off.email, 'Email')}
                    title={lang === 'en' ? 'Copy Email' : 'ইমেইল কপি করুন'}
                  >
                    <Copy size={14} />
                  </IconButton>
                </ContactItem>
              </OfficerContactList>
            </OfficerCard>
          ))}
        </OfficersGrid>
      </div>

      {/* Upazila Departments List */}
      <DepartmentSection id="departments-section">
        <DeptHeaderRow>
          <SectionTitle id="dept-directory-title">
            <Building2 size={20} style={{ color: '#1a5c38' }} />
            {lang === 'en' ? 'Upazila Departmental Nodes' : 'উপজেলা বিভাগীয় দপ্তরসমূহ'}
          </SectionTitle>
          <SearchBarWrapper>
            <SearchInput 
              id="dept-search-input"
              type="text" 
              placeholder={lang === 'en' ? 'Search departments or officers...' : 'দপ্তর বা কর্মকর্তা অনুসন্ধান করুন...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
          </SearchBarWrapper>
        </DeptHeaderRow>

        <DeptGrid id="departments-grid">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => {
              // map categories to badge type
              let cat: 'Development' | 'Engineering' | 'Health' | 'Social' | 'Education' = 'Development';
              if (dept.category.en === 'Engineering') cat = 'Engineering';
              if (dept.category.en === 'Health') cat = 'Health';
              if (dept.category.en === 'Social Welfare') cat = 'Social';
              if (dept.category.en === 'Education') cat = 'Education';

              return (
                <DeptCard key={dept.id} id={`dept-${dept.id}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--colors-text)' }}>{dept.name[lang]}</h4>
                    <DeptBadge category={cat}>{dept.category[lang]}</DeptBadge>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--colors-textMuted)', margin: '4px 0' }}>
                    <strong>{lang === 'en' ? 'Officer' : 'কর্মকর্তা'}:</strong> {dept.officer[lang]}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: 'var(--colors-textMuted)', borderTop: '1px solid var(--colors-border)', paddingTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Email: {dept.email}</span>
                      <IconButton onClick={() => handleCopy(dept.email, 'Email')} size="small">
                        <Copy size={12} />
                      </IconButton>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Phone: {dept.phone}</span>
                      <IconButton onClick={() => handleCopy(dept.phone, 'Phone')} size="small">
                        <Copy size={12} />
                      </IconButton>
                    </div>
                  </div>
                </DeptCard>
              );
            })
          ) : (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '30px', color: 'var(--colors-textMuted)', fontSize: '14px' }}>
              {lang === 'en' ? `No departments matching "${searchQuery}" found.` : `"${searchQuery}" এর সাথে মিলে যাওয়া কোনো দপ্তর পাওয়া যায়নি।`}
            </div>
          )}
        </DeptGrid>
      </DepartmentSection>

      {/* Floating Action Feedback Toast */}
      {copiedText && (
        <ToastFeedback id="toast-feedback">
          <Check size={16} style={{ color: '#1a5c38' }} />
          {copiedText}
        </ToastFeedback>
      )}
    </ViewContainer>
  );
};
