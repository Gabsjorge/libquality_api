const axios = require("axios");

test('Should create an user', async function() {
    const response = await axios.post('http://localhost:3333/users', {
        "name": "Gabriela",
        "email": "gabriela@gmail.com",
        "password": "banana"
    });

    
});