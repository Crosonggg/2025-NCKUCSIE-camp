export function initializeMap() {
    const mapIframe = document.getElementById('map-iframe');

    // 檢查是否為手機版（螢幕寬度小於 640px）
    const isMobile = window.innerWidth < 640;

    // 根據設備類型設定不同的 zoom 值
    const zoomLevels = {
        south: isMobile ? 14 : 15, // 南下路線：手機版 zoom=14，桌面版 zoom=15
        north: isMobile ? 13 : 14, // 北上路線：手機版 zoom=13，桌面版 zoom=14
        default: 15, // 預設地點：統一 zoom=15
    };

    // 手機版和北上路線的中心點偏移
    const centerOffsetSouth = isMobile ? '&center=22.999693, 120.235422' : '';
    const centerOffsetNorth = isMobile ? '&center=22.9923314, 120.2350927' : '&center=22.985409,120.235711';

    const routes = {
        south: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=710台南市永康區大灣交流道&destination=台南市東區長榮路三段成功大學資訊工程系新館&mode=driving&zoom=${zoomLevels.south}${centerOffsetSouth}`,
        north: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=22.970863,120.2499933&destination=台南市東區長榮路三段成功大學資訊工程系新館&mode=driving&zoom=${zoomLevels.north}${centerOffsetNorth}`,
        default: `https://www.google.com/maps/embed/v1/search?q=%E5%9C%8B%E7%AB%8B%E6%88%90%E5%8A%9F%E5%A4%A7%E5%AD%B8%20%E8%B3%87%E8%A8%8A%E5%B7%A5%E7%A8%8B%E5%AD%B8%E7%B3%BB&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=${zoomLevels.default}`
    };

    window.showRoute = function(route) {
        mapIframe.src = routes[route] || routes.default;
    };
}