export function DesktopOnlyMessage({ message }: { message: string }) {
  return (
    <div className="block md:hidden mt-20 text-center p-6">
      <p className="text-3xl font-semibold text-red-600">{message} Usa una computadora.</p>
    </div>
  );
}
