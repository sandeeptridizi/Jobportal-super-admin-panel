import { X, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type?: 'buttons' | 'search' | 'dropdown'; // Add type to differentiate filter UI
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  onReset: () => void;
}

export function FilterModal({ 
  isOpen, 
  onClose, 
  filterGroups, 
  activeFilters, 
  onFilterChange, 
  onReset 
}: FilterModalProps) {
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== 'all');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
      >
        {/* Header */}
        <div 
          className="p-6 sticky top-0 flex items-center justify-between" 
          style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f', zIndex: 10 }}
        >
          <div className="flex items-center gap-4">
            <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#6f6f6f' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Groups */}
        <div className="p-6 space-y-6">
          {filterGroups.map((group) => {
            const filterType = group.type || 'buttons';
            const filteredOptions = group.options.filter(option => 
              !searchTerms[group.id] || 
              option.label.toLowerCase().includes(searchTerms[group.id].toLowerCase())
            );

            return (
              <div key={group.id}>
                <label className="block mb-3" style={{ color: '#d3d3d3', fontWeight: '600' }}>
                  {group.label}
                </label>

                {/* Search Input for Category/Location */}
                {filterType === 'search' && (
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <input
                      type="text"
                      placeholder={`Search ${group.label.toLowerCase()}...`}
                      value={searchTerms[group.id] || ''}
                      onChange={(e) => setSearchTerms({ ...searchTerms, [group.id]: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
                      style={{ 
                        backgroundColor: '#023047', 
                        color: '#f6f6f6', 
                        border: '1px solid #6f6f6f' 
                      }}
                    />
                  </div>
                )}

                {/* Dropdown for Type */}
                {filterType === 'dropdown' ? (
                  <select
                    value={activeFilters[group.id] || 'all'}
                    onChange={(e) => onFilterChange(group.id, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: '#023047',
                      color: '#f6f6f6',
                      border: '1px solid #6f6f6f'
                    }}
                  >
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.count !== undefined ? `(${option.count})` : ''}
                      </option>
                    ))}
                  </select>
                ) : (
                  /* Button Grid for Status and Search Results */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredOptions.map((option) => {
                      const isActive = activeFilters[group.id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => onFilterChange(group.id, option.value)}
                          className="px-4 py-2 rounded-lg transition-colors text-left"
                          style={{
                            backgroundColor: isActive ? '#FFC300' : '#1a1a1a',
                            color: isActive ? '#023047' : '#f6f6f6',
                            border: `1px solid ${isActive ? '#FFC300' : '#6f6f6f'}`
                          }}
                        >
                          <span className="block truncate">{option.label}</span>
                          {option.count !== undefined && (
                            <span 
                              className="text-xs" 
                              style={{ color: isActive ? '#023047' : '#d3d3d3' }}
                            >
                              ({option.count})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div 
          className="p-6 sticky bottom-0 flex gap-3 justify-end" 
          style={{ backgroundColor: '#023047', borderTop: '1px solid #6f6f6f' }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#FFC300', color: '#023047' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}