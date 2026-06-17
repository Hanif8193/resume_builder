import type { Personal } from '../types';

interface Props {
  data: Personal;
  onChange: (data: Personal) => void;
}

export default function PersonalSection({ data, onChange }: Props) {
  const update = (field: keyof Personal, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update('photo', reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <fieldset>
      <legend>Personal Information</legend>
      <label className="photo-upload">
        {data.photo ? (
          <img src={data.photo} alt="Preview" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">Upload Photo</div>
        )}
        <input type="file" accept="image/*" onChange={handlePhoto} hidden />
      </label>
      <label>Full Name <input value={data.fullName} onChange={e => update('fullName', e.target.value)} /></label>
      <label>Email <input value={data.email} onChange={e => update('email', e.target.value)} /></label>
      <label>Phone <input value={data.phone} onChange={e => update('phone', e.target.value)} /></label>
      <label>Location <input value={data.location} onChange={e => update('location', e.target.value)} /></label>
      <label>LinkedIn <input value={data.linkedin} onChange={e => update('linkedin', e.target.value)} /></label>
      <label>Website <input value={data.website} onChange={e => update('website', e.target.value)} /></label>
      <label>Summary
        <textarea rows={4} value={data.summary} onChange={e => update('summary', e.target.value)} />
      </label>
    </fieldset>
  );
}
