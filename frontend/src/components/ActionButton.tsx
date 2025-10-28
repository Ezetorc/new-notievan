import { type ReactNode, type MouseEvent } from "react";

export function ActionButton(props: {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
  className?: string
  loading?: boolean
}) {
  const loading = props.loading ?? false

  return (
    <button
      onClick={props.onClick}
      disabled={loading}
      aria-busy={loading}
      className={`clickable bg-brand-orange rounded-sm disabled:opacity-60 disabled:cursor-not-allowed ${props.className}`}

    >
      {loading ? "Cargando..." : props.children}
    </button>
  )
}