import * as firebase from '@firebase/testing';
import { FirebaseAdapter } from './FirebaseAdapter';

export default (...args: any[]) => {
  const [logger] = args;
  const db = firebase
    .initializeTestApp({
      databaseName: 'nerdoc_test',
      projectId: 'my-test-project',
      auth: { uid: 'alice', email: 'alice@example.com' },
    })
    .firestore();
  if (args.length === 0) {
    return FirebaseAdapter;
  }
  return new FirebaseAdapter(db as any, logger);
};
