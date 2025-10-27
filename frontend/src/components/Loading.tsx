export function Loading() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex items-center gap-4">
        <div
          className="w-16 aspect-square border-4 border-gray-300 border-t-brand-blue rounded-full animate-spin"
          aria-label="Cargando"
          role="status"
        />
        <span className="text-gray-700 text-5xl">Cargando...</span>
      </div>
    </div>
  );
}