import type { Experience } from '../types';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

let nextId = 1;
function empty(): Experience {
  return { id: `exp-${nextId++}`, company: '', position: '', location: '', startDate: '', endDate: '', description: '' };
}

export default function ExperienceSection({ data, onChange }: Props) {
  const update = (id: string, field: keyof Experience, value: string) => {
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));

  return (
    <fieldset>
      <legend>Experience</legend>
      {data.map(exp => (
        <div key={exp.id} className="entry">
          <label>Company <input value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} /></label>
          <label>Position <input value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} /></label>
          <label>Location <input value={exp.location} onChange={e => update(exp.id, 'location', e.target.value)} /></label>
          <label>Start <input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} /></label>
          <label>End <input type="month" value={exp.endDate} onChange={e => update(exp.id, 'endDate', e.target.value)} /></label>
          <label>Description
            <textarea rows={3} value={exp.description} onChange={e => update(exp.id, 'description', e.target.value)} />
          </label>
          <button className="remove" onClick={() => remove(exp.id)}>Remove</button>
        </div>
      ))}
      <button className="add" onClick={add}>+ Add Experience</button>
    </fieldset>
  );
}
