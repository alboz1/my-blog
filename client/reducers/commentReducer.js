export default (comments, action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return action.payload
        case 'ADD_NEW_COMMENT':
            return [ action.payload, ...comments ];
        case 'EDIT_COMMENT':
            return comments.map(comment => {
                if (comment._id === action.id) {
                    comment.body = action.newComment;
                }
                return comment;
            });
        case 'DELETE_COMMENT':
            return comments.filter(comment => comment._id !== action.id);
        default:
            return comments
    }
}