import styled from 'styled-components';
import axios from 'axios';

const Button = styled.button`
    border: 1px solid lightgray;
    margin: 0 5px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 1rem;
    padding: 0.6rem 1rem;
    `
const ModalBox = styled.div`
    width: 30vh;
    height: 20vh;
    flex-direction:column;
    justify-content: space-between;
    position: fixed;
    background-color: white;
    border-radius: 10px;
    z-index: 600;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid lightgray;
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1rem;
    `
//TODO 삭제 후에 모달 사라지지 않는 것 관리(상태 관리해줘야 함)

export function DiaryDeleteModal({isDeleteOpen, closemodal,year,month,date, setText}) {
    const handleRemove = async () => {
        if (date) {
            try {
                await axios.delete(`http://localhost:5144/api/diaries/?year=${year}&month=${month}&date=${date}`)
                setText('');
                alert('일기가 삭제되었습니다.');
                closemodal()
            }
            catch (error) {
                console.error("There was an error deleting the diary entry!", error);                
        }
    }

    return (
        <ModalBox style={{ display: isDeleteOpen ? 'flex' : 'none' }}>
            <div>
                <div>정말 삭제하시겠어요?</div>
                <div>삭제하시면 더 이상 일기를 볼 수 없어요🥲</div>
            </div>
            <div style={{display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            }}>
                <Button onClick={handleRemove}>삭제하기</Button>
                <Button onClick={closemodal} > 취소하기</Button>

            </div>

        </ModalBox>
    )
    }
}
export default DiaryDeleteModal