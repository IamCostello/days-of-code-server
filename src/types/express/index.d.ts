namespace Express {
  interface Request {
    user: {
      user_id: string;
      email: string | undefined;
      name: string;
    };
  }
}
