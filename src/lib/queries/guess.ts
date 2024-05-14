import type { Guess } from "$lib/types/guess";

export const guessQueries = {
    checkGuess: async (guess: Guess) => {
        return await fetch(`${import.meta.env.VITE_BASE_URL}/private/v1/guess/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guess)
        }).then(res => res.json())
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    },
    getGuessesByUserIDForGame: async (userID: string, gameID: string) => {
        return await fetch(`${import.meta.env.VITE_BASE_URL}/private/v1/guess/${userID}/${gameID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    }
};