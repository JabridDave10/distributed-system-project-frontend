import React from 'react';
import {
  Home,
  Calendar,
  Users,
  Stethoscope,
  ClipboardList,
  Settings,
  LogOut,
  Plus,
  Bell,
  User
} from 'lucide-react';

interface SidebarProps {
  userType: 'patient' | 'doctor' | 'admin';
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, isCollapsed = false }) => {
  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', href: '/dashboard' },
      { icon: Calendar, label: 'Citas', href: '/appointments' },
      { icon: Bell, label: 'Notificaciones', href: '/notifications' },
    ];

    const patientItems = [
      ...commonItems,
      { icon: Stethoscope, label: 'Mis Doctores', href: '/doctors' },
      { icon: ClipboardList, label: 'Historial Médico', href: '/medical-history' },
      { icon: User, label: 'Mi Perfil', href: '/profile' },
    ];

    const doctorItems = [
      ...commonItems,
      { icon: Users, label: 'Mis Pacientes', href: '/patients' },
      { icon: ClipboardList, label: 'Consultas', href: '/consultations' },
      { icon: Calendar, label: 'Horarios', href: '/schedules' },
      { icon: User, label: 'Mi Perfil', href: '/profile' },
    ];

    const adminItems = [
      ...commonItems,
      { icon: Users, label: 'Usuarios', href: '/users' },
      { icon: Stethoscope, label: 'Doctores', href: '/doctors-admin' },
      { icon: ClipboardList, label: 'Reportes', href: '/reports' },
      { icon: Settings, label: 'Configuración', href: '/settings' },
    ];

    switch (userType) {
      case 'patient':
        return patientItems;
      case 'doctor':
        return doctorItems;
      case 'admin':
        return adminItems;
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`bg-gradient-to-b from-cyan-500 to-teal-600 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-cyan-600" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">MedCitas</h1>
              <p className="text-xs text-white/80 capitalize">{userType}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="space-y-1">
          <a
            href="/settings"
            className="flex items-center px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 font-medium">Configuración</span>}
            {isCollapsed && (
              <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Configuración
              </div>
            )}
          </a>
          <a
            href="/logout"
            className="flex items-center px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 font-medium">Cerrar Sesión</span>}
            {isCollapsed && (
              <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Cerrar Sesión
              </div>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;