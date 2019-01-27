const app = require("./app")
const logger = require("./utils/logger")
const port = process.env.PORT || 9090

app.listen(port, () => logger.info(`listening on port ${port}`))