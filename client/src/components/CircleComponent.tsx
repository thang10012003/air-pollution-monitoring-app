import { ReactNode,FC } from "react";
import { TouchableOpacity } from "react-native";


interface props {
    size: number,
    children: ReactNode,
    color: string, 

}
const CircleComponent:FC<props> = ({size = 40, children, color, ...rest}) =>{
    return(
        <TouchableOpacity
            style={[
                {
                    width: size ,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size/2,
                    justifyContent:'center',
                    alignItems:'center',
                }
            ]}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}
export default CircleComponent