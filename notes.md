

## Implements all endpoints
- [ ?] `POST /api/topics/:topic_slug/articles`
   - Hardcoded values in your tests for this. This will break your test db
- [ ? ] `POST /api/articles/:article_id/comments` - no test for this, and there is zero error handling - you are populating the entire thing with req.body, which could be any old rubbish. You are not using the params as the article_id, so you would have to send that up in the body too, which could end in multiple sources of truth.
## Testing
- [ ] Tests all endpoints - not all, and most of them not thoroughly
- [ ] Tests 400 and 404 errors
"https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"