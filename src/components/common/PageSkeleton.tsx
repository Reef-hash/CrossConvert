import { Card } from './Card';

export const PageSkeleton = () => {
  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-4 h-10 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Card key={index} className="space-y-3">
              <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-9 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
