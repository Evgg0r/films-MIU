import type {CreditsResponse, MovieDetailsResponse} from "../types/types.ts";

export function getDirector(credits: CreditsResponse): string {
    return credits.crew.filter(person => person.job === 'Director')?.map(person => person.name).join(', ') || '—';
}

export function getWriters(credits: CreditsResponse): string {
    return credits.crew.filter(person => person.job === 'Screenplay' || person.job === 'Writer').map(person => person.name).join(', ');
}

export function formatBudget(budget: number): string {
    if (!budget) return '—';

    const millions = budget / 1000000;
    const rounded = millions.toFixed(0);
    return `${rounded} млн $`;
}

export function convertServerDetailsToMovie(details:MovieDetailsResponse,  credits:CreditsResponse) {
    return {
        title: details.title,
        year: details.release_date.slice(0, 4,),
        poster: details.poster_path,
        rating: details.vote_average.toFixed(1),
        cast: credits.cast,
        details: [
            {label: 'Страна', value: details.production_countries?.[0]?.name || '—'},
            {label: 'Жанр', value: details.genres?.map(g => g.name).join(', ') || '—'},
            {label: 'Режиссёр', value: getDirector(credits)},
            {label: 'Сценарий', value: getWriters(credits)},
            {label: 'Бюджет', value: formatBudget(details.budget)},
            {label: 'Продолжительность', value: `${details.runtime} мин`},
        ],
    }
}