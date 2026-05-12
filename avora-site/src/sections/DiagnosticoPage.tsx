import { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  hotel: string;
  ciudad: string;
  habitaciones: string;
  tipo: string;
  reto: string;
  membresia: string;
  mensaje: string;
};

const tipoOptions = ['Independiente', 'Familiar', 'Boutique', 'Mediano', 'Otro'];
const retoOptions = [
  'Poca ocupación',
  'Altas comisiones de OTAs',
  'Falta de seguimiento comercial',
  'Falta de tecnología',
  'Equipo sin capacitación',
  'Necesidad de capital',
  'Procesos desordenados',
  'Otro',
];
const membresiaOptions = [
  'AVORA Insight',
  'AVORA Capital',
  'AVORA Tec',
  'AVORA Tec Plus',
  'AVORA People',
  'AVORA Duo',
  'AVORA Essentials',
  'AVORA Legend',
  'Aún no sé',
];

export default function DiagnosticoPage({ selectedMembership = '' }: { selectedMembership?: string }) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    hotel: '',
    ciudad: '',
    habitaciones: '',
    tipo: '',
    reto: '',
    membresia: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openSelect, setOpenSelect] = useState<keyof FormData | null>(null);

  useEffect(() => {
    if (selectedMembership) {
      setFormData((prev) => ({ ...prev, membresia: selectedMembership }));
      setSubmitted(false);
      setError('');
    }
  }, [selectedMembership]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setOpenSelect(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar la solicitud.');
      }

      setSubmitted(true);
    } catch (err) {
      // The form still works visually while you connect/deploy the Resend backend.
      setError(err instanceof Error ? err.message : 'No se pudo enviar la solicitud.');
    } finally {
      setSubmitting(false);
    }
  };

  const formRef = useScrollReveal<HTMLDivElement>({ threshold: 0.85 });

  const inputClass =
    'w-full bg-[rgba(10,10,10,0.6)] border border-[rgba(200,169,126,0.2)] rounded px-4 py-3 font-body text-[15px] text-avora-text-primary placeholder:text-avora-text-muted focus:border-[rgba(200,169,126,0.6)] focus:outline-none focus:ring-[3px] focus:ring-[rgba(200,169,126,0.1)] transition-all duration-200';

  const SelectField = ({
    name,
    options,
    placeholder = 'Selecciona...',
  }: {
    name: keyof FormData;
    options: string[];
    placeholder?: string;
  }) => {
    const isOpen = openSelect === name;
    const value = formData[name];

    return (
      <div
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenSelect(null);
          }
        }}
      >
        <button
          type="button"
          className={`${inputClass} flex items-center justify-between text-left`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setOpenSelect(isOpen ? null : name)}
        >
          <span className={value ? 'text-avora-text-primary' : 'text-avora-text-muted'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 text-avora-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-[80] max-h-60 overflow-auto rounded border border-[rgba(200,169,126,0.34)] bg-[#121212] p-1 shadow-[0_18px_50px_rgba(0,0,0,.65)]"
            role="listbox"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between rounded px-3 py-2 text-left font-body text-sm text-avora-text-muted hover:bg-[rgba(200,169,126,0.1)]"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSelect(name, '')}
            >
              {placeholder}
              {!value && <Check className="h-4 w-4 text-avora-gold" />}
            </button>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="flex w-full items-center justify-between rounded px-3 py-2 text-left font-body text-sm text-avora-text-secondary hover:bg-[rgba(200,169,126,0.14)] hover:text-avora-text-primary"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(name, option)}
                role="option"
                aria-selected={value === option}
              >
                {option}
                {value === option && <Check className="h-4 w-4 text-avora-gold" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="diagnostico" className="no-edge-fade relative z-10 pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-tight">
            Solicita tu diagnóstico
          </h1>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
            Cuéntanos sobre tu hotel. Te respondemos con un primer mapa de claridad para saber qué puede mejorar, qué requiere orden y qué oportunidad puede convertirse en crecimiento.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 md:pb-32">
        <div className="container-avora max-w-xl">
          {submitted ? (
            <div
              ref={formRef}
              className="glass-card p-8 text-center border-[rgba(200,169,126,0.3)]"
            >
              <div className="w-16 h-16 rounded-full bg-avora-gold/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-avora-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-avora-text-primary mb-4">
                Gracias. Recibimos tu solicitud.
              </h3>
              <p className="font-body text-base text-avora-text-secondary leading-relaxed">
                El equipo AVORA revisará tu contexto y te contactará para definir el siguiente paso.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card no-edge-fade p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="md:col-span-2">
                  <label className="label-avora mb-1 block text-[11px]">Nombre completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Correo corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="correo@hotel.com"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                {/* Hotel */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Nombre del hotel *</label>
                  <input
                    type="text"
                    name="hotel"
                    value={formData.hotel}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Nombre del hotel"
                  />
                </div>

                {/* Ciudad */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Ciudad / Ubicación *</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Ciudad"
                  />
                </div>

                {/* Habitaciones */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Num. aprox. de habitaciones</label>
                  <input
                    type="number"
                    name="habitaciones"
                    value={formData.habitaciones}
                    onChange={handleChange}
                    min="1"
                    className={inputClass}
                    placeholder="20"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="label-avora mb-1 block text-[11px]">Tipo de hotel</label>
                  <SelectField name="tipo" options={tipoOptions} />
                </div>

                {/* Reto */}
                <div className="md:col-span-2">
                  <label className="label-avora mb-1 block text-[11px]">Principal reto actual</label>
                  <SelectField name="reto" options={retoOptions} />
                </div>

                {/* Membresia */}
                <div className="md:col-span-2">
                  <label className="label-avora mb-1 block text-[11px]">Membresía de interés</label>
                  <SelectField name="membresia" options={membresiaOptions} />
                </div>

                {formData.membresia && (
                  <div className="md:col-span-2 rounded border border-[rgba(200,169,126,0.22)] bg-[rgba(200,169,126,0.055)] px-4 py-3">
                    <p className="font-body text-sm text-avora-text-secondary">
                      Membresía seleccionada: <span className="text-avora-gold font-medium">{formData.membresia}</span>
                    </p>
                  </div>
                )}

                {/* Mensaje */}
                <div className="md:col-span-2">
                  <label className="label-avora mb-1 block text-[11px]">Cuéntanos tu mayor reto operativo</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    placeholder="Describe tu situación actual..."
                  />
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-8 btn-primary w-full justify-center shimmer disabled:opacity-70"
              >
                {submitting ? 'Enviando...' : `Solicitar ${formData.membresia || 'AVORA Insight'}`}
              </button>

              {/* Disclaimer */}
              <p className="mt-4 text-center font-body text-xs text-avora-text-muted">
                Solicitar diagnóstico no implica compromiso de contratación ni promesa de financiamiento.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
