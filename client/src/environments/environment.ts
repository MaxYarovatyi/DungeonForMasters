type Env = {
  apiUrl: string;
  production: boolean;
};

export const environment: Env = {
  production: false,
  apiUrl: 'https://localhost:7071/',
};
