// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const API_VERSION = 'v1/1';
const API_FORMAT_RESPONSE = 'json';
const BASE_URL = `https://www.themealdb.com/api/${API_FORMAT_RESPONSE}/${API_VERSION}/`;

export const environment = {
  production: false,
  api: {
    endpoints: {
      categories: {
        list: `${BASE_URL}categories.php/`,
      },
      meals:{
        searchByName: `${BASE_URL}search.php`,
        detail: `${BASE_URL}lookup.php`,
        filter: `${BASE_URL}filter.php`,
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
