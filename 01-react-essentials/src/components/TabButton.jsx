export default function TabButton({children,isSelected, ...props}){

    function handleClick(){
        console.log("Button Clicked");
    }

    return(
        <li>
            <button className={isSelected ? "active": ""} {...props}>{children}</button>
        </li>
    );
}