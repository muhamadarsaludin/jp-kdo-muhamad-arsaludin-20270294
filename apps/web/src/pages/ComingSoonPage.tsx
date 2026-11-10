import { PageHeader } from "@/components/PageHeader";

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="mt-6 rounded-2xl border border-secondary border-dashed bg-primary p-10 text-center">
        <p className="font-medium text-primary">Halaman ini sedang disiapkan</p>
        <p className="mt-1 text-tertiary text-sm">
          API-nya sudah tersedia. Tampilan CRUD akan menyusul pada tahap berikutnya.
        </p>
      </div>
    </div>
  );
}
