import axios from 'axios'

const HttpError = require('./http-error');
const API_KEY = process.env.GOOGLE_API_KEY;


export async function getCoordinatesForAddress(address: string) {
    const api_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeURIComponent(address) }&key=${ API_KEY }`
    const response = await axios.get(api_url)
    const data = response.data;
    if (!data || data.status === 'ZERO_RESULTS') {
        return new HttpError('Could not found location', 422);
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

