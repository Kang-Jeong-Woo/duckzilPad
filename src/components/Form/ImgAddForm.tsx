import React, {useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {postItDataActions} from "@/store/slices/postItDataSlice";
import {RootState} from "@/store/store";
import ShowFileImg from "@/components/Form/ShowFileImg";
import classes from "@/components/Form/Form.module.css";
import path from "path";
import {addMenuActions} from "@/store/slices/addMenu-slice";
import axios from "axios";

const ImgAddForm:React.FC = () => {
    const dispatch = useAppDispatch();
    const [imgFile, setImgFile] = useState<{file:File, thumbnail:string, type:string, path:string}>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const userData = useAppSelector((state: RootState) => state.user.userData);
    const colName = 'img'
    const addPostIt = (data:{title: string, content: string, tempUrl:string}) => {
        dispatch(postItDataActions.addData({userId: userData.userId!, colName: colName, img: data}));
    }
    const handleClickFileInput = () => {fileInputRef.current?.click()};
    const uploadFile = (event:React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        // const len = fileList?.length;
        if (fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);
            setImgFile({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
                path: `/${fileList[0].name}`
            })

        }
    };
    const showImg = useMemo(()=>{
        if (!imgFile && imgFile === null) {
            return <img src={""} alt="사진 없음"/>
        }
        return <ShowFileImg src={imgFile?.thumbnail} alt={imgFile?.type} onClick={handleClickFileInput}/>
    },[imgFile]);

    const submitHandler = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredTitle = descriptionInputRef.current!.value;
        if(enteredTitle.trim().length!==0 && imgFile?.path.trim().length!==0 && imgFile?.file !== null){
            const uploadedImage = imgFile!.file;
            // 이미지 확장자
            const ext = path.extname(imgFile!.path);
            // 파일명 중복이름 방지
            const fileName = userData.nick + "-" + Date.now() + ext
            //파일 경로
            const imgPath =  "/" + userData.nick + "/" + fileName
            addPostIt({title: enteredTitle!, content: imgPath, tempUrl: imgFile!.thumbnail})
            //폼데이터 생성
            const formData = new FormData()
            formData.set('image', uploadedImage, fileName)
            try {
                axios.post("/api/upload/img",
                    formData,
                    { withCredentials: true }
                )
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log("Storage connection fail..");
            }
        }
        dispatch(addMenuActions.close());
    };
    return(
        <>
            <h1 className={classes.header}>Img Upload</h1>

            <form className={classes.imgForm} onSubmit={submitHandler} encType={"multipart/form-data"}>

                <div className={classes.titleCntnr}>
                    <h2><label htmlFor="description" className={classes.imgQ1}></label></h2>
                    <div className={classes.textAreaCntnr}>
                        <textarea className={classes.textArea} id={"description"} rows={1} ref={descriptionInputRef}></textarea>
                    </div>
                </div>

                <div className={classes.imgContentCntnr}>
                    <h2><label htmlFor="image" className={classes.imgQ2}></label></h2>
                    <input id={"image"} name={'image'} type={"file"} accept={"image/jpg, image/jpeg, image/png"}
                           ref={fileInputRef} onChange={uploadFile}/>
                    <div className={classes.imgCntnr}>
                        <div>
                            {showImg}
                        </div>
                    </div>
                </div>

                <div className={classes.btnCntnr}>
                    <button type={"submit"} className={classes.button}>post!</button>
                </div>
            </form>
        </>
    )
}
export default ImgAddForm