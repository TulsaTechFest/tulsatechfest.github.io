const fetch = require('node-fetch');
const features = require('./features');

const fetchPokemon = () => {
    if (features.pokemon !== '1') return;
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    return Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        return pokemon;
    });
};

module.exports = async function() {
    return await fetchPokemon();
}