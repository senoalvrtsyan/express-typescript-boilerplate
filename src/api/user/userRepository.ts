import { PrismaClient } from '@prisma/client';

import { User } from '@/api/user/userModel';

const prisma = new PrismaClient();

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  findByIdAsync: async (userId: number): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  addUserAsync: async (userData: User): Promise<User> => {
    try {
      return await prisma.user.create({
        data: userData,
      });
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  deleteByIdAsync: async (userId: number): Promise<User | null> => {
    try {
      return await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.error('Error deleting user by ID:', error);
      throw error;
    }
  },
};

// export const users: User[] = [
//   { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
//   { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
// ];

// export const userRepository = {
//   findAllAsync: async (): Promise<User[]> => {
//     return users;
//   },
//
//   findByIdAsync: async (id: number): Promise<User | null> => {
//     return users.find((user) => user.id === id) || null;
//   },
// };
