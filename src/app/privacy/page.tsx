export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <section className="prose max-w-3xl">
        <p>Your privacy is important to us. This Privacy Policy explains...</p>
        {/* Add your actual privacy policy content here */}
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </section>
    </main>
  );
}

// Optional: Generate static pages for SSG
export async function generateStaticParams() {
  return [{ slug: 'privacy' }];
}