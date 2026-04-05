import React from 'react';
import { MapPin, Phone, Mail, Car } from 'lucide-react';

export default function Sidebar({ data }) {
  return (
    <div className="cv-sidebar">
      {/* Photo */}
      <div className="mb-8 flex justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <img 
            src={data.profileImage} 
            alt="Paul Chauvière" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Coordonnées */}
      <div className="cv-section">
        <div className="cv-section-title">Coordonnées</div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="mt-1 flex-shrink-0" />
            <span>{data.contact.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={16} className="mt-1 flex-shrink-0" />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={16} className="mt-1 flex-shrink-0" />
            <span className="break-all">{data.contact.email}</span>
          </div>
          <div className="flex items-start gap-3">
            <Car size={16} className="mt-1 flex-shrink-0" />
            <span>{data.contact.permis}</span>
          </div>
        </div>
      </div>

      {/* Compétences */}
      <div className="cv-section">
        <div className="cv-section-title">Compétences</div>
        <ul className="text-sm space-y-2">
          {data.skills.map((skill, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-white mt-1">•</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Centres d'intérêt */}
      <div className="cv-section">
        <div className="cv-section-title">Centres d'intérêt</div>
        <p className="text-sm leading-relaxed">{data.interests}</p>
      </div>

      {/* Langues */}
      <div className="cv-section">
        <div className="cv-section-title">Langues</div>
        <div className="space-y-3">
          {data.languages.map((lang, idx) => (
            <div key={idx}>
              <div className="font-semibold text-sm">{lang.name}</div>
              <div className="text-xs text-gray-200">{lang.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
