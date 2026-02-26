interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <span className="text-5xl">⚠️</span>
      <p className="text-red-600 font-medium">{message}</p>
      <p className="text-slate-400 text-sm">Veuillez réessayer plus tard.</p>
    </div>
  );
}
