
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage } from './Calendar/CalendarPage.jsx';
import { DiaryEdit } from './DiaryEditPage.jsx';

export const router = (
    //React Router의 BrowserRouter 컴포넌트로 라우팅을 시작한다.
    <BrowserRouter>
        {/* Routes: 라우터의 루트를 나타내는 컴포넌트 */}
        <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/diary/edit" element={<DiaryEdit />} />
        </Routes>
    </BrowserRouter>
);




// import {CalendarPage} from "./Calendar/CalendarPage.jsx";
// import { createBrowserRouter } from "react-router-dom";
// import { DiaryEdit } from "./DiaryEditPage.jsx";
// import App from './App.jsx'


// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//         children: [
//             {path: "",
//             element: <CalendarPage/>
//             },
//             {path: "/diary/edit",
//             element: <DiaryEdit/>
//             }
//         ]
//     }

// ]


    