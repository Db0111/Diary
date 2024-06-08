import { useState } from 'react';
import { prevMonth, gotoToday, nextMonth, Calendar } from './CalendarFunction';




// calendar 앱 함수 만들어 html 태그들 넣기
export function CalendarPage() {
    // props 에 대한 가공
    // API 를 제공해준다.
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    
    const handlePrevMonth = () => {
        prevMonth(year, setYear, month, setMonth);
    };
    const handleToday = () => {
        gotoToday(setYear, setMonth);
    };

    const handleNextMonth = () => {
        nextMonth(year, setYear, month, setMonth);
    };



    return (
    
        <div className="container">
            <div className="title">
                <Calendar year={year} month={month + 1} className = "thisMonth"></Calendar>
                <div className="button-container">
                    {/* 이전 달로 넘어가는 버튼 */}
                    <button onClick={handlePrevMonth}>이전 달</button>
                    {/* 오늘 날짜로 돌아오는 버튼 */}
                    <button onClick={handleToday}>Today</button>
                    {/* 다음 달로 넘어가는 버튼 */}
                    <button onClick={handleNextMonth}>다음 달</button>
                </div>

            </div>

            
        </div>
    )
}


