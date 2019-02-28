import { firestore } from 'firebase-admin';
import { FirestoreAdapter } from './FirestoreAdapter';

export const factory = (db: firestore.Firestore) => (...args: any[]) => {
  const [logger] = args;

  if (args.length === 0) {
    return FirestoreAdapter;
  }
  return new FirestoreAdapter(db, logger);
};

export default factory;
export { FirestoreAdapter } from './FirestoreAdapter';
