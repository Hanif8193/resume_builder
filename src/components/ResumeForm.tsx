import type { ResumeData } from '../types';
import PersonalSection from './PersonalSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="form-panel">
      <h2>Build Your Resume</h2>
      <PersonalSection data={data.personal} onChange={v => update('personal', v)} />
      <EducationSection data={data.education} onChange={v => update('education', v)} />
      <ExperienceSection data={data.experience} onChange={v => update('experience', v)} />
      <SkillsSection data={data.skills} onChange={v => update('skills', v)} />
      <ProjectsSection data={data.projects} onChange={v => update('projects', v)} />
    </div>
  );
}
