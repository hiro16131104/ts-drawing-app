/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { FontSize1Context, CanvasSizeContext, CanvasHistoryContext, CanvasBackgroundContext } from '../App'
import { deleteCanvas } from './DeleteCanvasBtn'

type Args4 = {
    id: string,
    selector: string,
    color: string
}

const CustomLbl1 = styled('label')`
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    &:hover{
        cursor: pointer;
    }
`

/* 画像をアップロード */
const UploadPic = (
    e: ChangeEvent<HTMLInputElement>,
    selector: string,
) => {
    /* 何も選択されていない場合はエラー表示 */
    if (e.target.files == null) {
        alert('画像が選択されていません。')
        return
    }

    const file = e.target.files[0]

    /* 想定されたファイル以外が選択された場合は、エラー表示 */
    if (file == null) {
        alert('画像が選択されていません。')
        return
    } else if (file.size > 1e7) {
        alert('画像のファイルサイズが大きすぎます。')
        e.target.value = ''
        return
    } else if (file.type.indexOf('image') == -1) {
        alert('画像以外のファイルが選択されています。')
        e.target.value = ''
        return
    }

    const canvas = document.querySelector(selector) as HTMLCanvasElement
    const context = canvas.getContext('2d')
    const reader = new FileReader()

    /* ファイルをセット */
    reader.readAsDataURL(file)

    /* ファイル読み込み */
    reader.onload = () => {
        const result = reader.result as string
        const img = new Image()

        /* イメージエレメント画像情報を付与 */
        img.src = result

        /* イメージエレメント読み込み */
        img.onload = () => {
            const { width, height } = img
            let scale = 0
            let resize = { width: 0, height: 0 }

            /* 元画像サイズ → キャンバスサイズの縮尺割合 */
            if (width >= height) scale = canvas.width / width
            else if (width < height) scale = canvas.height / height

            /* 元画像の方が大きい場合（縮尺割合1未満）は縮小後のサイズを設定 */
            if (scale < 1) {
                resize.width = width * scale
                resize.height = height * scale
            } else {
                resize.width = width
                resize.height = height
            }

            /* 縮小後のサイズでもキャンバスをはみ出す場合は、再度縮小後のサイズを設定 */
            if (resize.width > canvas.width) {
                scale = canvas.width / resize.width
                resize.width *= scale
                resize.height *= scale
            }
            if (resize.height > canvas.height) {
                scale = canvas.height / resize.height
                resize.width *= scale
                resize.height *= scale
            }

            /* キャンバスのサイズ縮小後の画像サイズに合わせる（アスペクト比が異なるため） */
            canvas.width = resize.width
            canvas.height = resize.height

            /* 画像をキャンバスへ表示 */
            context?.drawImage(
                img,
                0, 0, width, height,
                0, 0, resize.width, resize.height
            )
        }
    }
    /* ボタンオブジェクトの値をリセット */
    e.target.value = ''
}

/* アップロードボタン */
export const UploadPictureBtn = (props: Args4) => {
    const { id, selector, color } = props
    const fontSize1 = useContext(FontSize1Context)
    const { canvasHistory, setCanvasHistory } = useContext(CanvasHistoryContext)
    const { canvasSize, setCanvasSize } = useContext(CanvasSizeContext)
    const { canvasBackground, setCanvasBackground } = useContext(CanvasBackgroundContext)

    return (
        <CustomLbl1 style={{ fontSize: fontSize1, color: color }}>
            <input id={id} style={{ display: 'none' }}
                type="file" accept="image/*"
                onChange={(e) => {
                    deleteCanvas(selector, canvasBackground.color, canvasSize, setCanvasSize, setCanvasHistory)
                    UploadPic(e, selector)
                }} />
            <InsertPhotoIcon style={{ fontSize: fontSize1 }} />
        </CustomLbl1>
    )
}