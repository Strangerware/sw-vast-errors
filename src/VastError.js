import errorDescriptions from './errorDescriptions';

class VastError {
  constructor({ errorCode = 900, errorDescription = errorDescriptions[errorCode], data } = {}) {
    this.name = `Vast Error ${errorCode}`;
    this.message = errorDescription;
    this.data = data;
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.stack = (new Error()).stack;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }

  toJSON() {
    return {
      data: this.data,
      errorCode: this.errorCode,
      errorDescription: this.errorDescription,
      stack: this.stack,
    };
  }
}

export default VastError;
