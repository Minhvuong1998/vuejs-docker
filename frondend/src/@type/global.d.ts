
export {}

declare global {
  interface Window {
    userInfo: {
      id: string;
      name: string;
      email: string;
      token: string;
    } | null
  }
}