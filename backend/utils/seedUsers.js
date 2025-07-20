const User = require('../models/user');

const addTestUser = async () => {
try {
const user = new User({ name: 'Namrata', email: 'namrata123@example.com' });
await user.save();
console.log('Sample user inserted');
} catch (error) {
console.error('Error adding user:', error.message);
}
};

module.exports = addTestUser;