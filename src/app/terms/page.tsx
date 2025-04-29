export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <section className="prose max-w-3xl">
        <p>Welcome to our website. By using our service, you agree to...</p>
        {/* Add your actual terms of service content here */}
        <p>Effective date: {new Date().toLocaleDateString()}</p>
      </section>
    </main>
  );
}

// Optional: Generate static pages for SSG
export async function generateStaticParams() {
  return [{ slug: 'terms' }];
}