export const gameQueries = {
    getCurrentGame: async () => {
        return await fetch('https://api.songify.xyz/private/v1/games/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .catch((err) => {
            console.error(err);
            throw err;
        });
    },
};