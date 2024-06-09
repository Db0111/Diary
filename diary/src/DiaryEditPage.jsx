import { useNavigate, useLocation } from 'react-router-dom';

export function DiaryEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');

    const ReturnCalendar = () => {navigate("/");}



    return (
    
        <div className='DiaryContainer'>
            {/* 누른 날짜 받아와서 상단에 띄우기 */}
            {date && <div>{date}</div>}

            <div className="button-container">
                    {/* 달력으로 돌아가는 버튼*/}
                    <button onClick={ReturnCalendar}>돌아가기</button>
                   
            </div>


        </div>
        //일기 입력할 수 있는 칸 
        // 버튼 (저장, 수정, 삭제)
        // 돌아갈 수 있는 버튼
        

    )
}

