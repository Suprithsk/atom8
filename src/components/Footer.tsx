export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container-tight px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/nuvepro_technologies_private_ltd_logo.jpg"
              alt="Nuvepro"
              className="h-8 w-auto object-contain brightness-200"
            />
            <span className="font-bold text-white">Atom8</span>
          </div>
          <p className="text-sm">&copy; {currentYear} Nuvepro Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
