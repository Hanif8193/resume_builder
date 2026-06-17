import type { Education } from '../types';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

let nextId = 1;
function empty(): Education {
  return { id: `edu-${nextId++}`, institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
}

export default function EducationSection({ data, onChange }: Props) {
  const update = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));

  return (
    <fieldset>
      <legend>Education</legend>
      {data.map(edu => (
        <div key={edu.id} className="entry">
          <label>Institution <input value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} /></label>
          <label>Degree <input value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} /></label>
          <label>Field of Study <input value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} /></label>
          <label>Start <input type="month" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} /></label>
          <label>End <input type="month" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} /></label>
          <label>GPA <input value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} /></label>
          <button className="remove" onClick={() => remove(edu.id)}>Remove</button>
        </div>
      ))}
      <button className="add" onClick={add}>+ Add Education</button>
    </fieldset>
  );
}
