const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "KeyToken"
const COLLECTION_NAME = "KeyTokens"
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array, default: [],
        unique: true,
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);