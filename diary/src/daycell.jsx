import styled from "styled-components"

export function Daycell() {
    const Week = styled.div`
        display: flex;
        flex-direction: row;
        margin: auto;
        justify-content: space-between;
    `

    //빈 배열
    let weeks = []
    let oneWeek = []
    //그 달에 며칠까지 있는지 확인
    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    // 첫번째 날짜의 요일, 마지막 날짜
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month, 0).getDate()


    //첫째날이 일요일인 경우
   if (firstDay == 0) {
       for (let i = 1; i <= 7; i++) {
           oneWeek.push(i)
       }
    //첫째날이 일요일이 아닌 경우
    } else {
        //첫째날까지 빈칸으로 채우기
        for (let i = 0; i < firstDay; i++) {
            oneWeek.push(0)
        }
        //첫째날부터 마지막 날까지 채우기
        for (let i = 1; i <= 7 - firstDay; i++) {
            oneWeek.push(i)
        }
    }
    //oneWeek 에 7개 숫자 입력되면 weeks에 추가
    if (oneWeek.length === 7) {
        weeks.push(oneWeek)
        oneWeek = []

    }
    //8~나머지 날짜 채우기

    for (let i = 8; i <= lastDate; i++) {
        oneWeek.push(i)
        if (oneWeek.length === 7) {
            weeks.push(oneWeek)
            oneWeek = []
        } else {
            oneWeek.push(0)
            weeks.push(oneWeek)
        }
    }


    return (
        <div className="cal_table">
            <Week>
                <div className="Sun">Sun</div>
                <div className="Mon">Mon</div>
                <div className="Tue">Tue</div>
                <div className="Wed">Wed</div>
                <div className="Thu">Thu</div>
                <div className="Fri">Fri</div>
                <div className="Sat">Sat</div>
            </Week>
            <Week>
                {/* 1주차부터 날짜 그리기 */}
                
                
               
            </Week>
        </div>



    )
    
  
}


