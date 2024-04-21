import { MovieImageSize } from './service/models/movie.model';

export function getImageUrl(id: string, size: MovieImageSize): string {
    return `https://image.tmdb.org/t/p/${size}${id}`;
}
