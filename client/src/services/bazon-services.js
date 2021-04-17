export default class BazonServices{

    api_token = '?token=79b5e725fe2cc4cad649aa0472f2bf94';
    url = 'https://bazon.cc/api/search';

    getResult = async (params) => {
        const res = await fetch(`${this.url}${this.api_token}${params}`);

        if (!res.ok) {
            throw new Error(`Ошибка выполения запроса: ${this.url} \n статус: ${res.status}`);
        }

        return await res.json();
    };

    getList = async (search) => {
        const params = `&title=${search}`;

        const body = await this.getResult(params);

        if (body.error !== undefined) body.results = [];

        return body;
    }


}