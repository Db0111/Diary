//열려있는 지 상태: isOpen으로 관리
import styled from 'styled-components';

const Button = styled.button`
    border: 1px solid lightgray;
    margin: 0 5px;
    font-family: "Nanum Gothic";
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    `

const ModalBox = styled.div`
    width: 80vh;
    height: 50vh;
    justify-content: top;
    position: fixed;
    background-color: white;
    border-radius: 10px;
    z-index: 800;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid lightgray;
    font-family: "Nanum Gothic"
    `
const DiaryList = styled.div`
    padding: 1rem;
    text-align: left;
    border: 1px solid lightgray;
    border-radius: 1rem;
    margin: 3px;
`
//props 받을 때는 객체로 받아야 함
export function Modal({isOpen, closeModal, year, month, diaries}) {
    // const [diaryData, setDiaryData] = useState({});

    // function HasSavedDiary (year, month, date) {
    //     return localStorage.getItem(`${year}-${month}-${date}`);
        
    // }
    // useEffect(() => {
    //     let DiaryList = [];
    //     // useEffect 훅 내에서 직접적으로 props 사용할 수 없고, 인자로 받은 year와 month 사용해야함
    //     // 해당 월의 말일까지 for문을 돌면서 HasSavedDiary 함수를 통해 인자를 전달하여 localStorage에서 
    //     // 키 값으로 찾아온 값을 SavedDiaryData에 할당
    //     for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    //         const SavedDiaryData = HasSavedDiary(year, month + 1, i);
    //         //SavedDiaryData 가 있을 경우 DiaryList 배열에 내용을 넣는다. (month, day, text 세개의 키)
    //         if (SavedDiaryData) {
    //             DiaryList.push({ month: month + 1, day: i, text: SavedDiaryData });
    //         }
    //     }
    //     setDiaryData(DiaryList);
    // }, [year, month]);
    
    

    return (
        // isOpen 상태이면 block으로 보여주고, false이면 none으로 가려짐
        <div style = {{display : isOpen? "block" : "none"}} className='DiaryList'>
            <ModalBox>
                <div className='title'>
                    <div style={{
                        fontSize: '1.5rem'
                    }}>이번 달 일기 목록 📝</div>
                    <button onClick = {closeModal} style = {{backgroundColor : "#F1F1F1"}}>X</button>
                </div>
                <div
                style = {{
                    width: '100%',
                }}>
                {/* diaryData 배열의 길이가 0 넘을 때 */}
                {diaries.length > 0 ? (
                        diaries.map(({ date, article }) => (
                            <DiaryList key={`${year}-${month}=${date}`}>
                                {month +1}월 {date}일: {article}
                            </DiaryList>
                        ))
                    ) : (
                        <div>일기가 없습니다.</div>
                    )}
                    </div>                        
            </ModalBox>

        </div>
    )
}

export default Modal;


