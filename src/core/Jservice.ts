export interface JwtPayload {
    id: number;
    phoneNumber: number;  // Add this to the interface
    role: string;
  }