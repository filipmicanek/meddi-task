import { MMKV } from 'react-native-mmkv';
import z from 'zod';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
export const PHONE_NUMBER_REGEX = /^\+?\d{6,14}$/;

export const userRegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Zadejte email' })
    .email({ message: 'Neplaný email' }),
  password: z
    .string()
    .min(1, { message: 'Zadejte heslo' })
    .regex(PASSWORD_REGEX, {
      message: 'Heslo musí obsahovat číslo a malé a velké písmeno',
    }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Zadejte telefonní číslo' })
    .regex(PHONE_NUMBER_REGEX, { message: 'Zadejte platné telefonní číslo' }),
});

export const userLoginSchema = userRegisterSchema.omit({ phoneNumber: true });
export const userUpdateSchema = userRegisterSchema.omit({ password: true });

export type RegisterUserForm = z.infer<typeof userRegisterSchema>;
export type LoginUserForm = z.infer<typeof userLoginSchema>;
export type UpdateUserForm = z.infer<typeof userUpdateSchema>;

export type User = RegisterUserForm & {
  cities: {
    name: string;
    address: {
      postCode: string;
    };
  }[];
};

export type Credentials = {
  password: string;
};

const STORAGE_KEYS = {
  users: 'users',
  lastUser: 'lastUser',
  credentials: 'credentials',
};

export const storage = new MMKV({
  id: `meddi-task`,
  encryptionKey: 'secret-encryption-key',
  readOnly: false,
});

export const registerUser = (data: RegisterUserForm) => {
  const storageData = storage.getString(STORAGE_KEYS.users);

  let users: Record<string, User> = {};

  if (storageData) {
    users = JSON.parse(storageData);
  }

  if (users[data.email]) {
    return null;
  }

  const userData = { ...data, cities: [] };

  users[data.email] = userData;
  setCredentials(data);
  setLastLoggedIn(data.email);
  storage.set(STORAGE_KEYS.users, JSON.stringify(users));

  return userData;
};

export const updateUser = (
  data: UpdateUserForm | Pick<User, 'cities' | 'email'>,
): User => {
  const storageData = storage.getString(STORAGE_KEYS.users);

  let users: Record<string, User> = {};

  if (storageData) {
    users = JSON.parse(storageData);
  }
  const userData = users[data.email];
  const newUser = { ...userData, ...data };
  users[data.email] = newUser;
  storage.set(STORAGE_KEYS.users, JSON.stringify(users));

  return newUser;
};

export const getLastLoggedIn = () => {
  return storage.getString(STORAGE_KEYS.lastUser);
};

export const setLastLoggedIn = (id: string) => {
  return storage.set(STORAGE_KEYS.lastUser, id);
};

export const invalidateLastLoggedIn = () => {
  storage.delete(STORAGE_KEYS.lastUser);
};

export const getUser = (email: string): User | null => {
  const storageData = storage.getString(STORAGE_KEYS.users);
  if (!storageData) return null;
  const users = JSON.parse(storageData) as Record<string, User>;
  return users[email] ?? null;
};

export const setCredentials = (data: RegisterUserForm) => {
  const storageData = storage.getString(STORAGE_KEYS.credentials);

  let credentials: Record<string, Credentials> = {};

  if (storageData) {
    credentials = JSON.parse(storageData);
  }

  credentials[data.email] = { password: data.password };
  storage.set(STORAGE_KEYS.credentials, JSON.stringify(credentials));
};

export const validateCredentials = (data: LoginUserForm): boolean => {
  const storageData = storage.getString(STORAGE_KEYS.credentials);
  if (!storageData) return false;
  const credentials = JSON.parse(storageData) as Record<string, Credentials>;

  if (!credentials[data.email]) {
    return false;
  }

  return credentials[data.email].password === data.password;
};
