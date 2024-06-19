import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';


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
        font-size: 1.2rem;
    `
const Sunday = styled.div`
        width: 6rem;
        height: 3rem;
        font-size: 1.2rem;
        color: red;
    `
const Saturday = styled.div`
        width: 6rem;
        height: 3rem;
        font-size: 1.2rem;
        color: blue;
    `
const TodayCircle = styled.div`
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        justify-content: center;
        border: 1px dashed #767f57;
        background: none;
        z-index: 300;
`
const Diarycircle = styled.div`
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: #95a26a;
        z-index: 500;
        `
export function Calendar(props) {

    
    // 주어진 년 월에 해당하는 캘린더 배열을 만드는 함수
    // 초기 값은 오늘 날짜로 설정, setDate 로 업데이트
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
    // 일기가 있는지 판단하는 함수
    const hasDiary = (year,month, date)=> {
        console.log(`Checking diary for ${year}-${month}-${date}:`, props.diaryMap[date]);
        //diaryData가 null 이 아니면 true, null 이면 false 반환
        return !!props.diaryMap[date];
    }
    useEffect(() => {
        let data = {};
        for (let i = 1; i <= new Date(props.year, props.month + 1, 0).getDate(); i++) {
            data[i] = hasDiary(props.year, props.month + 1, i);
        }
        //의존성 배열, 얘네 값이 변하면 useEffect 작동시켜줘!
    }, [props.year, props.month, props.diaryMap]);



    const navigate = useNavigate();
    //ClickedDate는 함수의 매개변수, 특정 날짜 셀 클릭될때 날짜 값 받아옴
    const handleOneDayClicked = (ClickedDate) => {
        // Todo: year, month,ClickedDate 세개를 따로 쿼리스트링으로 받을 것
        if (ClickedDate !== 0) {
            navigate(`/diary/?year=${props.year}&month=${props.month + 1}&date=${ClickedDate}`)
        }
    }
    
    

        
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
                            {date !== 0 && props.diaryMap[date] && <Diarycircle />}                            {/* date가 0이 아닐 경우 date를, 0이 맞을 경우 빈 문자열 반환 */}
                            {date !== 0 ? (
                                //date가 0이 아니고 오늘 날짜일 경우에느 Datecircle 그려
                                isToday(date) ? (<TodayCircle>{date}</TodayCircle>) 
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

export default Calendar