exports.sortPosts = (posts) => 
  posts.sort((left, right) => {
    const leftField = left.data.modified || left.data.published;
    const rightField = right.data.modified || right.data.published;
    return rightField - leftField;
});