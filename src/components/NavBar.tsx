import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md ${
    isActive ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`

export function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-5xl mx-auto flex items-center gap-2 px-4 py-3">
        <span className="font-semibold text-gray-900 mr-4">Demo Marketplace</span>
        <NavLink to="/" end className={linkClass}>
          Services
        </NavLink>
        <NavLink to="/bookings" className={linkClass}>
          My Bookings
        </NavLink>
      </nav>
    </header>
  )
}
