class UnprocessibleRequest extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
      this.status = 422;
    }
}

module.exports = UnprocessibleRequest;