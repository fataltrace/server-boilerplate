/** mongo --nodb --quiet vars.js init.js */ 

const db = connect(url);

const users = [
  { _id: new ObjectId(), name: "user1", email: 'u1@mail.fs', password: '1' },
  { _id: new ObjectId(), name: "user2", email: 'u2@mail.fs', password: '1' },
  { _id: new ObjectId(), name: "user3", email: 'u3@mail.fs', password: '1' }
];

const events = [
  { _id: new ObjectId(), users: [users[0]._id] },
  { _id: new ObjectId(), users: [users[1]._id] },
  { _id: new ObjectId(), users: [users[2]._id] }
];

try {
   db.users.insertMany(users);
   db.events.insertMany(events);
} catch (error) {
   print (error);
}