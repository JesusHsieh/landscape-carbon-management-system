const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-xl font-extrabold text-primary tracking-tight">{title}</h2>
    {subtitle && <p className="text-[13px] text-secondary mt-1">{subtitle}</p>}
  </div>
);

export default SectionHeading;
