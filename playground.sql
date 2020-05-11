\c nc_news_test

-- UPDATE comments
-- SET "votes" = "votes" + 1
-- WHERE comment_id = 1;

-- SELECT * FROM comments
-- WHERE comment_id = 1;

-- SELECT articles.*, COUNT(comments.article_id) AS comment_count
-- FROM articles
-- JOIN comments
-- ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;

SELECT * FROM articles ORDER BY topic;
