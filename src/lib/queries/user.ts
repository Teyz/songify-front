export const userQueries = {
    createUser: async () => {
        return await fetch('http:/localhost:3003/private/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .catch((err) => {
            console.error(err);
            throw err;
        });
    },
    getUserByID: async (id: string) => {
        return await fetch(`http:/localhost:3003/private/v1/users/${id}`, {
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