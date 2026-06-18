import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  const { personal, education, experience, skills, projects, certificates } = data;

  return (
    <div className="preview-panel">
      <h2>Preview</h2>
      <div id="resume-preview" className="resume-page">
        <header className="resume-header">
          {personal.photo && <img src={personal.photo} alt="Photo" className="resume-photo" />}
          <h1>{personal.fullName || 'Your Name'}</h1>
          <div className="contact-line">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
          <div className="contact-line">
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </header>

        {personal.summary && (
          <section>
            <h3>Summary</h3>
            <p>{personal.summary}</p>
          </section>
        )}

        {education.length > 0 && education.some(e => e.institution) && (
          <section>
            <h3>Education</h3>
            {education.filter(e => e.institution).map(edu => (
              <div key={edu.id} className="resume-item">
                <div className="item-header">
                  <strong>{edu.institution}</strong>
                  <span className="date">{edu.startDate} - {edu.endDate || 'Present'}</span>
                </div>
                <div className="item-sub">{edu.degree} {edu.field && `in ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}</div>
              </div>
            ))}
          </section>
        )}

        {experience.length > 0 && experience.some(e => e.company) && (
          <section>
            <h3>Experience</h3>
            {experience.filter(e => e.company).map(exp => (
              <div key={exp.id} className="resume-item">
                <div className="item-header">
                  <strong>{exp.position}</strong>
                  <span className="date">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <div className="item-sub">{exp.company}{exp.location && `, ${exp.location}`}</div>
                {exp.description && <p className="item-desc">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && skills.some(s => s.name) && (
          <section>
            <h3>Skills</h3>
            <div className="skills-list">
              {skills.filter(s => s.name).map(s => (
                <span key={s.id} className="skill-badge">{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && projects.some(p => p.name) && (
          <section>
            <h3>Projects</h3>
            {projects.filter(p => p.name).map(proj => (
              <div key={proj.id} className="resume-item">
                <div className="item-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>}
                </div>
                {proj.technologies && <div className="item-sub">{proj.technologies}</div>}
                {proj.description && <p className="item-desc">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {certificates.length > 0 && certificates.some(c => c.name) && (
          <section>
            <h3>Certificates</h3>
            {certificates.filter(c => c.name).map(cert => (
              <div key={cert.id} className="resume-item">
                <div className="item-header">
                  <strong>{cert.name}</strong>
                  {cert.link && <a href={cert.link} target="_blank" rel="noreferrer">View Certificate</a>}
                </div>
                {cert.issuer && <div className="item-sub">{cert.issuer}</div>}
                {cert.image && <img src={cert.image} alt={cert.name} className="cert-image-preview" />}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
