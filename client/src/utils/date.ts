export class dateTransfer {
    static getDate(date?: string) {
        if (!date) return "Không có dữ liệu";
        const dateObject = new Date(date);
        return isNaN(dateObject.getTime()) ? "No valid" : dateObject.toLocaleDateString("vi-VN");
    }

    static getTime(date?: string) {
        if (!date) return "Không có dữ liệu";
        const dateObject = new Date(date);
        return isNaN(dateObject.getTime()) ? "No valid" : dateObject.toLocaleTimeString("vi-VN");
    }
}
