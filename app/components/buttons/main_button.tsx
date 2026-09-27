'use client';

interface MainButtonProps {
  text: string;
  onClick?: () => void;
}

export default function MainButton({ text, onClick }: MainButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#BC7C5C] hover:bg-[#a66a4c] text-white text-xs uppercase font-semibold px-5 py-2.5 rounded-full transition-colors"
    >
      {text}
    </button>
  );
}
