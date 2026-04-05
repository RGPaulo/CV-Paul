import React from 'react';

export default function Main({ data }) {
  return (
    <div className="cv-main">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
        <div className="text-lg font-semibold mb-3">{data.subtitle}</div>
        <div className="border-b-2 border-black pb-3"></div>
      </div>

      {/* Profil */}
      <div className="cv-section">
        <div className="cv-section-title">Profil</div>
        <p className="text-sm leading-relaxed text-justify">{data.profile}</p>
      </div>

      {/* Expérience */}
      <div className="cv-section">
        <div className="cv-section-title">Expérience</div>
        <div className="space-y-6">
          {data.experiences.map((exp, idx) => (
            <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sm">{exp.title}</div>
                  <div className="text-sm text-gray-600">{exp.company} - {exp.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white bg-cv-blue px-2 py-1 rounded">
                    {exp.duration}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{exp.period}</div>
                </div>
              </div>
              <ul className="text-xs space-y-1 ml-4">
                {exp.bullets.map((bullet, bidx) => (
                  <li key={bidx} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Formation */}
      <div className="cv-section">
        <div className="cv-section-title">Formation</div>
        <div className="space-y-4">
          {data.formations.map((form, idx) => (
            <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sm">{form.title}</div>
                  <div className="text-sm text-gray-600">{form.school} - {form.location}</div>
                </div>
                <div className="text-xs text-gray-600">{form.period}</div>
              </div>
              <div className="text-xs text-gray-700 mb-2">{form.details}</div>
              {form.bullets && (
                <ul className="text-xs space-y-1 ml-4">
                  {form.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Projets Réalisés */}
      <div className="cv-section">
        <div className="cv-section-title">Projets Réalisés</div>
        <div className="space-y-4">
          {data.projects.map((proj, idx) => (
            <div key={idx}>
              <div className="font-bold text-sm mb-1">{proj.title}</div>
              <p className="text-xs text-gray-700 leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
