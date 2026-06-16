import { useState } from 'react';
import { Search, Filter, Eye, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Application {
  id: number;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  resume: string;
  coverLetter: string;
}

export function ApplicationsManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shortlisted' | 'rejected' | 'hired'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const applications: Application[] = [
    { id: 1, candidateName: 'John Doe', candidateEmail: 'john.doe@email.com', jobTitle: 'Senior React Developer', company: 'Tech Corp', appliedDate: '2024-12-05', status: 'pending', resume: 'resume.pdf', coverLetter: 'I am very interested...' },
    { id: 2, candidateName: 'Jane Smith', candidateEmail: 'jane.smith@email.com', jobTitle: 'Product Manager', company: 'Startup Inc', appliedDate: '2024-12-04', status: 'shortlisted', resume: 'resume.pdf', coverLetter: 'With 5 years experience...' },
    { id: 3, candidateName: 'Mike Johnson', candidateEmail: 'mike.j@email.com', jobTitle: 'UX Designer', company: 'Design Studio', appliedDate: '2024-12-03', status: 'pending', resume: 'resume.pdf', coverLetter: 'My portfolio showcases...' },
    { id: 4, candidateName: 'Sarah Williams', candidateEmail: 'sarah.w@email.com', jobTitle: 'Data Scientist', company: 'Analytics Co', appliedDate: '2024-12-02', status: 'rejected', resume: 'resume.pdf', coverLetter: 'I have extensive experience...' },
    { id: 5, candidateName: 'Tom Brown', candidateEmail: 'tom.brown@email.com', jobTitle: 'DevOps Engineer', company: 'Cloud Systems', appliedDate: '2024-12-01', status: 'hired', resume: 'resume.pdf', coverLetter: 'I am passionate about...' },
    { id: 6, candidateName: 'Emily Davis', candidateEmail: 'emily.d@email.com', jobTitle: 'Marketing Manager', company: 'Brand Agency', appliedDate: '2024-11-30', status: 'shortlisted', resume: 'resume.pdf', coverLetter: 'My marketing campaigns...' },
    { id: 7, candidateName: 'David Wilson', candidateEmail: 'david.w@email.com', jobTitle: 'Senior React Developer', company: 'Tech Corp', appliedDate: '2024-11-29', status: 'pending', resume: 'resume.pdf', coverLetter: 'I specialize in...' },
    { id: 8, candidateName: 'Lisa Anderson', candidateEmail: 'lisa.a@email.com', jobTitle: 'UX Designer', company: 'Design Studio', appliedDate: '2024-11-28', status: 'shortlisted', resume: 'resume.pdf', coverLetter: 'Design is my passion...' },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    hired: applications.filter(a => a.status === 'hired').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Applications Management</h1>
        <p className="text-gray-600 mt-1">Track and manage all job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-lg border transition-colors ${
            activeTab === 'all' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-gray-600">Total</p>
          <p className="text-gray-900 mt-1">{stats.all}</p>
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-lg border transition-colors ${
            activeTab === 'pending' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-gray-600">Pending</p>
          <p className="text-gray-900 mt-1">{stats.pending}</p>
        </button>
        <button
          onClick={() => setActiveTab('shortlisted')}
          className={`p-4 rounded-lg border transition-colors ${
            activeTab === 'shortlisted' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-gray-600">Shortlisted</p>
          <p className="text-gray-900 mt-1">{stats.shortlisted}</p>
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`p-4 rounded-lg border transition-colors ${
            activeTab === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-gray-600">Rejected</p>
          <p className="text-gray-900 mt-1">{stats.rejected}</p>
        </button>
        <button
          onClick={() => setActiveTab('hired')}
          className={`p-4 rounded-lg border transition-colors ${
            activeTab === 'hired' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-gray-600">Hired</p>
          <p className="text-gray-900 mt-1">{stats.hired}</p>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            Filters
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Candidate</th>
                <th className="px-6 py-3 text-left text-gray-600">Job Title</th>
                <th className="px-6 py-3 text-left text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-gray-600">Applied Date</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{app.candidateName}</p>
                      <p className="text-xs text-gray-500 mt-1">{app.candidateEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{app.jobTitle}</td>
                  <td className="px-6 py-4 text-gray-600">{app.company}</td>
                  <td className="px-6 py-4 text-gray-600">{app.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                      app.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : app.status === 'shortlisted'
                        ? 'bg-blue-100 text-blue-700'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {app.status === 'pending' && <Clock className="w-3 h-3" />}
                      {app.status === 'shortlisted' && <CheckCircle className="w-3 h-3" />}
                      {app.status === 'rejected' && <XCircle className="w-3 h-3" />}
                      {app.status === 'hired' && <CheckCircle className="w-3 h-3" />}
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-blue-50 rounded transition-colors" title="Download Resume">
                        <Download className="w-4 h-4 text-blue-600" />
                      </button>
                      {app.status === 'pending' && (
                        <>
                          <button className="p-1 hover:bg-green-50 rounded transition-colors" title="Shortlist">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-red-50 rounded transition-colors" title="Reject">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Application Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Candidate Name</p>
                  <p className="text-gray-900 mt-1">{selectedApp.candidateName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900 mt-1">{selectedApp.candidateEmail}</p>
                </div>
                <div>
                  <p className="text-gray-600">Job Title</p>
                  <p className="text-gray-900 mt-1">{selectedApp.jobTitle}</p>
                </div>
                <div>
                  <p className="text-gray-600">Company</p>
                  <p className="text-gray-900 mt-1">{selectedApp.company}</p>
                </div>
                <div>
                  <p className="text-gray-600">Applied Date</p>
                  <p className="text-gray-900 mt-1">{selectedApp.appliedDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs mt-1 ${
                    selectedApp.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : selectedApp.status === 'shortlisted'
                      ? 'bg-blue-100 text-blue-700'
                      : selectedApp.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Cover Letter</p>
                <p className="text-gray-900 mt-2 p-4 bg-gray-50 rounded-lg">{selectedApp.coverLetter}</p>
              </div>
              <div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedApp.status === 'pending' && (
                <>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Shortlist
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
