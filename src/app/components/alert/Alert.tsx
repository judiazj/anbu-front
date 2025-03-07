
interface Props {
  message: string;
  typeAlert: 'info' | 'error' | 'success' | 'warning';
}

export const Alert = ({ message, typeAlert }: Props) => {

  const colors = {
    info: 'bg-blue-500',
    error: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-orange-500'
  }


  return (
    <div className={`font-regular relative mb-4 block w-full rounded-lg ${colors[typeAlert]} p-4 text-base leading-5 text-white opacity-100`}>
      {message}
    </div>
  )
}
