import { useState } from 'react';

// calendar 앱 함수 만들어 html 태그들 넣기
export function CalendarPage() {
    // props 에 대한 가공
    // API 를 제공해준다.
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    return (
    
        <div className="container">
            <div className="title">
                <div className="today_Date"></div>
                <div className="button-container">
                    {/* 이전 달로 돌아가는 버튼 */}
                    <button onClick={() => {
                        if (month == 0) {
                            setYear(year - 1);
                            setMonth(11);
                        } else {
                            setMonth(month - 1);
                        }
                        
                    }}>이전 달</button>
                    {/* 오늘 날짜로 돌아오는 버튼 */}
                    <button onClick={() => {
                        setYear(new Date().getFullYear());
                        setMonth(new Date().getMonth());

                    }}>Today</button>
                    <button onClick={() => {
                        if (month == 11) {
                            setYear(year + 1);
                            setMonth(0);
                        } else {
                            setMonth(month + 1);
                        }    
                    }}>다음 달</button>
                </div>

            </div>

            <Calendar year={year} month={month + 1} className = "cal_table"></Calendar>
        </div>
    )
}


{/* <CalendarPage>
    year = 2024
    month = 12 

    function clickPrevMonth() {

    }

    function clickNextMonth() {

    }

    <MonthController>
        <MonthChangeButton onClick={clickPrevMonth}>전달</MonthChangeButton>
        <Month>{year}{month}</Month>
        <MonthChangeButton onClick={clickNextMonth}>다음달</MonthChangeButton>
    </MonthController>
    
    <Calendar year={year} month={month}></Calendar>
</CalendarPage> */}


//

function Calendar(props) {
    // props.month 을 그릴거야.
    return (<div>{props.year}년 {props.month}월</div>);
}