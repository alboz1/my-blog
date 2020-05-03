export default (posts, action) => {
    switch (action.type) {
      case 'GET_BLOGS':
        return [...posts, ...action.payload];
      case 'DELETE_POST':
        return posts.filter(post => post._id !== action.id);
      case 'PUBLISH_POST':
        return posts.map(post => {
          if (action.id === post._id) {
            post.published = true;
          }
          return post;
        });
      case 'UNPUBLISH_POST':
        return posts.map(post => {
          if (action.id === post._id) {
            post.published = false;
          }
          return post;
        });
      case 'SORT_BY_PUBLISHED':
        if (!action.reverse) {
          //sort by published
          return [...posts.sort((a, b) => b.published - a.published)]
        } else {
          //sort by unpublished
          return [...posts.sort((a, b) => a.published - b.published)]
        }
      case 'SORT_BY_DATE':
        if (!action.reverse) {
          //sort by oldest posts
          return [...posts.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt))]
        } else {
          //sort by newest posts
          return [...posts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))]
        }
      default:
        return posts
    }
}