const express = require('express');

const app = express();

require('./routes/system.js')(app);
require('./routes/paladins.js')(app);

app.listen(5000, function () {
    console.log(`[PaladinsAssistant Server] Server is now ready!`)
})