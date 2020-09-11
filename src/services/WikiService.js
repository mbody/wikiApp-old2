/**
 * Make requests to wikipedia REST API
 */

const BASE_URI = 'https://fr.wikipedia.org/w/api.php?';

export class WikiService {

    async search(keyword, offset=0) {

        const url = BASE_URI + `action=query&format=json&generator=search&prop=pageimages|description&gsroffset=${offset}&gsrsearch=` + keyword.replace(/&/g, ' ').replace(/=/g, ' ');
        console.log("url : " + url);
        const response = await fetch(url);
        console.log("response : " + JSON.stringify(response));
        const responseJson = await response.json();
        return responseJson.query ? Object.values(responseJson.query.pages) : [];
    }
}

export const wikiService = new WikiService();