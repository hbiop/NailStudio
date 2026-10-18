'use client'
import { useRouter } from 'next/navigation';
import Header from "./components/header/header";
import MainContent from "./components/main/main";


export default function Home() {
  const router = useRouter();
  const openBooking = () => router.push('/account#booking');

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onLoginClick={() => router.push('/account')}></Header>
      <MainContent onBookClick={openBooking}></MainContent>
    </div>
  );
}
