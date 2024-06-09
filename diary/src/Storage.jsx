import { useEffect } from "react";


export function useLocalStorage(date, diaryInput) {
    console.log('함수 정상 호출')
    useEffect(() => {
        localStorage.setItem(date, diaryInput);
    }, [date, diaryInput]);
}
// function main() {

//     let diaryInput = localStorage.getItem('diaryinput')
//     const userNameElement = document.querySelector('#user-name')

//     localStorage.setItem('userName', userName)
// }