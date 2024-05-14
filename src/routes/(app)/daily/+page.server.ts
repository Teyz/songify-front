
import { gameQueries } from "$lib/queries/game";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {	
	const game = await gameQueries.getCurrentGame();
	 
	return {
		game: game,
	}
};