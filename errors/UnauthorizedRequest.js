class UnauthorizedRequest extends Error {
    constructor(message) {
      super(message);
      this.name = "Authorization Error";
      this.status = 403;
    }
}

module.exports = UnauthorizedRequest; 