import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { userQueries } from '$lib/queries/user';

export const POST: RequestHandler = async () => {
    try {        
        const user = await userQueries.createUser();
        
        return json({ user });
    } catch (error) {
        return new Response('Error', { status: 400 });
    }
};