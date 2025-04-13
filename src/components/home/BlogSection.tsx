import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BlogCard = ({
  title,
  excerpt,
  author,
  date,
  image,
  id,
}: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  id: string;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link href={`/blog/${id}`}>
          <Button
            variant="outline"
            className="mt-2 w-full border-church-purple text-church-purple hover:bg-church-purple hover:text-white"
          >
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const BlogSection = ({ blogs }: { blogs: BlogT[] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Latest Blog Posts
            </h2>
            <div className="w-20 h-1 bg-church-yellow mb-6"></div>
            <p className="text-lg max-w-2xl text-gray-700">
              Explore our blog for spiritual insights, teachings, and
              encouragement for your daily walk with God.
            </p>
          </div>
          <Link href="/blog">
            <Button
              variant="link"
              className="text-church-purple hidden md:flex items-center"
            >
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id as string}
                title={blog.title}
                excerpt={blog.excerpt || " Read and be blessed"}
                author={blog.author}
                date={blog.date}
                image={
                  (blog.imageUrls?.[0] || (blog?.images?.[0] as string)) ??
                  "/default-image.jpg"
                }
              />
            ))
          ) : (
            <p>No blog posts available at the moment.</p>
          )}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog">
            <Button
              variant="link"
              className="text-church-purple flex items-center mx-auto"
            >
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
