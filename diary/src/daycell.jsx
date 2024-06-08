import styled from "styled-components"




export function Daycell() {

    
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

    //빈 배열
    let weeks = []
    let dateList = []
    //그 달에 며칠까지 있는지 확인
    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    // 첫번째 날짜의 요일, 마지막 날짜
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()


    //첫째날이 일요일인 경우
   if (firstDay == 0) {
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

    return (
        <div className="cal_table">
            <Weeks>
                <div className="Sun">Sun</div>
                <div className="Mon">Mon</div>
                <div className="Tue">Tue</div>
                <div className="Wed">Wed</div>
                <div className="Thu">Thu</div>
                <div className="Fri">Fri</div>
                <div className="Sat">Sat</div>
            </Weeks>
            <Week>
                {/* 1주차부터 날짜 그리기 */}
                {/* weeks 배열에 있는 요소들을 순회하며 날짜를 그린다. */}
                {weeks.map((dateList, weekIndex) => (
                // 한 주를 나타내는 Week 컴포넌트
                <Weeks key={weekIndex}>
                    {/* dateList 배열에 있는 요소(날짜 데이터)를 순회하며 날짜를 그린다. */}
                    {dateList.map((date, dateIndex) => (
                        // date가 0이면 빈칸을, 0이 아니면 날짜를 표시한다.
                        // date가 0이면 empty 클래스를, 0이 아니면 date 클래스를 적용한다. 
                        <div key={dateIndex} className={date === 0 ? "empty" : "date"}>
                            {/* date가 0이 아닐 경우 date를, 0이 맞을 경우 빈 문자열 반환 */}
                            {date !== 0 ? date : ""}
                        </div>
                    ))}
                </Weeks>
            ))}
            </Week>
            
        </div>



    )
    
  
}


