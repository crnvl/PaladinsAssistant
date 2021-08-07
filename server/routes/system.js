const systemRouter = function (app) {
    app.get('/', (req, res) => {
        res.json({
            statusCode: 200,
            documentation: "https://github.com/angelsflyinhell/PaladinsAssistant",
            sponsor: "https://ko-fi.com/azamivisuals"
        })
    })
}

module.exports = systemRouter;