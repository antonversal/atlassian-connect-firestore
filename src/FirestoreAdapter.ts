import { firestore } from 'firebase-admin';

interface Logger {
  info: (...args: any[]) => void;
}

class NullLogger {
  public info(..._: any[]) {
    // null
  }
}

export class FirestoreAdapter {
  constructor(
    public readonly db: firestore.Firestore,
    public readonly logger: Logger = new NullLogger(),
  ) {}

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
    this.logger.info('FirestoreAdapter GET:', key, clientKey, doc.data());
    return doc.exists ? doc.data() : null;
  }

  public set(key: string, value: any, clientKey: string) {
    this.logger.info('FirestoreAdapter SET:', key, clientKey, value);
    return this.db
      .collection(key)
      .doc(clientKey)
      .set(value);
  }

  public del(key: string, clientKey: string) {
    this.logger.info('FirestoreAdapter DEL:', key, clientKey);
    return this.db
      .collection(key)
      .doc(clientKey)
      .delete();
  }
}
