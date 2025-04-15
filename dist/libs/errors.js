"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.NotFound = exports.UnAuthorized = exports.NoContent = exports.ForBidden = void 0;
class BadRequest extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BadRequest = BadRequest;
class NotFound extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFound = NotFound;
class UnAuthorized extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnAuthorized = UnAuthorized;
class NoContent extends Error {
    constructor(message) {
        super(message);
        this.name = "NoContent";
    }
}
exports.NoContent = NoContent;
class ForBidden extends Error {
    constructor(message) {
        super(message);
        this.name = "ForBidden";
    }
}
exports.ForBidden = ForBidden;
