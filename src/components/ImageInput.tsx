import React, { useRef } from 'react';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageInput({ value, onChange }: ImageInputProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <input
        type="text"
        placeholder="Image URL or leave blank to upload"
        value={value && value.startsWith('data:') ? '' : value || ''}
        onChange={e => onChange(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFile}
      />
      {value && (
        <img src={value} alt="preview" style={{ maxWidth: 80, maxHeight: 80, marginTop: 4 }} />
      )}
    </div>
  );
}
