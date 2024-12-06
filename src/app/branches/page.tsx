import React from 'react'
import Branches from '@/components/layouts/Branches'
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const Page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Branches />
      <Footer />
    </div>
  );
}

export default Page