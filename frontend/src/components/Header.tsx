interface HeaderProps {
  onAddRental: () => void
  onOpenSettings: () => void
}

export function Header({ onAddRental, onOpenSettings }: HeaderProps) {
  return (
    <header className="app-header">
      <a className="brand" href="/">
        <span className="brand-mark" aria-hidden="true">
          🏠
        </span>
        <span className="brand-name">RentalIQ</span>
      </a>

      <nav className="app-header-actions">
        <button type="button" className="btn btn-primary" onClick={onAddRental}>
          <span aria-hidden="true">+</span> Add Rental
        </button>
        <button type="button" className="btn btn-ghost" onClick={onOpenSettings}>
          Settings
          <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.25" />
            <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23L5.46 5.46" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
