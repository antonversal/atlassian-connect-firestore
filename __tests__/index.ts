import * as firebase from '@firebase/testing';
import { FirebaseAdapter } from '../src/FirebaseAdapter';

const db = firebase
  .initializeTestApp({
    databaseName: 'nerdoc_test',
    projectId: 'my-test-project',
    auth: { uid: 'alice', email: 'alice@example.com' },
  })
  .firestore();

afterAll(() => Promise.all(firebase.apps().map(app => app.delete())));

describe('EventRequestRepository', () => {
  describe('save', () => {
    it('saves EventRequest to db', async () => {
      const adapter = new FirebaseAdapter(db as any);
      const result = await adapter.create();
      console.log(result);
    });
  });
});
