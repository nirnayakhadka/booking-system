interface CustomerFields {
  name: string
  email: string
  phone: string
  address: string
}

interface CustomerDetailsFormProps {
  customer: CustomerFields
  fieldErrors: Record<string, string>
  onChange: (field: keyof CustomerFields, value: string) => void
}

const FIELDS: { key: keyof CustomerFields; label: string; type: string }[] = [
  { key: 'name', label: 'Full name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel' },
  { key: 'address', label: 'Address', type: 'text' },
]

/**
 * Uses floating/inline labels instead of placeholder-only inputs — matches
 * how most modern booking flows (Calendly, OpenTable, etc.) present forms,
 * and keeps the field name visible even once the user starts typing.
 */
export function CustomerDetailsForm({ customer, fieldErrors, onChange }: CustomerDetailsFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map(({ key, label, type }) => {
        const error = fieldErrors[key]
        const isFullWidth = key === 'address'
        return (
          <div key={key} className={isFullWidth ? 'sm:col-span-2' : ''}>
            <label className="mb-1.5 block text-xs font-medium text-secondary" htmlFor={key}>
              {label}
            </label>
            <input
              id={key}
              type={type}
              value={customer[key]}
              onChange={(e) => onChange(key, e.target.value)}
              aria-invalid={Boolean(error)}
              className={`w-full rounded-lg border bg-[var(--color-surface-raised)] px-3 py-2.5 text-sm text-primary transition focus:outline-none focus:ring-2 focus:ring-marketplace ${
                error ? 'border-danger' : 'border-[var(--color-border)] focus:border-marketplace'
              }`}
            />
            {error && (
              <p className="mt-1 text-xs text-danger" role="alert">
                {error}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}