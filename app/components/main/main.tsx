import { useState } from "react";
import About from "../about/About";
import HeroSection from "../hero-section/hero-section";
import PriceList from "../price_list/price_list";
import MainSlider from "../slider/slider";

export default function MainContent({ onBookClick }: { onBookClick: () => void }) {
  return (
    <main className="max-w-6xl mx-auto px-4 pt-32">
            <HeroSection onBookClick={onBookClick}></HeroSection>
            <MainSlider></MainSlider>
            <PriceList></PriceList>
            <About></About>
    </main>
  )
}
