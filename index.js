document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const movieDetails = document.getElementById('movieDetails');

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            
            const apiKey = '4ace5611';
            const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;

            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === 'True') {
                        
                        const { Title, Year, Genre, Director, Plot, Poster } = data;
                        movieDetails.innerHTML = `
                            <h2>${Title} (${Year})</h2>
                            <p><strong>Genre:</strong> ${Genre}</p>
                            <p><strong>Director:</strong> ${Director}</p>
                            <p><strong>Plot:</strong> ${Plot}</p>
                            <img src="${Poster}" alt="${Title} Poster" width="200">
                        `;
                    } else {
                        movieDetails.innerHTML = `<p>${data.Error}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    movieDetails.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
                });
        } else {
            movieDetails.innerHTML = '<p>Please enter a movie title.</p>';
        }
    });
});
