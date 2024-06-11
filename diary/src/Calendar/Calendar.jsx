import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Weeks = styled.div`
        display: flex;
        flex-direction: row;
        margin: auto;
        justify-content: space-between;
    `

const Week = styled.div`
        display: flex;
        flex-direction: column;
        margin: auto;
        justify-content: space-between;
    `
const Weekday = styled.div`
        width: 6rem;
        height: 3rem;
        font-size: 1.5rem;
    `
const Sunday = styled.div`
        width: 6rem;
        height: 3rem;
        font-size: 1.5rem;
        color: red;
    `
const Saturday = styled.div`
        width: 6rem;
        height: 3rem;
        font-size: 1.5rem;
        color: blue;
    `
const DateCircle = styled.div`
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        border: 1px dashed blue;
        background: none;
        z-index: 300;
`
export function Calendar(props) {

    /**
     * 주어진 년 월에 해당하는 캘린더 배열을 만드는 함수
     */
    const [date, setDate] = useState(new Date().getDate());
    const today = new Date()

    const getWeeks = (year, month) => {
        let weeks = []
        let dateList = []

        // 첫번째 날짜의 요일, 마지막 날짜
        const firstDay = new Date(year, month, 1).getDay()
        const lastDate = new Date(year, month + 1, 0).getDate()

        //첫째날이 일요일인 경우
        if (firstDay === 0) {
            for (let i = 1; i <= 7; i++) {
                dateList.push(i)
            }
            //첫째날이 일요일이 아닌 경우
        } else {
            //첫째날까지 빈칸으로 채우기
            for (let i = 0; i < firstDay; i++) {
                dateList.push(0)

            }
            //첫째날부터 마지막 날까지 채우기
            for (let i = 1; i <= 7 - firstDay; i++) {
                dateList.push(i)
            }

        }
        //oneWeek 에 7개 숫자 입력되면 weeks에 추가
        if (dateList.length === 7) {
            weeks.push(dateList)
            dateList = []

        }
        //8~나머지 날짜 채우기

        for (let i = 8 - firstDay; i <= lastDate; i++) {
            dateList.push(i)
            if (dateList.length === 7) {
                weeks.push(dateList)
                dateList = []
            }
        }
        // 남아 있는 날이 있으면 마지막 주로 추가
        if (dateList.length > 0) {
            while (dateList.length < 7) {
                dateList.push(0) // 빈칸으로 채우기
            }
            weeks.push(dateList)
        }

        return weeks;
    }
    const isToday = (date) => {
        return (
            date === today.getDate() &&
            props.month === today.getMonth() &&
            props.year === today.getFullYear()
        );
    };

    const navigate = useNavigate();
    //ClickedDate는 함수의 매개변수, 특정 날짜 셀 클릭될때 날짜 값 받아옴
    const handleOneDayClicked = (ClickedDate) => {
        setDate(ClickedDate);
        // Todo: year, month,ClickedDate 세개를 따로 쿼리스트링으로 받을 것
        if (ClickedDate !== 0) {
            navigate(`/diary/?year=${props.year}&month=${props.month + 1}&date=${ClickedDate}`)
        }

    }
    

        
    
    // Todo 일기가 있는 날엔 밑에 점 표시하기
    return (
        <div className="cal_table">
            <Weeks>
                <Sunday>Sun</Sunday>
                <Weekday>Mon</Weekday>
                <Weekday>Tue</Weekday>
                <Weekday>Wed</Weekday>
                <Weekday>Thu</Weekday>
                <Weekday>Fri</Weekday>
                <Saturday>Sat</Saturday>
            </Weeks>
            <Week>
                {/* weeks 배열에 있는 요소들을 순회하며 날짜를 그린다. */}
                {getWeeks(props.year, props.month).map((dateList, weekIndex) => (
                // 한 주를 나타내는 Week 컴포넌트
                <Weeks key={weekIndex}>
                    {/* dateList 배열에 있는 요소(날짜 데이터)를 순회하며 날짜를 그린다. */}
                    {dateList.map((date, dateIndex) => (
                        // date가 0이면 빈칸을, 0이 아니면 날짜를 표시한다.
                        // date가 0이면 empty 클래스를, 0이 아니면 date 클래스를 적용한다. 
                        <div
                            onClick={() => handleOneDayClicked(date)}
                            style={{width: "6rem", 
                            height: "4rem", 
                            paddingTop:"5px", 
                            display: 'flex',
                            justifyContent:'center',
                            border: '0.2px solid lightgray'
                        }}
                            key={dateIndex}
                            className={date === 0 ? "empty" : "date"}
                        >
                            {/* date가 0이 아닐 경우 date를, 0이 맞을 경우 빈 문자열 반환 */}
                            {date !== 0 ? (
                                //date가 0이 아니고 오늘 날짜일 경우에느 Datecircle 그려
                                isToday(date) ? (<DateCircle>{date}</DateCircle>) 
                                //date 0이 아니고 오늘 날짜일 경우에는 date 만 나타내
                                : (date)
                            ) : (
                                //date가 0일 경우에는 빈칸을 출력해
                                ""
                            )}
                            
                            
                            
                        </div>
                    ))} 
                </Weeks>
            ))}
            </Week>
            
        </div>

    )




}