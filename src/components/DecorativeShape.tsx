export function DecorativeShape() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
    </div>
  );
}
