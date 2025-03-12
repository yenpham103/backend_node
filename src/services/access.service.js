const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
    SHOP: "SHOP",
    WRITE: "WRITE",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            //check email exists??
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: "xxxx",
                    message: "Email already exists",
                }
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] });
            if (newShop) {
                // created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    }
                });

                console.log({privateKey, publicKey}); // save collection KeyStore

                const publicKeyString = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey });

                if (!publicKeyString) {
                    return {
                        code: "xxxx",
                        message: "Create key token fail",
                    }
                }

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyString, privateKey);

                const publicKeyObject = crypto.createPublicKey( publicKeyString );


                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }

            }
            
            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error"
            }

        }
    }

}

module.exports = AccessService;