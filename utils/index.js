exports.getArticlesData = (usersData, articlesData) => {
  return articlesData.map(article => {
    return {
      ...article,
      belongs_to: article.topic,
      created_by: usersData
        .map(user => {
          if (user.username === article.created_by) return user._id;
        })
        .filter(itm => itm !== undefined),
      vote: null
    };
  });
};

exports.getCommentsData = (DbArticles, DBusers, commentsData) => {
  return commentsData.map(comment => {
    return {
      ...comment,
      belongs_to: DbArticles.map(article => {
        if (article.title === comment.belongs_to) return article._id;
      }).filter(itm => itm !== undefined),
      created_by: DBusers.map(user => {
        if (user.username === comment.created_by) return user._id;
      }).filter(itm => itm !== undefined)
    };
  });
};
