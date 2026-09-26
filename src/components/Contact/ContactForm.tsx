import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react'
import './ContactForm.css'

interface HCaptchaInstance {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback'?: () => void
    },
  ) => string
  reset: (widgetId?: string) => void
}

declare global {
  interface Window {
    hcaptcha?: HCaptchaInstance
  }
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const HCAPTCHA_SCRIPT_ID = 'hcaptcha-script'

// Site Key compartida que Web3Forms usa para verificar hCaptcha en su plan
// gratuito. Una cuenta propia de hCaptcha solo aplica en planes de pago de
// Web3Forms (ver VITE_HCAPTCHA_SITE_KEY para sobreescribirla si se migra).
const WEB3FORMS_SHARED_HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

function useHCaptcha(siteKey: string | undefined) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!siteKey) return

    if (!document.getElementById(HCAPTCHA_SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = HCAPTCHA_SCRIPT_ID
      script.src = 'https://js.hcaptcha.com/1/api.js'
      script.async = true
      document.body.appendChild(script)
    }

    let cancelled = false
    let attempts = 0

    const tryRender = () => {
      if (cancelled) return
      const hcaptcha = window.hcaptcha
      if (hcaptcha && containerRef.current && widgetId.current === null) {
        widgetId.current = hcaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (value) => setToken(value),
          'expired-callback': () => setToken(''),
        })
      } else if (attempts < 40) {
        attempts += 1
        setTimeout(tryRender, 250)
      }
    }

    tryRender()

    return () => {
      cancelled = true
    }
  }, [siteKey])

  const reset = () => {
    if (window.hcaptcha && widgetId.current !== null) {
      window.hcaptcha.reset(widgetId.current)
    }
    setToken('')
  }

  return { containerRef, token, reset }
}

function ContactForm() {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  const hcaptchaSiteKey =
    import.meta.env.VITE_HCAPTCHA_SITE_KEY ?? WEB3FORMS_SHARED_HCAPTCHA_SITE_KEY

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { containerRef: captchaContainerRef, token: captchaToken, reset: resetCaptcha } =
    useHCaptcha(hcaptchaSiteKey)

  const isConfigured = Boolean(accessKey)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConfigured || !accessKey) {
      setStatus('error')
      setErrorMessage('El formulario aún no está configurado. Escríbeme directamente por correo.')
      return
    }

    const honeypot = (event.currentTarget.elements.namedItem('botcheck') as HTMLInputElement)
      ?.checked
    if (honeypot) {
      // Bot detectado: fingimos éxito sin enviar nada.
      setStatus('success')
      return
    }

    if (hcaptchaSiteKey && !captchaToken) {
      setStatus('error')
      setErrorMessage('Por favor completa el captcha antes de enviar.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Nuevo mensaje desde el portafolio — ${name}`,
          from_name: name,
          email,
          message,
          ...(hcaptchaSiteKey ? { 'h-captcha-response': captchaToken } : {}),
        }),
      })

      const data: { success: boolean; message?: string } = await response.json()

      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        resetCaptcha()
      } else {
        setStatus('error')
        setErrorMessage(data.message ?? 'No se pudo enviar el mensaje. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('No se pudo conectar con el servidor. Intenta de nuevo más tarde.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__field">
        <label htmlFor="contact-name">
          <User size={16} aria-hidden="true" /> Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">
          <Mail size={16} aria-hidden="true" /> Correo
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          autoComplete="email"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">
          <MessageSquare size={16} aria-hidden="true" /> Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntame en qué puedo ayudarte..."
        />
      </div>

      {hcaptchaSiteKey && <div className="contact-form__captcha" ref={captchaContainerRef} />}

      <button
        type="submit"
        className="btn btn--primary contact-form__submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={18} className="contact-form__spinner" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Enviar mensaje
          </>
        )}
      </button>

      {status === 'success' && (
        <p className="contact-form__status contact-form__status--success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          ¡Mensaje enviado! Te responderé pronto.
        </p>
      )}

      {status === 'error' && (
        <p className="contact-form__status contact-form__status--error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          {errorMessage}
        </p>
      )}

      {!isConfigured && (
        <p className="contact-form__status contact-form__status--error" role="status">
          <AlertCircle size={18} aria-hidden="true" />
          Formulario en configuración — mientras tanto, usa los enlaces de arriba.
        </p>
      )}
    </form>
  )
}

export default ContactForm
