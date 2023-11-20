interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return <main className='p-5 flex flex-col w-full max-w-7xl mx-auto pt-20'>{children}</main>;
}
