export default function TabButton({children, onSelect, isSelected}){

    function handleClick(){
        console.log("Button Clicked");
    }

    return(
        <li>
            <button className={isSelected ? "active": ""} onClick={onSelect}>{children}</button>
        </li>
    );
}