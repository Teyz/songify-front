export const hintQueries = {
    getHintByUserIDForGame: async (userID: string, gameID: string) => {
        return await fetch(`${import.meta.env.VITE_BASE_URL}/private/v1/hints/${userID}/${gameID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .catch((err) => {
            console.error(err);
            throw err;
        });
    }
};