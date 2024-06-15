import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function DiaryEditPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year')
    const month = queryParams.get('month')
    const date = queryParams.get('date');
    //TODO 일기 저장 후에 그 달로 넘어가야하는데 무조건 처음 달로 넘어감 (이건 첫 페이지에 쿼리 파람이 없어서 해야 함)
    const ReturnCalendar = () => {navigate("/");}

    //date 가 있으면 해당 날짜의 일기를 불러옴, 없으면 빈 문자열
   
    // savedText 값이 존재한다면 해당 값을 초기값으로 설정하고, 그렇지 않으면 빈 문자열('')을 초기값으로 설정합니다.
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        axios.get(`http://localhost:5144/api/diaries/?year=${year}&month=${month}&date=${date}`)
            .then(response => {
                const savedText = response.data.data[0].article
                setText(savedText);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the diary entry!", error);
                setIsLoading(false);
            })        
    }, [])
   
    // handleDiaryChange 함수는 textarea의 입력값이 변경될 때마다 호출되어 해당 입력값을 text 상태로 업데이트합니다.
    const handleDiaryChange = (event) => {
        setText(event.target.value);
    }
    // 함수로 호출하였을 때 useEffect가 호출되지 않는 문제가 있음 -> 수정 완료
    // 저장 로직 따로 구현 (아래에서 단순히 함수로 useLocalStorage 호출 불가))
    const handleSave = () => {
        // api릁 통해 일기 저장
        if (date && text) {
            axios.post(`http://localhost:5144/api/diaries/?year=${year}&month=${month}&date=${date}`, {article: text })
                .then(response => {
                    alert('일기가 저장되었습니다.');
                })
                .catch(error => {
                    console.error("There was an error saving the diary entry!", error);
                    console.error("Full error response:", error.response);
                });
        }
    }


    const handleRemove = () => {
        // 직접 localStorage에 값에서 삭제
        if (date) {
            axios.delete(`http://localhost:5144/api/diaries/?year=${year}&month=${month}&date=${date}`)
                .then(response => {
                    setText('');
                    alert('일기가 삭제되었습니다.');
                })
                .catch(error => {
                    console.error("There was an error deleting the diary entry!", error);
                });
        }
    }
    
    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
    
        <div className='DiaryContainer'>
            {/* 누른 날짜 받아와서 상단에 띄우기 */}
            <div className='DiaryTitle'>
                {date && <div className='ClickedDate'>{`${year}년 ${month}월 ${date}일`}</div>}
                {/* 달력으로 돌아가는 버튼*/}
                <button onClick={ReturnCalendar}>돌아가기</button>
            </div>
            
            <div className="DiaryInputContainer">
                {/* 저장된 일기 값이 있는 경우 내용 보여주기 */}
                <textarea 
                    onChange={handleDiaryChange}
                    className="DiaryInput"
                    value={text}
                    placeholder="오늘 당신의 하루는 어떠셨나요?"
                ></textarea>
                <div className="buttonContainer">
                    <button onClick={handleSave}>저장하기</button>
                    {/* Todo  일기에 이미 값이 있으면 수정 및 저장하기 로 텍스트 바뀌는 것*/}
                    <button onClick={handleRemove}>삭제하기</button>
                </div>
            </div>

           


        </div>

    )
}
export default DiaryEditPage;
