import type { Skill } from '../types';

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

let nextId = 1;
function empty(): Skill {
  return { id: `skill-${nextId++}`, name: '' };
}

export default function SkillsSection({ data, onChange }: Props) {
  const update = (id: string, value: string) => {
    onChange(data.map(s => (s.id === id ? { ...s, name: value } : s)));
  };

  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(s => s.id !== id));

  return (
    <fieldset>
      <legend>Skills</legend>
      <div className="skills-grid">
        {data.map(skill => (
          <div key={skill.id} className="skill-tag">
            <input value={skill.name} onChange={e => update(skill.id, e.target.value)} placeholder="e.g. JavaScript" />
            <button className="remove" onClick={() => remove(skill.id)}>x</button>
          </div>
        ))}
      </div>
      <button className="add" onClick={add}>+ Add Skill</button>
    </fieldset>
  );
}
