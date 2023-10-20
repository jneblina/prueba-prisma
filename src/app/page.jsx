'use client'
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
      <div className='bg-black h-screen'>
        <h1 className='text-center text-4xl font-bold text-purple-200 p-4'>Proyecto Prisma</h1>
      </div>
      </main>
      <Footer/>
    </>
  );
}