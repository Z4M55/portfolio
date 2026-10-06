export default function Footer() {
  return (
    <footer className="bg-jet border-t border-white/[0.06] py-8">
      <div className="max-w-8xl mx-auto px-8 md:px-12 flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <p className="font-sans text-xs text-white/30">Samuel Serna</p>
          <p className="font-sans text-[10px] tracking-wide text-white/18">
            Interactive Designer · Medellín — Colombia
          </p>
        </div>
        <p className="font-sans text-[10px] text-white/18">© 2026</p>
      </div>
    </footer>
  );
}
