import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdJCCCLpFqnGL9Ls5yBA4I2E7kNXXWSNs',
  authDomain: 'rental-site-b80a8.firebaseapp.com',
  projectId: 'rental-site-b80a8',
  storageBucket: 'rental-site-b80a8.firebasestorage.app',
  messagingSenderId: '164233970553',
  appId: '1:164233970553:web:ec30666105d5b855ca25a8',
  measurementId: 'G-G355KB9H8G',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
