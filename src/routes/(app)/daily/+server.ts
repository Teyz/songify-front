import { guessQueries } from '$lib/queries/guess';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
    console.log(request.url);
    
    if (request.url === "/create")  {
        console.log("coucou");
    }   

    const data = await request.json();
    try {        
        const isCorrect = await guessQueries.checkGuess(data.guess);
        
        return json({ isCorrect }); // Inclure isCorrect dans la réponse JSON
    } catch (error) {
        return new Response('Error', { status: 400 });
    }
};