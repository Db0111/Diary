
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage } from './Calendar/CalendarPage.jsx';
import { DiaryEditPage } from './DiaryEditPage.jsx';

export const router = (
    //React Router의 BrowserRouter 컴포넌트로 라우팅을 시작한다.
    <BrowserRouter>
        {/* Routes: 라우터의 루트를 나타내는 컴포넌트 */}
        <Routes>
            <Route path="/" element={<CalendarPage />} />
            {/* DiaryEdit 에서 edit 빼기 */}
            <Route path="/diary/" element={<DiaryEditPage />} />
        </Routes>
    </BrowserRouter>
);

export default router

