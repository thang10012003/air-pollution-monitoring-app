
type Props = {
    hexColor: string,
    opacity: number,
}
export const addOpacityToColor = (props: Props)  => {
    const {hexColor, opacity} = props;
    // Loại bỏ ký tự "#" nếu có
    const hex = hexColor.replace("#", "");
    // Chuyển đổi các thành phần màu HEX thành RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Trả về chuỗi rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };