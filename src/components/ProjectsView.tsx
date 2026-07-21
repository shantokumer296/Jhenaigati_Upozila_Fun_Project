import React, { useState, useMemo } from 'react';
import { styled } from '../stitches.config';
import { PageHeader } from './PageHeader';
import { 
  Briefcase, TrendingUp, DollarSign, CheckCircle2, 
  Clock, Search, ArrowUpDown, RefreshCw, Layers 
} from 'lucide-react';
import { translations, projectsData as initialProjects, LocalizedProject as Project } from '../translations';

interface ProjectsViewProps {
  onNavigateHome: () => void;
  lang: 'en' | 'bn';
}


// Stitches Styles
const ViewContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

const MetricGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@bp1': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@bp3': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  }
});

const MetricCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
});

const MetricIcon = styled('div', {
  width: '46px',
  height: '46px',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    color: {
      green: { backgroundColor: '$primaryLight', color: '$primary' },
      blue: { backgroundColor: '#e6f4ff', color: '#0958d9' },
      orange: { backgroundColor: '#fffbe6', color: '#d46b08' },
      purple: { backgroundColor: '#f9f0ff', color: '#531dab' }
    }
  }
});

const MetricLabel = styled('span', {
  fontSize: '$xs',
  color: '$textMuted',
  fontWeight: 500,
  display: 'block',
});

const MetricVal = styled('span', {
  fontSize: '$base',
  fontWeight: 700,
  color: '$text',
  fontFamily: 'JetBrains Mono, monospace',

  '@bp1': {
    fontSize: '$lg',
  }
});

const FilterCard = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  padding: '$3',
  boxShadow: '$sm',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const FilterRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  '@bp2': {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

const SearchInputWrapper = styled('div', {
  position: 'relative',
  flex: 2,
});

const SearchInput = styled('input', {
  width: '100%',
  padding: '10px 12px 10px 36px',
  fontSize: '$sm',
  border: '1px solid $border',
  borderRadius: '$base',
  backgroundColor: '$background',
  outline: 'none',

  '&:focus': {
    borderColor: '$primary',
    backgroundColor: '$surface',
  }
});

const SelectFilter = styled('select', {
  padding: '10px 12px',
  fontSize: '$sm',
  border: '1px solid $border',
  borderRadius: '$base',
  backgroundColor: '$background',
  outline: 'none',
  flex: 1,
  cursor: 'pointer',

  '&:focus': {
    borderColor: '$primary',
    backgroundColor: '$surface',
  }
});

// Stitches Table components
const TableWrapper = styled('div', {
  backgroundColor: '$surface',
  borderRadius: '$large',
  border: '1px solid $border',
  boxShadow: '$sm',
  overflowX: 'auto',
});

const ProjectTable = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '$sm',
});

const TableHead = styled('thead', {
  backgroundColor: '$background',
  borderBottom: '2px solid $border',
});

const Th = styled('th', {
  padding: '$2 $3',
  fontWeight: 600,
  color: '$text',
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    color: '$primary',
    backgroundColor: 'rgba(26, 92, 56, 0.05)',
  }
});

const Td = styled('td', {
  padding: '$2 $3',
  color: '$text',
  borderBottom: '1px solid $border',
  lineHeight: 1.5,
});

const Tr = styled('tr', {
  transition: 'background-color 0.15s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  }
});

const StatusBadge = styled('span', {
  fontSize: '11px',
  fontWeight: 600,
  padding: '4px 10px',
  borderRadius: '$round',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  width: 'fit-content',
  variants: {
    status: {
      Completed: {
        backgroundColor: '$primaryLight',
        color: '$primary',
      },
      Ongoing: {
        backgroundColor: '#e6f4ff',
        color: '#0958d9',
      },
      Planning: {
        backgroundColor: '#fffbe6',
        color: '#d46b08',
      }
    }
  }
});

const TableResetBtn = styled('button', {
  backgroundColor: 'transparent',
  border: '1px solid $primary',
  color: '$primary',
  padding: '6px 12px',
  borderRadius: '$base',
  fontSize: '$xs',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  width: 'fit-content',
  transition: 'all 0.2s',

  '&:hover': {
    backgroundColor: '$primaryLight',
  }
});

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigateHome, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof Project>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setWardFilter('All');
    setSortField('name');
    setSortDirection('asc');
  };

  // Filter and Sort combined logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...initialProjects];

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name[lang].toLowerCase().includes(q) || 
        p.agency[lang].toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Ward filter
    if (wardFilter !== 'All') {
      result = result.filter(p => p.wardNo === parseInt(wardFilter, 10));
    }

    // Sorting
    result.sort((a, b) => {
      let valA = sortField === 'name' || sortField === 'agency' ? (a[sortField] as any)[lang] : a[sortField];
      let valB = sortField === 'name' || sortField === 'agency' ? (b[sortField] as any)[lang] : b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else {
        // Numbers
        return sortDirection === 'asc' 
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      }
    });

    return result;
  }, [searchTerm, statusFilter, wardFilter, sortField, sortDirection, lang]);

  // Derived real-time metrics from filtered results
  const metrics = useMemo(() => {
    const totalBudget = filteredAndSortedProjects.reduce((sum, p) => sum + p.budget, 0);
    const count = filteredAndSortedProjects.length;
    const completed = filteredAndSortedProjects.filter(p => p.status === 'Completed').length;
    const ongoing = filteredAndSortedProjects.filter(p => p.status === 'Ongoing').length;

    return { totalBudget, count, completed, ongoing };
  }, [filteredAndSortedProjects]);

  // Format currency (BDT)
  const formatBDT = (num: number) => {
    const locale = lang === 'en' ? 'en-IN' : 'bn-BD';
    const symbol = lang === 'en' ? '৳ ' : '৳ ';
    return symbol + num.toLocaleString(locale);
  };

  return (
    <ViewContainer id="projects-view">
      <PageHeader 
        title={lang === 'en' ? 'Development Projects & Budgets' : 'উন্নয়ন প্রকল্প ও বাজেট'} 
        breadcrumbs={[lang === 'en' ? 'Projects & Budget' : 'প্রকল্প ও বাজেট']} 
        onNavigateHome={onNavigateHome}
      />

      {/* Real-Time Metrics Row */}
      <MetricGrid id="projects-metrics">
        <MetricCard id="metric-total-budget">
          <MetricIcon color="green">
            <DollarSign size={20} />
          </MetricIcon>
          <div>
            <MetricLabel>{lang === 'en' ? 'Total Budget (Filtered)' : 'মোট বাজেট (ফিল্টারকৃত)'}</MetricLabel>
            <MetricVal>{formatBDT(metrics.totalBudget)}</MetricVal>
          </div>
        </MetricCard>

        <MetricCard id="metric-total-count">
          <MetricIcon color="blue">
            <Briefcase size={20} />
          </MetricIcon>
          <div>
            <MetricLabel>{lang === 'en' ? 'Project Count' : 'মোট প্রকল্প'}</MetricLabel>
            <MetricVal>
              {lang === 'en' ? `${metrics.count} Projects` : `${metrics.count.toLocaleString('bn-BD')} টি প্রকল্প`}
            </MetricVal>
          </div>
        </MetricCard>

        <MetricCard id="metric-completed">
          <MetricIcon color="purple">
            <CheckCircle2 size={20} />
          </MetricIcon>
          <div>
            <MetricLabel>{lang === 'en' ? 'Completed' : 'সম্পন্ন'}</MetricLabel>
            <MetricVal>
              {lang === 'en' ? `${metrics.completed} Done` : `${metrics.completed.toLocaleString('bn-BD')} টি সম্পন্ন`}
            </MetricVal>
          </div>
        </MetricCard>

        <MetricCard id="metric-ongoing">
          <MetricIcon color="orange">
            <Clock size={20} />
          </MetricIcon>
          <div>
            <MetricLabel>{lang === 'en' ? 'Ongoing/Planning' : 'চলমান/পরিকল্পনাধীন'}</MetricLabel>
            <MetricVal>
              {lang === 'en' ? `${metrics.ongoing} In Progress` : `${metrics.ongoing.toLocaleString('bn-BD')} টি চলমান`}
            </MetricVal>
          </div>
        </MetricCard>
      </MetricGrid>

      {/* Advanced Filter Panel */}
      <FilterCard id="projects-filter-panel">
        <FilterRow>
          <SearchInputWrapper>
            <SearchInput 
              id="project-search-input"
              type="text" 
              placeholder={lang === 'en' ? 'Search by project name or agency...' : 'প্রকল্পের নাম বা সংস্থা দিয়ে খুঁজুন...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
          </SearchInputWrapper>

          <SelectFilter 
            id="status-filter-select"
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">{lang === 'en' ? 'All Statuses' : 'সকল অবস্থা'}</option>
            <option value="Completed">{lang === 'en' ? 'Completed Only' : 'শুধুমাত্র সম্পন্ন'}</option>
            <option value="Ongoing">{lang === 'en' ? 'Ongoing Only' : 'শুধুমাত্র চলমান'}</option>
            <option value="Planning">{lang === 'en' ? 'Planning Only' : 'শুধুমাত্র পরিকল্পনাধীন'}</option>
          </SelectFilter>

          <SelectFilter 
            id="ward-filter-select"
            value={wardFilter} 
            onChange={(e) => setWardFilter(e.target.value)}
          >
            <option value="All">{lang === 'en' ? 'All Wards' : 'সকল ওয়ার্ড'}</option>
            <option value="1">{lang === 'en' ? 'Ward No. 1' : 'ওয়ার্ড নং ১'}</option>
            <option value="2">{lang === 'en' ? 'Ward No. 2' : 'ওয়ার্ড নং ২'}</option>
            <option value="3">{lang === 'en' ? 'Ward No. 3' : 'ওয়ার্ড নং ৩'}</option>
            <option value="5">{lang === 'en' ? 'Ward No. 5' : 'ওয়ার্ড নং ৫'}</option>
            <option value="7">{lang === 'en' ? 'Ward No. 7' : 'ওয়ার্ড নং ৭'}</option>
          </SelectFilter>

          {(searchTerm || statusFilter !== 'All' || wardFilter !== 'All' || sortField !== 'name') && (
            <TableResetBtn id="reset-filters-btn" onClick={handleResetFilters}>
              <RefreshCw size={12} /> {lang === 'en' ? 'Clear Filter' : 'ফিল্টার মুছুন'}
            </TableResetBtn>
          )}
        </FilterRow>
      </FilterCard>

      {/* Styled Data Table */}
      <TableWrapper id="project-table-wrapper">
        <ProjectTable id="project-table">
          <TableHead>
            <tr>
              <Th onClick={() => handleSort('name')} id="th-name" style={{ width: '45%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {lang === 'en' ? 'Project Name' : 'প্রকল্পের নাম'} <ArrowUpDown size={14} />
                </span>
              </Th>
              <Th onClick={() => handleSort('budget')} id="th-budget">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {lang === 'en' ? 'Allocated Budget' : 'বরাদ্দকৃত বাজেট'} <ArrowUpDown size={14} />
                </span>
              </Th>
              <Th onClick={() => handleSort('status')} id="th-status">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {lang === 'en' ? 'Status' : 'বর্তমান অবস্থা'} <ArrowUpDown size={14} />
                </span>
              </Th>
              <Th onClick={() => handleSort('wardNo')} id="th-ward">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {lang === 'en' ? 'Ward No' : 'ওয়ার্ড নং'} <ArrowUpDown size={14} />
                </span>
              </Th>
              <Th onClick={() => handleSort('agency')} id="th-agency">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {lang === 'en' ? 'Agency' : 'সংস্থা'} <ArrowUpDown size={14} />
                </span>
              </Th>
            </tr>
          </TableHead>
          <tbody>
            {filteredAndSortedProjects.length > 0 ? (
              filteredAndSortedProjects.map((p) => (
                <Tr key={p.id} id={`row-${p.id}`}>
                  <Td style={{ fontWeight: 500, color: 'var(--colors-text)' }}>{p.name[lang]}</Td>
                  <Td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{formatBDT(p.budget)}</Td>
                  <Td>
                    <StatusBadge status={p.status}>
                      {p.status === 'Completed' && <CheckCircle2 size={12} />}
                      {p.status === 'Ongoing' && <Clock size={12} />}
                      {p.status === 'Completed' 
                        ? (lang === 'en' ? 'Completed' : 'সম্পন্ন') 
                        : p.status === 'Ongoing' 
                          ? (lang === 'en' ? 'Ongoing' : 'চলমান') 
                          : (lang === 'en' ? 'Planning' : 'পরিকল্পনাধীন')}
                    </StatusBadge>
                  </Td>
                  <Td style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {lang === 'en' ? `Ward ${p.wardNo}` : `ওয়ার্ড ${p.wardNo.toLocaleString('bn-BD')}`}
                  </Td>
                  <Td style={{ color: 'var(--colors-textMuted)', fontSize: '13px' }}>{p.agency[lang]}</Td>
                </Tr>
              ))
            ) : (
              <tr>
                <Td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: 'var(--colors-textMuted)' }}>
                  {lang === 'en' 
                    ? 'No development projects found matching your filter parameters.' 
                    : 'আপনার অনুসন্ধান অনুযায়ী কোনো উন্নয়ন প্রকল্প পাওয়া যায়নি।'}
                </Td>
              </tr>
            )}
          </tbody>
        </ProjectTable>
      </TableWrapper>
    </ViewContainer>
  );
};
