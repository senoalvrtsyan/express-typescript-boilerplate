import { StatusCodes } from 'http-status-codes';

import { User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { userService } from '@/api/user/userService';

jest.mock('@/api/user/userRepository');

describe('userService', () => {
  const mockUsers: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
  ];

  describe('findAll', () => {
    it('return all users', async () => {
      // Arrange
      userRepository.findAllAsync = jest.fn().mockReturnValue(Promise.resolve(mockUsers));

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Users found');
      expect(result.responseData).toEqual(mockUsers);
    });

    it('returns a not found error for no users found', async () => {
      // Arrange
      userRepository.findAllAsync = jest.fn().mockReturnValue(Promise.resolve(null));

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('No Users found');
      expect(result.responseData).toBeNull();
    });

    it('handles errors for findAllAsync', async () => {
      // Arrange
      userRepository.findAllAsync = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('Error finding all users');
      expect(result.responseData).toBeNull();
    });
  });

  describe('findById', () => {
    it('returns a user for a valid ID', async () => {
      // Arrange
      const testId = 1;
      const mockUser = mockUsers.find((user) => user.id === testId);
      userRepository.findByIdAsync = jest.fn().mockReturnValue(Promise.resolve(mockUser));

      // Act
      const result = await userService.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('User found');
      expect(result.responseData).toEqual(mockUser);
    });

    it('handles errors for findByIdAsync', async () => {
      // Arrange
      const testId = 1;
      userRepository.findByIdAsync = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act
      const result = await userService.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error finding user with id ${testId}`);
      expect(result.responseData).toBeNull();
    });

    it('returns a not found error for non-existent ID', async () => {
      // Arrange
      const testId = 1;
      userRepository.findByIdAsync = jest.fn().mockReturnValue(Promise.resolve(null));

      // Act
      const result = await userService.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('User not found');
      expect(result.responseData).toBeNull();
    });
  });

  describe('addUser', () => {
    it('Add user with valid payload', async () => {
      const newUser: User = {
        id: 1,
        name: 'Bob',
        age: 42,
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userRepository.addUserAsync = jest.fn().mockReturnValue(Promise.resolve(newUser));

      // Act
      const result = await userService.addUser(newUser);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.CREATED);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('User added successfully');
      expect(result.responseData).toEqual(newUser);
    });
  });

  describe('deleteById', () => {
    it('deletes user with valid ID', async () => {
      // Arrange
      const testId = 1;
      const mockUser = mockUsers.find((user) => user.id === testId);
      userRepository.deleteByIdAsync = jest.fn().mockReturnValue(Promise.resolve(mockUser));

      // Act
      const result = await userService.deleteById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('User deleted successfully');
      expect(result.responseData).toEqual(mockUser);
    });

    it('handles errors for deleteByIdAsync', async () => {
      // Arrange
      const testId = 1;
      userRepository.deleteByIdAsync = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act
      const result = await userService.deleteById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error deleting user with id ${testId}`);
      expect(result.responseData).toBeNull();
    });

    it('returns a not found error for non-existent ID', async () => {
      // Arrange
      const testId = 1;
      userRepository.deleteByIdAsync = jest.fn().mockReturnValue(Promise.resolve(null));

      // Act
      const result = await userService.deleteById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('User not found');
      expect(result.responseData).toBeNull();
    });
  });
});
