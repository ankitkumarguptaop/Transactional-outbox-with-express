class BadRequest extends Error {
  constructor(message:string) {
    super(message);
  }
}

class NotFound extends Error {
  constructor(message:string) {
    super(message);
  }
}

class UnAuthorized extends Error {
  constructor(message:string) {
    super(message);
  }
}

class NoContent extends Error {
  constructor(message:string) {
    super(message);
    this.name = "NoContent";
  }
}

class ForBidden extends Error {
  constructor(message:string) {
    super(message);
    this.name = "ForBidden";
  }
}

export  {
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
};

