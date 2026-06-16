import { X, RotateCcw } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface SupportFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string) => void;
  onReset: () => void;
}

export function SupportFilterModal({ 
  isOpen, 
  onClose, 
  filterGroups, 
  activeFilters, 
  onFilterChange, 
  onReset 
}: SupportFilterModalProps) {
  if (!isOpen) return null;

  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

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
            const activeValues = activeFilters[group.id] || [];

            return (
              <div key={group.id}>
                <label className="block mb-3" style={{ color: '#d3d3d3', fontWeight: '600' }}>
                  {group.label}
                </label>

                {/* Button Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {group.options.map((option) => {
                    const isActive = activeValues.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => onFilterChange(group.id, option.value)}
                        className="px-4 py-2 rounded-lg transition-colors text-left"
                        style={{
                          backgroundColor: isActive ? '#FFC300' : '#023047',
                          color: isActive ? '#023047' : '#f6f6f6',
                          border: `1px solid ${isActive ? '#FFC300' : '#6f6f6f'}`
                        }}
                      >
                        <span className="block truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
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
