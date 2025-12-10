import { useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    location: 'New York, NY',
    joinDate: 'January 2024',
    favoriteStores: ['En Pointe Dancewear', 'Ballet Boutique', 'Prima Dance Supply'],
    stylePreferences: ['Classical Ballet', 'Contemporary', 'Studio Practice']
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
        
        <div className="px-8 pb-8">
          {/* Avatar and Edit Button */}
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <div className="mb-2">
                <h2 className="text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">Style Explorer</p>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.location}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <p className="text-gray-900">{profile.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="mb-4">Style Preferences</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.stylePreferences.map((style, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>

            <h3 className="mb-4">Favorite Stores</h3>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteStores.map((store, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                >
                  {store}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="mb-4">Activity Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-900">24</p>
                <p className="text-gray-600 text-sm">Products Viewed</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-900">8</p>
                <p className="text-gray-600 text-sm">Comparisons Made</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-900">5</p>
                <p className="text-gray-600 text-sm">Outfits Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}