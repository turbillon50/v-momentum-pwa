'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { 
  Send, Calendar, MessageCircle, Mail, MapPin, 
  Clock, Check, Loader2, ArrowRight
} from 'lucide-react'

export function ContactScreen() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const budgetOptions = [
    { value: 'mvp', label: { es: 'MVP (~$2,500 USD)', en: 'MVP (~$2,500 USD)' } },
    { value: 'starter', label: { es: 'Starter (~$5,000 USD)', en: 'Starter (~$5,000 USD)' } },
    { value: 'scale', label: { es: 'Scale (~$10,000 USD)', en: 'Scale (~$10,000 USD)' } },
    { value: 'custom', label: { es: 'Personalizado', en: 'Custom' } },
  ]

  if (isSubmitted) {
    return (
      <div className="px-4 md:px-8 max-w-2xl mx-auto min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground">
            {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'es'
              ? 'Te responderemos en menos de 24 horas.'
              : 'We will respond within 24 hours.'}
          </p>
          <motion.button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {language === 'es' ? 'Hablemos de tu proyecto' : "Let's talk about your project"}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {language === 'es'
            ? 'Cuéntanos tu idea y te ayudamos a hacerla realidad.'
            : 'Tell us your idea and we help you make it real.'}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'es' ? 'Nombre' : 'Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'es' ? 'Empresa (opcional)' : 'Company (optional)'}
              </label>
              <input
                type="text"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                placeholder={language === 'es' ? 'Nombre de tu empresa' : 'Your company name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'es' ? 'Presupuesto estimado' : 'Estimated budget'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormState({ ...formState, budget: option.value })}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formState.budget === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                    }`}
                  >
                    {option.label[language]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'es' ? 'Cuéntanos sobre tu proyecto' : 'Tell us about your project'}
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
                placeholder={language === 'es' 
                  ? '¿Qué quieres construir? ¿Cuál es tu problema a resolver?'
                  : 'What do you want to build? What problem are you solving?'}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'es' ? 'Enviando...' : 'Sending...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {language === 'es' ? 'Agendar llamada' : 'Schedule call'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'es' 
                    ? 'Reserva 30 min para platicar'
                    : 'Book 30 min to chat'}
                </p>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-primary mt-2"
                  whileHover={{ x: 3 }}
                >
                  Calendly <ArrowRight className="w-3 h-3" />
                </motion.a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">hola@vmomentum.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {language === 'es' ? 'Horario' : 'Hours'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'es' ? 'Lun-Vie 9am-6pm CST' : 'Mon-Fri 9am-6pm CST'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-primary/20">
            <p className="text-sm text-foreground">
              {language === 'es'
                ? '"V Momentum transformó nuestra idea en una app funcional en solo 2 semanas. Increíble."'
                : '"V Momentum transformed our idea into a functional app in just 2 weeks. Incredible."'}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              — Carlos M., Founder @ TechStartup
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
