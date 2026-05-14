const mongoose = require("mongoose");

const TransferenciaSchema = new mongoose.Schema({

    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },

    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },

    valor: {
        type: Number,
        required: true
    },

    data: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Transferencia", TransferenciaSchema);