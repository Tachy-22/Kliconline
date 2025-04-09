"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/components/ui/button';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TestimonialsSection = ({ testimonies }: { testimonies: TestimonyT[] }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonies.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Testimonies</h2>
          <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            Hear from our members as they share their victory reports from
            Kingdom Life International Church!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-church-purple/20"></div>
                  {testimonies[currentTestimonial].image ? (
                    <img 
                      src={testimonies[currentTestimonial].image} 
                      alt={testimonies[currentTestimonial].author}
                      className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-white relative z-10"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full mx-auto border-4 border-white relative z-10 bg-church-purple flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {getInitials(testimonies[currentTestimonial].author)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-serif text-xl font-bold">{testimonies[currentTestimonial].author}</h4>
                  <p className="text-gray-600">Church Member</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Quote className="h-10 w-10 text-church-yellow mb-4" />
                <p className="text-lg italic text-gray-700 mb-6">
                  {testimonies[currentTestimonial].content}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full border-church-purple hover:bg-church-purple hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-church-purple' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full border-church-purple hover:bg-church-purple hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
