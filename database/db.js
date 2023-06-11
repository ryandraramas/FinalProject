const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/maid-match-db';

let db;

const connect = async () => {
  try {
    const client = await MongoClient.connect(url);
    db = client.db();
    console.log('Koneksi MongoDB berhasil');
  } catch (error) {
    console.error('Koneksi MongoDB gagal:', error);
  }
};

const getUsers = async () => {
  const collection = db.collection('users');
  const users = await collection.find().toArray();
  return users;
};

const createUser = async (user) => {
  const collection = db.collection('users');
  const result = await collection.insertOne(user);
  return result.insertedId;
};

module.exports = {
  connect,
  getUsers,
  createUser
};
