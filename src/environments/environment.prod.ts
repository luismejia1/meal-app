const API_VERSION = 'v1/1';
const API_FORMAT_RESPONSE = 'json';
const BASE_URL = `https://www.themealdb.com/api/${API_FORMAT_RESPONSE}/${API_VERSION}/`;

export const environment = {
  production: true,
  api: {
    endpoints: {
      categories: {
        list: `${BASE_URL}categories.php/`,
      },
      meals: {
        searchByName: `${BASE_URL}search.php`,
        detail: `${BASE_URL}lookup.php`,
        filter: `${BASE_URL}filter.php`,
      }
    }
  }
};
