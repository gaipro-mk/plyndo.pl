import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { copy } from '../../content';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WaitlistSection({ lang }) {
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
    <section className="py-32 relative overflow-hidden" id="waitlist">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-surface-container-lowest z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-primary/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 inline-block">
            {content.eyebrow}
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold font-headline text-on-surface tracking-tighter mb-8 text-balance">
            {content.title}
          </h2>
          <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl mx-auto mb-12">
            {content.lead}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  className="w-full pl-12 pr-4 py-4 md:py-5 border-2 border-outline-variant/30 rounded-xl bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors text-lg"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-primary text-on-primary font-bold py-4 md:py-5 px-8 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-95"
              >
                {content.submit}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border-2 border-primary/20 p-8 rounded-2xl max-w-xl mx-auto mb-8 flex flex-col items-center shadow-lg shadow-primary/10"
            >
              <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
              <p className="text-xl font-bold font-headline text-on-surface">{content.success}</p>
            </motion.div>
          )}

          <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
            {content.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
