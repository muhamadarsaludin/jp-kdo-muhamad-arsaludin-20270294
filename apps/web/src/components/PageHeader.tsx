export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-semibold text-2xl text-primary">{title}</h1>
        {description ? <p className="mt-1 text-tertiary text-sm">{description}</p> : null}
      </div>
    </div>
  );
}
