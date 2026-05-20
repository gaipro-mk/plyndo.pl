import { useState } from 'react';
import { copy } from '../../content';

export default function WaitlistSection({ lang = 'pl' }) {
  const content = copy[lang].waitlist;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!content) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="waitlist" className="py-24 bg-black text-white px-6">
      <div className="max-w-[880px] mx-auto text-center">
        <span className="t-eyebrow text-white">{content.eyebrow}</span>
        <h2 className="t-h1 mt-3 text-white">
          {content.title}
        </h2>
        <p className="mt-3.5 text-white/70 text-base leading-[1.6] max-w-[580px] mx-auto">
          {content.lead}
        </p>

        {submitted ? (
          <div className="mt-8 px-6 py-4.5 bg-white/[0.08] border border-white/25 rounded-xl inline-block text-white font-semibold">
            {content.success}
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="mt-8 flex gap-2.5 max-w-[500px] mx-auto bg-white/[0.06] p-1.5 rounded-[14px] border border-white/10"
          >
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder={content.placeholder}
              className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-[15px] text-white font-sans"
            />
            <button 
              type="submit" 
              className="bg-white text-black border-none px-5 py-[13px] rounded-[10px] font-extrabold text-[14px] cursor-pointer"
            >
              {content.submit}
            </button>
          </form>
        )}
        <p className="mt-6 text-xs text-white/50">
          {content.note}
        </p>
      </div>
    </section>
  );
}
