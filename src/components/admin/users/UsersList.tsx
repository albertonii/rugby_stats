import { useState } from 'react';
import { User } from '../../../types';
import UserForm from './UserForm';
import DeleteConfirmation from '../common/DeleteConfirmation';
import { clubs } from '../../../data/clubs';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: 'Admin Principal', 
      email: 'admin@rugby.com', 
      role: 'Admin', 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Delegado LPRC', 
      email: 'delegado@lprc.com', 
      role: 'Delegado', 
      clubId: 1,
      teamId: 1,
      status: 'active' 
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getClubName = (clubId?: number) => {
    if (!clubId) return '-';
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : '-';
  };

  const handleCreateUser = (userData: Partial<User>) => {
    const newUser = {
      ...userData,
      id: users.length + 1,
      status: 'active',
    } as User;
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === selectedUser?.id ? { ...user, ...userData } : user
    ));
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rol</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Club</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{getClubName(user.clubId)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsFormOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleEditUser : handleCreateUser}
        initialData={selectedUser || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que deseas eliminar al usuario ${selectedUser?.name}?`}
      />
    </div>
  );
};

export default UsersList;