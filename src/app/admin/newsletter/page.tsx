import { NewsletterTable } from "@/components/events/tables/NewsletterTable";
import { NewsletterHistoryTable } from "@/components/events/tables/NewsletterHistoryTable";
import { fetchCollection } from "@/actions/fettchCollection";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default async function NewsletterPage() {
  const subscribersResult = await fetchCollection<SubscriberT>("subscribers");
  const newslettersResult = await fetchCollection<NewsletterHistoryT>(
    "newsletters"
  );

  const subscribers =
    "items" in subscribersResult ? subscribersResult.items : [];
  const newsletters =
    "items" in newslettersResult ? newslettersResult.items : [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-3 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Newsletter Management
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your newsletter campaigns and subscriber list in one place
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Create Newsletter</h2>
        <p className="mb-6 text-gray-600">
          Compose and send newsletters to your subscriber list
        </p>
        <NewsletterForm subscribers={subscribers} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Newsletter History</h2>
        <p className="mb-6 text-gray-600">
          View past newsletters and their performance metrics
        </p>
        <NewsletterHistoryTable newsletters={newsletters} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Subscriber List</h2>
        <p className="mb-6 text-gray-600">
          Manage your newsletter subscribers and their preferences
        </p>
        <NewsletterTable subscribers={subscribers} />
      </section>
    </div>
  );
}
