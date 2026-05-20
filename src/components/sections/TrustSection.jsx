import { copy } from '../../content';

export default function TrustSection({ lang = 'pl' }) {
  const content = copy[lang].heritage;

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="max-w-[880px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1">
          <h2 className="t-h3 text-white">
            {content.text} <span className="text-white/70 italic">{content.highlight}</span>
          </h2>
        </div>
        <div className="flex items-center justify-center gap-12 opacity-60 grayscale brightness-200">
          <img 
            alt="Partner Logo 1" 
            className="h-10 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkzCWqlrBU-np5FNtoPYHJOSHsl8xS9p6TnVtbiCGs0UfKYgqAWwjLXptlELSbod0ilxo0Hjdqt94Zo8z7tArGXacwUc_-FbP9YNIaK5iRdTD2E1wj7o-NdacPsXR1AxaTL4D_s0IiVaUAE0x6PKpuPJ3hx1avNGQpzyH8m2a-HVUQb2Bm-HG2zBrz_w0KoGgOlpROdAQBC9YrRSL3V7vTxGvMJKybx9wGbEETx-suzKT1YFfERHXXlyZARhufFP8HhUl1kATfvp41"
          />
          <img 
            alt="Partner Logo 2" 
            className="h-10 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW6SqENjSEpAK90i3h-oYYgQxwxWj944u1IdB9I8dA4dd-KU81yMeWn_IryNVmDjOU_g5S9bHgDjl1wzFGE6sXk-EvyEDDM1TDDXhJw3m3caH31eajlQqjp5IsjQVTI1wcCwDSI-E8Vt5lIMLKfkaUjC2qYmztKdApCqbAAFzykD2yEJbUR3jmdOZQzMUR006QwPvlS9QlTWlWIAcNV7nQFHfqFki9GyWCweV7R1WCKPe4PadBmng7xjasv-yzhcX-2OIh5FTXGQVd"
          />
        </div>
      </div>
    </section>
  );
}
