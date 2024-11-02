function showRestaurantScreen(category) {
    currentCategory = category;
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
    setLocation();
}

function searchPlaces(location) {
    const categoryGroupCode = 'FD6'; // 음식점 카테고리 코드

    fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${currentCategory}&x=${location.getLng()}&y=${location.getLat()}&radius=1000&page=1&size=15`, {
        method: 'GET',
        headers: {
            'Authorization': 'KakaoAK YOUR_API_KEY'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data.documents);
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function displayResults(places) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    places.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant-item';
        div.innerHTML = `
            <button class="restaurant-button" onclick="showRestaurantInfo('${restaurant.place_name}', '${restaurant.category_name}', '${restaurant.menu || '추천 메뉴'}')">
                ${restaurant.place_name} - ${restaurant.menu || '추천 메뉴'}
            </button>
        `;
        resultsContainer.appendChild(div);

        const placeLocation = new kakao.maps.LatLng(restaurant.y, restaurant.x);
        markers.push(new kakao.maps.Marker({ position: placeLocation, map }));
    });
}

function showRestaurantInfo(placeName, categoryName, menu) {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('infoScreen').classList.remove('hidden');

    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `
        <h2>${placeName}</h2>
        <p>카테고리: ${categoryName}</p>
        <p>추천 메뉴: ${menu}</p>
    `;
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
    document.getElementById('infoScreen').classList.add('hidden');
}
