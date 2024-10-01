import { useEffect, useState } from "react";
import { Calendar } from "../service/Calendar.jsx";
import styled from "styled-components";
import Modal from "../components/Modal/Modal.jsx";
import axios from "axios";

const Button = styled.button`
  border: 1px solid lightgray;
  margin: 0 5px;
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 1rem;
  padding: 0.6rem 1rem;
`;

// calendar 앱 함수 만들어 html 태그들 넣기
export function CalendarPage() {
  // props 에 대한 가공
  // API 를 제공해준다.
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const [diaries, setDiaries] = useState([]);
  // api 호출
  useEffect(() => {
    const fetchMonthDiaries = async () => {
      try {
        const response = await axios.get(
          `https://my-first-diary.vercel.app/api/diaries/?year=${year}&month=${
            month + 1
          }`
        );
        setDiaries(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the diary entry!", error);
      }
    };

    fetchMonthDiaries();
  }, [year, month]);

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

  //일기 목록 불러오는 모달 띄우기
  //초기값은 띄우지 않아야 하므로 false
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달이 열리는
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getDiaryMap = (diaryList) => {
    const temp = {};
    for (let diary of diaryList) {
      temp[diary.date] = diary.article;
    }
    return temp;
  };

  return (
    <div className="container">
      <div className="title">
        <div className="thisMonth">
          {year}년 {month + 1}월
        </div>

        <div className="button-container">
          {/* 이전 달로 넘어가는 버튼 */}
          <Button
            onClick={handlePrevMonthClicked}
            style={{ backgroundColor: "#e4d7c7" }}
          >
            이전 달
          </Button>
          {/* 오늘 날짜로 돌아오는 버튼 */}
          <Button onClick={handleTodayClicked}>Today</Button>
          {/* 다음 달로 넘어가는 버튼 */}
          <Button
            onClick={handleNextMonthClicked}
            style={{ backgroundColor: "#e4d7c7" }}
          >
            다음 달
          </Button>
        </div>
        {/*<Calendar year={year} month={month + 1} className = "thisMonth"></Calendar>*/}
      </div>
      <Calendar year={year} month={month} diaryMap={getDiaryMap(diaries)} />
      <Button
        onClick={openModal}
        style={{ margin: "1rem", backgroundColor: "#e4d7c7" }}
      >
        일기 목록
      </Button>
      {/* isOpen: 모달의 표시 여부를 결정하는 상태값 */}
      {/* closeModal은 닫는 버튼 눌렀을 때 기능 */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        year={year}
        month={month}
        diaries={diaries}
      />
    </div>
  );
}

export default CalendarPage;
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
