import { guessQueries } from '$lib/queries/guess';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
    const data = await request.json();
    try {        
        const res = await guessQueries.checkGuess(data.guess);
        
        return json({ data: res });
    } catch (error) {
        return new Response('Error', { status: 400 });
    }
};