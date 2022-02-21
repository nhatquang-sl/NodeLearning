class BadRequestError extends Error {
  constructor(m: string) {
    super(m);
  }
}

export default BadRequestError;
