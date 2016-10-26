import errorDescriptions from './errorDescriptions';

class VastError {
  constructor({ errorCode = 900, errorDescription = errorDescriptions[errorCode], data, error } = {}) {
    this.name = `Vast Error ${errorCode}`;
    this.message = errorDescription;
    this.data = data;
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.stack = (error || new Error()).stack;
    if (error) {
      this.originalError = error;
    }
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
