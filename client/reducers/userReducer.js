export default (user, action) => {
    switch (action.type) {
      case 'GET_USER':
        return {
          ...user,
          isLoggedIn: true,
          username: action.username,
          avatar: action.avatar,
          id: action.id
        }
        case 'LOGOUT':
          return {
            ...user,
            isLoggedIn: false,
            username: '',
            avatar: '',
            id: ''
        }
      default:
        return user
    }
}