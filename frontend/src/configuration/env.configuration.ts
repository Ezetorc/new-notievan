type Env = {
  baseUrl: string;
};

export const env: Env = {
  baseUrl: import.meta.env.PUBLIC_API_URL || "http://localhost:3000"
};
