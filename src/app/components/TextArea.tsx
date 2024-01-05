interface Props {
  label: string;
  name: string;
  value: string;
  onchange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export default function TextArea({ label, name, value, onchange, required = true }: Props) {
  return (
    <div className='grid grid-cols-2 items-center w-full'>
      <label className='underline underline-offset-4' htmlFor={name}>
        {label}:
      </label>
      <textarea
        className='bg-dukeBlue rounded-md px-2 py-3 outline-none'
        required={required}
        name={name}
        value={value}
        onChange={onchange}
      />
    </div>
  );
}
