import { useState } from 'react';
import {Calendar} from "./Calendar.jsx";


// calendar 앱 함수 만들어 html 태그들 넣기
export function CalendarPage() {



    // props 에 대한 가공
    // API 를 제공해준다.
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const handlePrevMonthClicked = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }

    };
    const handleTodayClicked = () => {
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth());
    };

    const handleNextMonthClicked = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <div className="container">
            <div className="title">
                <div>{year}년 {month + 1}월</div>

                <div className="button-container">
                    {/* 이전 달로 넘어가는 버튼 */}
                    <button onClick={handlePrevMonthClicked}>이전 달</button>
                    {/* 오늘 날짜로 돌아오는 버튼 */}
                    <button onClick={handleTodayClicked}>Today</button>
                    {/* 다음 달로 넘어가는 버튼 */}
                    <button onClick={handleNextMonthClicked}>다음 달</button>
                </div>
                {/*<Calendar year={year} month={month + 1} className = "thisMonth"></Calendar>*/}
                <Calendar year={year} month={month}/>
            </div>

            
        </div>
    )
}


//
// <CalendarPage>
//     year = 2024
//     month = 5
//
//     <MonthController>
//         <CurrentMonth>{year}년 {month + 1}월</CurrentMonth>
//         <ToolBar>
//             <MonthChangeButton>이전 달</MonthChangeButton>
//             <MonthChangeButton>Today</MonthChangeButton>
//             <MonthChangeButton>다음 달</MonthChangeButton>
//         </ToolBar>
//     </MonthController>
//
//     <Calendar year={year} month={month}>
//         <Monday></Monday>
//         <Tuesday></Tuesday>
//         <Wendesday></Wendesday>
//         ...
//
//         <div>1</div>
//         <div>2</div>
//         <div>3</div>
//         ...
//         <div>30</div>
//     </Calendar>
//
// </CalendarPage>