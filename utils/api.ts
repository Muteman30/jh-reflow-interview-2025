
const baseUrl = process.env.BASE_URL;

const credentials = btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`);
const fetchOpts = {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${credentials}` 
  } 
};

export async function getData(url:string){
  return fetch(`${baseUrl}${url}`, fetchOpts)
    .then(response => {
      return response.json();
    })
    .catch(error => console.error(error));
}