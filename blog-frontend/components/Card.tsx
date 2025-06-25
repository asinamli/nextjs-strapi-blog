"use client";

type Props = {
  children: React.ReactNode;
}

export default function Card({children}: Props) {
  return (
   <main className="flex-grow flex items-center justify-center p-6 mt-50"> <div className="p-6 bg-blue-900 rounded-lg shadow-sm border border-blue-900 hover:shadow-md transition-shadow text-white">
      {children}
    </div></main>
  );
}