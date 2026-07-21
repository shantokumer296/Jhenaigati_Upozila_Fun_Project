import React from 'react';
import { styled } from '../stitches.config';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: string[];
  onNavigateHome: () => void;
}

const HeaderContainer = styled('div', {
  background: 'linear-gradient(to right, #1a5c38, #2d8a56)',
  color: '$surface',
  padding: '$3 $2',
  borderRadius: '16px',
  marginBottom: '$3',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  position: 'relative',
  overflow: 'hidden',

  '@bp2': {
    padding: '32px 40px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  }
});

const Title = styled('h1', {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '$xl',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: 0,

  '@bp2': {
    fontSize: '$3xl',
  }
});

const BreadcrumbNav = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  fontSize: '$sm',
  color: 'rgba(255, 255, 255, 0.8)',
  flexWrap: 'wrap',
});

const BreadcrumbLink = styled('button', {
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  transition: 'all 0.2s ease',

  '&:hover': {
    color: '$surface',
    background: 'rgba(255, 255, 255, 0.1)',
  },
});

const BreadcrumbCurrent = styled('span', {
  color: '$surface',
  fontWeight: 500,
  padding: '4px 8px',
});

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, onNavigateHome }) => {
  return (
    <HeaderContainer id="page-header">
      <div>
        <Title id="page-header-title">{title}</Title>
      </div>
      <BreadcrumbNav aria-label="Breadcrumb">
        <BreadcrumbLink id="breadcrumb-home" onClick={onNavigateHome}>
          <Home size={14} />
          <span>Home</span>
        </BreadcrumbLink>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb}>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
              {isLast ? (
                <BreadcrumbCurrent id={`breadcrumb-${index}`}>{crumb}</BreadcrumbCurrent>
              ) : (
                <span id={`breadcrumb-${index}`} style={{ padding: '4px 8px' }}>{crumb}</span>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbNav>
    </HeaderContainer>
  );
};
