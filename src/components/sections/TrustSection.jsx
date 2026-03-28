import { copy } from '../../content';

export default function TrustSection({ lang }) {
  const content = copy[lang].heritage;

  return (
    <section className="bg-primary py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-white font-headline text-3xl md:text-4xl font-bold tracking-tight">
            {content.text} <span className="text-tertiary-fixed italic">{content.highlight}</span>
          </h2>
        </div>
        <div className="flex items-center gap-12 opacity-60 grayscale brightness-200">
          <img 
            alt="Partner Logo 1" 
            className="h-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkzCWqlrBU-np5FNtoPYHJOSHsl8xS9p6TnVtbiCGs0UfKYgqAWwjLXptlELSbod0ilxo0Hjdqt94Zo8z7tArGXacwUc_-FbP9YNIaK5iRdTD2E1wj7o-NdacPsXR1AxaTL4D_s0IiVaUAE0x6PKpuPJ3hx1avNGQpzyH8m2a-HVUQb2Bm-HG2zBrz_w0KoGgOlpROdAQBC9YrRSL3V7vTxGvMJKybx9wGbEETx-suzKT1YFfERHXXlyZARhufFP8HhUl1kATfvp41"
          />
          <img 
            alt="Partner Logo 2" 
            className="h-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW6SqENjSEpAK90i3h-oYYgQxwxWj944u1IdB9I8dA4dd-KU81yMeWn_IryNVmDjOU_g5S9bHgDjl1wzFGE6sXk-EvyEDDM1TDDXhJw3m3caH31eajlQqjp5IsjQVTI1wcCwDSI-E8Vt5lIMLKfkaUjC2qYmztKdApCqbAAFzykD2yEJbUR3jmdOZQzMUR006QwPvlS9QlTWlWIAcNV7nQFHfqFki9GyWCweV7R1WCKPe4PadBmng7xjasv-yzhcX-2OIh5FTXGQVd"
          />
        </div>
      </div>
    </section>
  );
}
