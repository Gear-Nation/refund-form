interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'password';
  value: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
}

export default function Input({ label, name, type = 'text', value, onchange, required = true }: InputProps) {
  return (
    <div className='grid grid-cols-2 items-center w-full'>
      <label className='underline underline-offset-4' htmlFor={name}>
        {label}:
      </label>
      <input
        className='bg-dukeBlue rounded-md px-2 py-3 outline-none'
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onchange}
      />
    </div>
  );
}
