export default function authentication({ userId, token }) {
	
  if (userId) {
    return Meteor.call('authentication', userId, token);
  }

  return { isActive: false, authorise: false, message: 'User not found' };
}