module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number
        },

        { timestamps: true }
    );

    var schemaOne = mongoose.Schema(
        {
            userId: String,
            address_1: String,
            address_2: String,
        }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Table = mongoose.model("user", schema);
    return Table;
};
