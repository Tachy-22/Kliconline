import { CreditCard, BanknoteIcon, Heart } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import Link from "next/link";

const DonateSection = () => {
  return (
    <section className="py-20 bg-church-purple text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Support Our Ministry
          </h2>
          <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Your generosity helps us continue teaching and preaching the Kingdom
            of God throughout the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <div className="bg-church-yellow p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Online Giving</h3>
            <p className="text-white/80 mb-4">
              Make a secure one-time or recurring donation through our online
              platform.
            </p>
            <Button
              asChild
              className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900"
            >
              <Link href="/donate">Give Now</Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <div className="bg-church-yellow p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BanknoteIcon className="h-8 w-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Bank Transfer</h3>
            <p className="text-white/80 mb-4">
              Transfer your donation directly to our church account.
            </p>
            <div className="text-white mb-4">
              <p className="font-semibold">Kingdom Life International Church</p>
              <p>Account: 12345678</p>
              <p>Sort Code: 12-34-56</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <div className="bg-church-yellow p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Partnership</h3>
            <p className="text-white/80 mb-4">
              Become a monthly partner to support our ongoing ministry efforts.
            </p>
            <Button
              asChild
              className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900"
            >
              <Link href="/donate#partnership">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
