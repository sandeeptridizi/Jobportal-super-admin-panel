import { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  jobCount: number;
  icon: string;
  color: string;
}

export function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    { id: 1, name: 'Technology', description: 'Software, IT, and tech-related jobs', jobCount: 450, icon: '💻', color: 'bg-blue-100 text-blue-700' },
    { id: 2, name: 'Healthcare', description: 'Medical and healthcare positions', jobCount: 280, icon: '🏥', color: 'bg-green-100 text-green-700' },
    { id: 3, name: 'Finance', description: 'Banking, accounting, and financial services', jobCount: 200, icon: '💰', color: 'bg-yellow-100 text-yellow-700' },
    { id: 4, name: 'Education', description: 'Teaching and educational roles', jobCount: 150, icon: '📚', color: 'bg-purple-100 text-purple-700' },
    { id: 5, name: 'Marketing', description: 'Marketing and advertising positions', jobCount: 180, icon: '📱', color: 'bg-pink-100 text-pink-700' },
    { id: 6, name: 'Design', description: 'UI/UX and graphic design jobs', jobCount: 120, icon: '🎨', color: 'bg-indigo-100 text-indigo-700' },
    { id: 7, name: 'Sales', description: 'Sales and business development', jobCount: 210, icon: '📊', color: 'bg-orange-100 text-orange-700' },
    { id: 8, name: 'Human Resources', description: 'HR and recruitment positions', jobCount: 95, icon: '👥', color: 'bg-cyan-100 text-cyan-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            style={{ 
              color: '#FFC300',
              fontSize: '2.5rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)',
              marginBottom: '0.25rem'
            }}
          >
            Categories
          </h1>
          <p className="mt-1" style={{ color: '#6f6f6f' }}>Manage job categories and classifications</p>
        </div>
        <button 
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#FFC300', color: '#023047' }}
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="rounded-lg p-6 transition-shadow" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: '#FFC300' }}>
                {category.icon}
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => {
                    setEditingCategory(category);
                    setShowModal(true);
                  }}
                  className="p-1 rounded transition-colors"
                  style={{ color: '#FFC300' }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 rounded transition-colors" style={{ color: '#6f6f6f' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="mb-2" style={{ color: '#f6f6f6' }}>{category.name}</h3>
            <p className="mb-4" style={{ color: '#d3d3d3' }}>{category.description}</p>
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
              <span style={{ color: '#d3d3d3' }}>Jobs</span>
              <span style={{ color: '#FFC300', fontWeight: '700' }}>{category.jobCount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(2, 48, 71, 0.8)' }}>
          <div className="rounded-lg max-w-md w-full" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300' }}>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Category Name</label>
                <input
                  type="text"
                  defaultValue={editingCategory?.name}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="e.g. Technology"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Description</label>
                <textarea
                  rows={3}
                  defaultValue={editingCategory?.description}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="Brief description of the category"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Icon (Emoji)</label>
                <input
                  type="text"
                  defaultValue={editingCategory?.icon}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="e.g. 💻"
                />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                {editingCategory ? 'Update' : 'Create'} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}