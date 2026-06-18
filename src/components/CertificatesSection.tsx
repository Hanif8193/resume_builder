import type { Certificate } from '../types';

interface Props {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

let nextId = 1;
function empty(): Certificate {
  return { id: `cert-${nextId++}`, name: '', issuer: '', link: '', image: '' };
}

export default function CertificatesSection({ data, onChange }: Props) {
  const update = (id: string, field: keyof Certificate, value: string) => {
    onChange(data.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleImage = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update(id, 'image', reader.result as string);
    reader.readAsDataURL(file);
  };

  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(c => c.id !== id));

  return (
    <fieldset>
      <legend>Certificates</legend>
      {data.map(cert => (
        <div key={cert.id} className="entry">
          <label className="cert-upload">
            {cert.image ? (
              <img src={cert.image} alt="Certificate" className="cert-preview" />
            ) : (
              <div className="cert-placeholder">Upload Certificate</div>
            )}
            <input type="file" accept="image/*" onChange={e => handleImage(cert.id, e)} hidden />
          </label>
          <label>Certificate Name <input value={cert.name} onChange={e => update(cert.id, 'name', e.target.value)} /></label>
          <label>Issuer <input value={cert.issuer} onChange={e => update(cert.id, 'issuer', e.target.value)} /></label>
          <label>Link (URL) <input value={cert.link} onChange={e => update(cert.id, 'link', e.target.value)} /></label>
          <button className="remove" onClick={() => remove(cert.id)}>Remove</button>
        </div>
      ))}
      <button className="add" onClick={add}>+ Add Certificate</button>
    </fieldset>
  );
}
