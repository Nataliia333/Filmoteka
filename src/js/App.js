import firebase from 'firebase';

export default class App {
  constructor() {
    this.state = { email: '', password: '', hasAccount: false };
  }

  handleChange = ({ value, id }) => {
    console.log({ [id]: value });
    this.state[id] = value;
  };

  createAccount = () => {
    const { email, password } = this.state;
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  signInAccount = () => {
    const { email, password } = this.state;
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
}
