import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//Web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
	authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIRESTORE_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get reference to the service
export const db = getFirestore(app);
