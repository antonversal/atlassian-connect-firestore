import { firestore } from 'firebase-admin';
export class FirebaseAdapter {
  constructor(
    public readonly db: firestore.Firestore,
    public readonly logger: any,
  ) {}
  public create() {
    return this.db
      .collection('clientInfos')
      .doc('LA')
      .set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      });
  }
  public isMemoryStore() {
    return false;
  }
  public async getAllClientInfos() {
    const allDocs = await this.db.collection('clientInfo').get();
    return allDocs.docs.map(d => d.data());
  }
  public async get(key: string, clientKey: string) {
    const doc = await this.db
      .collection(key)
      .doc(clientKey)
      .get();
    this.logger.info('FirebaseAdapter get', key, clientKey, doc.data());
    return doc.exists ? doc.data() : null;
  }
  public set(key: string, value: any, clientKey: string) {
    this.logger.info('FirebaseAdapter set', key, clientKey, value);
    return this.db
      .collection(key)
      .doc(clientKey)
      .set(value);
  }
  public del(key: string, clientKey: string) {
    this.logger.info('FirebaseAdapter del', key, clientKey);
    return this.db
      .collection(key)
      .doc(clientKey)
      .delete();
  }
}
