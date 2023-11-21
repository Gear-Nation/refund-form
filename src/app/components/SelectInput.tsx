interface SelectProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'email';
  value: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
  multiple?: boolean;
}

export default function SelectInput({
  label,
  name,
  value,
  onchange,
  required = true,
  children,
  multiple = false
}: SelectProps) {
  return (
    <div className='grid grid-cols-2 items-center w-full'>
      <label className='underline underline-offset-4' htmlFor={name}>
        {label}:
      </label>
      <select
        multiple={multiple}
        className='bg-dukeBlue rounded-md px-2 py-3 outline-none cursor-pointer'
        name={name}
        onChange={onchange}
        required={required}
        value={value}
      >
        {children}
      </select>
    </div>
  );
}
