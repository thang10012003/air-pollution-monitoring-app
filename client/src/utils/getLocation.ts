export const getAddressFromCoordinates_OSM = async (latitude: string, longitude: string) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
                headers: {
                    "User-Agent": "AirQualityApp/1.0 (contact@example.com)"
                }
            }
        );

        const data = await response.json();
        // if (data && data.address) {
        //     const district = data.address.suburb || data.address.county || "Không rõ quận";
        //     const city = data.address.city || data.address.town || data.address.state || "Không rõ thành phố";
        //     return `${district}, ${city}`;
        // }

        if (data && data.address) {
            return {
                district: data.address.suburb || data.address.county || "Không rõ quận",
                city: data.address.city || data.address.town || data.address.state || "Không rõ thành phố",
            };
        }
        return data.display_name || "Không tìm thấy địa chỉ";
    } catch (error) {
        console.error("❌ Lỗi khi lấy địa chỉ từ OSM:", error);
        return "Không tìm thấy địa chỉ";
    }
};
