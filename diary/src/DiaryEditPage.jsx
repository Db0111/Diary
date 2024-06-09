import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function DiaryEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');

    const ReturnCalendar = () => {navigate("/");}

    const [text, setText] = useState('');

    const handleDiaryChange = (event) => {
        setText(event.target.value);
    }

// 저장 로직 따로 구현 (아래에서 단순히 useLocalStorage 호출 불가))
    const handleSave = () => {
        // 직접 localStorage에 값을 저장
        if (date && text) {
            localStorage.setItem(date, text);
        }
    }

    const handleRemove = () => {
        // 직접 localStorage에 값에서 삭제
            localStorage.removeItem(date, text);
        }
    


    return (
    
        <div className='DiaryContainer'>
            {/* 누른 날짜 받아와서 상단에 띄우기 */}
            {date && <div>{date}</div>}
            <div className="DiaryInputContainer">
                {/* 저장된 일기 값이 있는 경우 내용 보여주기 */}
                <textarea 
                    onChange={handleDiaryChange}
                    className="DiaryInput"
                    value={text}
                    placeholder="오늘 당신의 하루는 어떠셨나요?"
                ></textarea>
            </div>

            <div className="button-container">
                    {/* 달력으로 돌아가는 버튼*/}
                <button onClick={ReturnCalendar}>돌아가기</button>
                <button onClick={handleSave}>저장하기</button>
                <button>수정하기</button>
                <button onClick={handleRemove}>삭제하기</button>
                   
            </div>


        </div>
        //일기 입력할 수 있는 칸 
        // 버튼 (저장, 수정, 삭제)
        // 돌아갈 수 있는 버튼
        

    )
}


