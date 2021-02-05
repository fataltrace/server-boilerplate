import User from './model.js'

export const fetchAll = () => {
  return User.find()
    .then(users => users.map(user => user.toObject()))
    .catch(error => Promise.reject(error))
}

/**
 * 
 * @param {Object} query
 * @param {Object} query.filters
 * @returns {Promise}
 */
export const fetchOne = (query) => {
  return Service.findOne(query)
    .then(user => user ? user.toObject() : null)
    .catch(error => Promise.reject(error))
}

export const createOne = () => {
  return Promise.resolve()
}

export const updateOne = () => {
  return Promise.resolve()
}

export const removeOne = () => {
  return Promise.resolve()
}

export const login = () => {
  return Promise.resolve()
}

export const logout = () => {
  return Promise.resolve()
}


// const isEmail = require('isemail');

// const server = new ApolloServer({
//   context: async ({ req }) => {
//     // simple auth check on every request
//     const auth = req.headers && req.headers.authorization || '';
//     const email = Buffer.from(auth, 'base64').toString('ascii');
//     if (!isEmail.validate(email)) return { user: null };
//     // find a user by their email
//     const users = await store.users.findOrCreate({ where: { email } });
//     const user = users && users[0] || null;
//     return { user: { ...user.dataValues } };
//   },
//   // Additional constructor options
// });




// Mutation: {
//   login: async (_, { email }, { dataSources }) => {
//     const user = await dataSources.userAPI.findOrCreateUser({ email });
//     if (user) return Buffer.from(email).toString('base64');
//   },

//   createUser: (user) => {
//     return User.insertOne(user)
//   },

//   updateUser: (user) => {
//     const { id } = user

//     if (!id) {
//       return null
//     }

//     return User.findOneAndUpdate(user)
//   },

//   deleteUser: (id) => {
//     if (!id) {
//       return null
//     }

//     return User.findOneAndDelete({ id })
//   }
// }
