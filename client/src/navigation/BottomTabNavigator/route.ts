export const BOTTOM_TAB_ROUTE = createEnum({
    DASHBOARD: "Dashboard",
    MAP: "Bản đồ",
    HISTORY: "Lịch sử",
    SETTING: "Cài đặt",
  });
// function createEnum<T extends { [P in keyof T]: P }>(o: T) {
//     return o;
// }
function createEnum<T extends Record<string, string>>(o: T): T {
    return o;
}