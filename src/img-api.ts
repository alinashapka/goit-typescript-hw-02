import axios from 'axios';
import { Image } from './components/types/image';

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = 'Mt32nzsEwLK7ky77hF-ioFmqbRzJfHYr_hTdfgxaMY8';

interface SearchResponse {
    results: Image[];
    total_pages: number;
}

export const fetchImages = async (query: string, currentPage: number) => {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/search/photos`, {
        headers: {
            'Authorization': `Client-ID ${API_KEY}`,
        },
        params: {
            query: query,
            page: currentPage,
            per_page: 12,
        }
    });
    return {
        images: response.data.results,
        totalPages: response.data.total_pages,
    }
}