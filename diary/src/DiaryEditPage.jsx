import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function DiaryEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');

    const ReturnCalendar = () => {navigate("/");}

    //date 가 있으면 해당 날짜의 일기를 불러옴, 없으면 빈 문자열
    const savedText = date ? localStorage.getItem(date) : '';
   
    // savedText 값이 존재한다면 해당 값을 초기값으로 설정하고, 그렇지 않으면 빈 문자열('')을 초기값으로 설정합니다.
    const [text, setText] = useState(savedText || '');
   
    // handleDiaryChange 함수는 textarea의 입력값이 변경될 때마다 호출되어 해당 입력값을 text 상태로 업데이트합니다.
    const handleDiaryChange = (event) => {
        setText(event.target.value);
    }
    // 함수로 호출하였을 때 useEffect가 호출되지 않는 문제가 있음 -> 수정 완료
    // 저장 로직 따로 구현 (아래에서 단순히 함수로 useLocalStorage 호출 불가))
    const handleSave = () => {
        // 직접 localStorage에 값을 저장
        if (date && text) {
            localStorage.setItem(date, text);
            alert('일기가 저장되었습니다.');

        }
    }

    const handleRemove = () => {
        // 직접 localStorage에 값에서 삭제
            localStorage.removeItem(date, text);
            setText('')
            alert('일기가 삭제되었습니다.');
        }
    
    //localstorage에 저장된 값이 있는 경우 불러오기
    


    return (
    
        <div className='DiaryContainer'>
            {/* 누른 날짜 받아와서 상단에 띄우기 */}
            {date && <div className='ClickedDate'>{date}</div>}
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


    )
}
