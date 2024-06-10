//열려있는 지 상태: isOpen으로 관리
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ModalBox = styled.div`
    width: 70vh;
    height: 50vh;
    justify-content: top;
    position: fixed;
    background-color: white;
    border-radius: 10px;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid black;
    `
//props 받을 때는 객체로 받아야 함
export function Modal({isOpen, closeModal}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const month = queryParams.get('month')

    const savedDiary = month ? localStorage.getItem(month) : '';


    return (
        // isOpen 상태이면 block으로 보여주고, false이면 none으로 가려짐
        <div style = {{display : isOpen? "block" : "none"}} className='DiaryList'>
            <ModalBox>
                <div className='title'>
                    <div>이번 달 일기 목록</div>
                    <button onClick = {closeModal}>X</button>
                </div>              
                <div>{savedDiary}</div>
            </ModalBox>

        </div>
    )
}

export default Modal;