export const gameQueries = {
    getCurrentGame: async () => {
        return await fetch(`${import.meta.env.VITE_BASE_URL}/private/v1/games/`, {
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