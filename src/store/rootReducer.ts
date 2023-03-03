import { combineReducers } from "@reduxjs/toolkit";

import addMenuSlice from "@/store/slices/addMenu-slice"
import canvasSlice from "@/store/slices/canvas-slice";
import fontSlice from "@/store/slices/font-slice";
import tableSlice from "@/store/slices/table-slice";
import userSlice from "@/store/slices/user-slice";
import loginSlice from "@/store/slices/loginSlice";
import signUpSlice from "@/store/slices/signUpSlice";
import modeSlice from "@/store/slices/modeSlice";
import ImgSlice from "@/store/slices/img-slice";


const rootReducer = combineReducers({
        addMenu: addMenuSlice,
        canvas: canvasSlice,
        font: fontSlice,
        img: ImgSlice,
        table: tableSlice,
        user: userSlice,
        login: loginSlice,
        signUp: signUpSlice,
        mode: modeSlice
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;