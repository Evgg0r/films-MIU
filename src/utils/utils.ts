import type {CreditsResponse} from "../types/types.ts";

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