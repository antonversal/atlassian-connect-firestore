# Firestore Adapter for Atlassian Connect Express

## Usage

To use the storage adapter, add the key "adapter" to the `config.json`:

```json
"store": {
    "adapter": "firestore"
}
```

Then make sure hat you register the adapter factory with the following code:

```ts
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { factory } = require('atlassian-connect-firestore')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

ac.store.register('firestore', factory(db))

```

## License

[MIT](LICENSE)
