import { TextInput, FileInput, Image, Stack } from '@mantine/core';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageInput({ value, onChange }: ImageInputProps) {
  function handleFile(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Stack gap="xs">
      <TextInput
        placeholder="Image URL or leave blank to upload"
        value={value && value.startsWith('data:') ? '' : value || ''}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <FileInput
        placeholder="Upload image"
        accept="image/*"
        onChange={handleFile}
      />
      {value && (
        <Image src={value} alt="preview" maw={80} mah={80} fit="contain" />
      )}
    </Stack>
  );
}
