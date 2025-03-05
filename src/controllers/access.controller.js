class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(req.body, "reqqqq");
            return res.status(200).json({
                code: 200001,
                metadata: {userId: 1}
            })
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = new AccessController();