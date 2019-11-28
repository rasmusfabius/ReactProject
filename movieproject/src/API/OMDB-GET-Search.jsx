const OMDBGETSearch = async searchQuery => {
  let URL = 'https://www.omdbapi.com/?apikey=251ff3f5&s='.concat(searchQuery);
  try {
    let response = await fetch(URL, {
      method: 'GET'
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export default OMDBGETSearch;
