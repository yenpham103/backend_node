const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString(); // publicKey được sinh ra bởi thuật toán bất đối xứng Buffer nó chưa được hash nên phải chuyển thành string để lưu vào database nếu không sẽ bị lỗi 

            const tokens = await keyTokenModel.create({ user: userId, publicKey: publicKeyString });
            return tokens ? tokens.publicKey : null

        } catch (error) {
            return error
        }

    }

}
module.exports = KeyTokenService