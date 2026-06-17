import type { Project } from '../types';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

let nextId = 1;
function empty(): Project {
  return { id: `proj-${nextId++}`, name: '', description: '', technologies: '', link: '' };
}

export default function ProjectsSection({ data, onChange }: Props) {
  const update = (id: string, field: keyof Project, value: string) => {
    onChange(data.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(p => p.id !== id));

  return (
    <fieldset>
      <legend>Projects</legend>
      {data.map(proj => (
        <div key={proj.id} className="entry">
          <label>Project Name <input value={proj.name} onChange={e => update(proj.id, 'name', e.target.value)} /></label>
          <label>Description
            <textarea rows={3} value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} />
          </label>
          <label>Technologies <input value={proj.technologies} onChange={e => update(proj.id, 'technologies', e.target.value)} /></label>
          <label>Link <input value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} /></label>
          <button className="remove" onClick={() => remove(proj.id)}>Remove</button>
        </div>
      ))}
      <button className="add" onClick={add}>+ Add Project</button>
    </fieldset>
  );
}
