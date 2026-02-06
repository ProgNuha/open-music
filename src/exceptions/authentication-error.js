import ClientError from './client-error.js';
 
class AuthenticationError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
 
export default AuthenticationError;