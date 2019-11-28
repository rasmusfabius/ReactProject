const OMDBGETimdbID = async imdbID => {
  let url = 'https://www.omdbapi.com/?apikey=1fc41d7c&i='.concat(imdbID);

  try {
    let response = await fetch(url, {
      method: 'GET'
    });
  }
  if (respons.ok) {
    return await response.json();
  } catch (error) {
      console.log(error);
  }
}
export default OMDBGETimdbID;
