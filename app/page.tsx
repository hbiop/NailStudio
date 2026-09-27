'use client'
import { useState } from "react";
import Header from "./components/header/header";
import MainContent from "./components/main/main";
import BookingModal from './components/modal_window/modal_window';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onBookClick={() => setIsModalOpen(true)}></Header>
      <MainContent onBookClick={() => setIsModalOpen(true)}></MainContent>
      <BookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
    </div>
  );
}
