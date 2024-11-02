window.onload = function() {
    setLocation(); // 페이지 로드 시 기본 위치 설정
};

let markers = [];
let currentCategory;
let map; // 전역 변수로 map 선언

function setLocation() {
    const locationInput = document.getElementById('locationInput').value.trim();
    getCoordinates(locationInput || '성남시청');
}

function getCoordinates(address) {
    if (typeof kakao !== 'undefined') {
        new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                displayMap(new kakao.maps.LatLng(result[0].y, result[0].x));
            } else {
                document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
            }
        });
    } else {
        console.error("kakao 객체가 정의되지 않았습니다.");
    }
}

function displayMap(location) {
    if (!map) {
        map = new kakao.maps.Map(document.getElementById('map'), { center: location, level: 4 });
    } else {
        map.setCenter(location);
    }
    searchPlaces(location);
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}
