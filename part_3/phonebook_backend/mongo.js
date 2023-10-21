const mongoose = require('mongoose');
require('dotenv').config();

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const phoneNumber = process.argv[4];

if (!password) {
    console.log('Password is required.');
    process.exit(1);
}

const url = `mongodb+srv://sala:${password}@cluster0.o4wnjoa.mongodb.net/?retryWrites=true&w=majority`;
console.log(url);

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (personName && phoneNumber && process.argv.length === 5) {
    connectToDatabase().then(async () => {
        const person = new Phonebook({
            number: phoneNumber,
            name: personName,
        });

        await person.save();
        console.log(`added ${personName} number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
    });
} else if (process.argv.length === 3) {
    connectToDatabase().then(async () => {
        const persons = await Phonebook.find();

        if (persons.length > 0) {
            console.log('phonebook:');
            persons.forEach(({ name, number }) => console.log(`${name} ${number}`));
        }

        mongoose.connection.close();
    });
} else {
    console.log('Invalid command. Please provide valid arguments.');
    process.exit(1);
}
