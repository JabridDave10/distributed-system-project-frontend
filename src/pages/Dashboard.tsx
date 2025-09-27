import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  User,
  Calendar,
  Clock,
  TrendingUp,
  Activity,
  Users,
  Stethoscope
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

type UserType = 'patient' | 'doctor' | 'admin';

interface DashboardProps {
  userType?: UserType;
}

const Dashboard: React.FC<DashboardProps> = ({ userType = 'patient' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getDashboardStats = () => {
    switch (userType) {
      case 'patient':
        return [
          { label: 'Próximas Citas', value: '3', icon: Calendar, color: 'text-blue-600' },
          { label: 'Citas Este Mes', value: '8', icon: Clock, color: 'text-green-600' },
          { label: 'Doctores', value: '5', icon: Stethoscope, color: 'text-purple-600' },
          { label: 'Historial', value: '24', icon: Activity, color: 'text-orange-600' },
        ];
      case 'doctor':
        return [
          { label: 'Pacientes Hoy', value: '12', icon: Users, color: 'text-blue-600' },
          { label: 'Citas Programadas', value: '28', icon: Calendar, color: 'text-green-600' },
          { label: 'Consultas Mes', value: '156', icon: Activity, color: 'text-purple-600' },
          { label: 'Rating', value: '4.8', icon: TrendingUp, color: 'text-orange-600' },
        ];
      case 'admin':
        return [
          { label: 'Total Usuarios', value: '1,234', icon: Users, color: 'text-blue-600' },
          { label: 'Citas Hoy', value: '89', icon: Calendar, color: 'text-green-600' },
          { label: 'Doctores Activos', value: '67', icon: Stethoscope, color: 'text-purple-600' },
          { label: 'Ingresos Mes', value: '$12,450', icon: TrendingUp, color: 'text-orange-600' },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (userType) {
      case 'patient':
        return [
          { title: 'Cita confirmada con Dr. García', time: 'Hace 2 horas', type: 'success' },
          { title: 'Recordatorio: Cita mañana 10:00 AM', time: 'Hace 4 horas', type: 'info' },
          { title: 'Resultados de laboratorio disponibles', time: 'Hace 1 día', type: 'info' },
          { title: 'Cita completada con Dr. Martínez', time: 'Hace 2 días', type: 'success' },
        ];
      case 'doctor':
        return [
          { title: 'Nueva cita programada - Ana López', time: 'Hace 30 min', type: 'info' },
          { title: 'Consulta completada - Carlos Ruiz', time: 'Hace 1 hora', type: 'success' },
          { title: 'Recordatorio: Revisión de casos 3:00 PM', time: 'Hace 2 horas', type: 'warning' },
          { title: 'Prescripción enviada - María González', time: 'Hace 3 horas', type: 'success' },
        ];
      case 'admin':
        return [
          { title: 'Nuevo doctor registrado - Dr. Pérez', time: 'Hace 1 hora', type: 'success' },
          { title: 'Sistema de respaldos completado', time: 'Hace 2 horas', type: 'success' },
          { title: 'Revisión mensual de usuarios', time: 'Hace 4 horas', type: 'info' },
          { title: 'Actualización de seguridad aplicada', time: 'Hace 6 horas', type: 'success' },
        ];
      default:
        return [];
    }
  };

  const stats = getDashboardStats();
  const recentActivity = getRecentActivity();

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) greeting = 'Buenos días';
    else if (hour < 18) greeting = 'Buenas tardes';
    else greeting = 'Buenas noches';

    const roleNames = {
      patient: 'Paciente',
      doctor: 'Doctor',
      admin: 'Administrador'
    };

    return `${greeting}, ${roleNames[userType]}`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userType={userType} isCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-6 h-6" />
                <span className="hidden md:block text-sm font-medium">Perfil</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{getGreeting()}</h2>
            <p className="text-gray-600">Aquí tienes un resumen de tu actividad reciente.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                {userType === 'patient' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm font-medium">Agendar Cita</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Ver Historial</span>
                      </div>
                    </button>
                  </>
                )}

                {userType === 'doctor' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Ver Pacientes</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm font-medium">Gestionar Horarios</span>
                      </div>
                    </button>
                  </>
                )}

                {userType === 'admin' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Gestionar Usuarios</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">Ver Reportes</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;