import { useEffect } from "react";


export function useLocalStorage(date, diaryInput) {
    useEffect(() => {
        localStorage.setItem(date, diaryInput);
    }, [date, diaryInput]);
}
// function main() {

//     let diaryInput = localStorage.getItem('diaryinput')
//     const userNameElement = document.querySelector('#user-name')

//     localStorage.setItem('userName', userName)
// }

export default useLocalStorage