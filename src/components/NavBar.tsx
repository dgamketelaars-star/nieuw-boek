import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Vandaag
      </NavLink>
      <NavLink
        to="/bladzijden"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Bladzijden
      </NavLink>
      <NavLink
        to="/kaartendoos"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Kaartendoos
      </NavLink>
      <NavLink
        to="/instellingen"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Instellingen
      </NavLink>
    </nav>
  )
}
