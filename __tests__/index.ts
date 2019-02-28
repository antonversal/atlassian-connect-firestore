import 'jest-extended';

import * as firebase from '@firebase/testing';
import { firestore } from 'firebase-admin';
import { FirestoreAdapter } from '../src/FirestoreAdapter';

let db: firestore.Firestore;
let adapter: FirestoreAdapter;
beforeEach(() => {
  db = firebase
    .initializeTestApp({
      databaseName: 'nerdoc_test',
      projectId: `my-test-project-${new Date().getTime()}`,
      auth: { uid: 'alice', email: 'alice@example.com' },
    })
    .firestore() as any;
  adapter = new FirestoreAdapter(db as any);
});

afterAll(() => Promise.all(firebase.apps().map(app => app.delete())));

describe('FirestoreAdapter', () => {
  describe('#set', () => {
    it('saves clientInfo in db', async () => {
      await adapter.set('clientInfo', { foo: 'bar' }, '1234567890-0987654321');
      const record = await db
        .collection('clientInfo')
        .doc('1234567890-0987654321')
        .get();
      expect(record.data()).toEqual({ foo: 'bar' });
    });
  });

  describe('#get', () => {
    it('returns null when no clientInfo', async () => {
      const clientInfo = await adapter.get(
        'clientInfo',
        '1234567890-0987654321',
      );
      expect(clientInfo).toBeNull();
    });

    it('returns clientInfo', async () => {
      await db
        .collection('clientInfo')
        .doc('1234567890-0987654321')
        .set({ foo: 'bar' });
      const clientInfo = await adapter.get(
        'clientInfo',
        '1234567890-0987654321',
      );
      expect(clientInfo).toEqual({ foo: 'bar' });
    });
  });

  describe('#del', () => {
    it('returns clientInfo', async () => {
      await db
        .collection('clientInfo')
        .doc('1234567890-0987654321')
        .set({ foo: 'bar' });
      await adapter.del('clientInfo', '1234567890-0987654321');
      const record = await db
        .collection('clientInfo')
        .doc('1234567890-0987654321')
        .get();
      expect(record.exists).toBe(false);
    });
  });

  describe('#getAllClientInfos', () => {
    it('returns clientInfos', async () => {
      await db
        .collection('clientInfo')
        .doc('1234567890-0987654321')
        .set({ foo: 'bar' });
      await db
        .collection('clientInfo')
        .doc('qwerty-ytrewq')
        .set({ bar: 'foo' });
      const clientInfos = await adapter.getAllClientInfos();

      expect(clientInfos).toIncludeAllMembers([{ foo: 'bar' }, { bar: 'foo' }]);
    });
  });
});
