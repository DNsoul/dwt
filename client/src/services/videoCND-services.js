export default class VideoCNDServices{

    api_token = '?api_token=6VS6zpxngv3aZJ4z6EHiESmt4iNbCLkG';
    url = 'https://videocdn.tv/api';

    getResult = async (category, params) => {
        const res = await fetch(`${this.url}${category}${this.api_token}${params}`);

        if (!res.ok) {
            throw new Error(`Ошибка выполения запроса: ${this.url} \n статус: ${res.status}`);
        }

        return await res.json();
    };

    getList = async (search, category, page ) => {
        const params = `&page=${page}&query=${search}`;

        const body = await this.getResult(category, params);

        return body;
    }


}