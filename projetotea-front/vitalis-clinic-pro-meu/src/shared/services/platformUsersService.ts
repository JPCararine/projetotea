import { resolveMock } from '../api/client';
import { PlatformUser } from '../interfaces';
import { mockStore } from './mockStore';

export const platformUsersService = {
  getAll() {
    return resolveMock([...mockStore.platformUsers]);
  },

  add(userData: Omit<PlatformUser, 'id'>) {
    const newUser: PlatformUser = {
      id: `usr-${mockStore.platformUsers.length + 1}`,
      ...userData,
    };

    mockStore.platformUsers = [...mockStore.platformUsers, newUser];
    return resolveMock(newUser);
  },

  toggleStatus(userId: string) {
    mockStore.platformUsers = mockStore.platformUsers.map((user) => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'Ativo' ? 'Inativo' : 'Ativo' };
      }

      return user;
    });

    return resolveMock([...mockStore.platformUsers]);
  },

  delete(userId: string) {
    mockStore.platformUsers = mockStore.platformUsers.filter((user) => user.id !== userId);
    return resolveMock(userId);
  },
};
