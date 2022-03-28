/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { CustomBtn1, CanvasBackgroundContext, CanvasHistoryContext, CanvasSizeContext, FontSize1Context } from '../App'
import { SetCanvasBackColor } from './DrawArea'

export type Args3 = {
    id: string,
    selector: string
}

/* キャンバスを初期状態にする */
export const deleteCanvas = (
    selector: string,
    canvasBackColor: string,
    canvasSize: {
        width: number,
        height: number
    },
    setCanvasSize: React.Dispatch<React.SetStateAction<{
        width: number;
        height: number;
    }>>,
    setCanvasHistory: React.Dispatch<React.SetStateAction<ImageData[]>>
) => {
    const canvas = document.querySelector(selector) as HTMLCanvasElement
    const context = canvas.getContext('2d')

    /* キャンバスを全削除 */
    context?.clearRect(0, 0, canvas.width, canvas.height)

    /* キャンバスのサイズを再度設定 */
    setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight * 0.84
    })
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    const { width, height } = canvas

    /* キャンバスの下地を再度設定 */
    SetCanvasBackColor(canvas.id, { width, height }, canvasBackColor)

    /* キャンバスの履歴（バイナリオブジェクト）を削除 */
    setCanvasHistory([])
}

/* 削除ボタン */
export const DeleteCanvasBtn = (props: Args3) => {
    const { canvasBackground, setCanvasBackground } = useContext(CanvasBackgroundContext)
    const { canvasHistory, setCanvasHistory } = useContext(CanvasHistoryContext)
    const { canvasSize, setCanvasSize } = useContext(CanvasSizeContext)
    const fontSize1 = useContext(FontSize1Context)

    return (
        <CustomBtn1 id={props.id}
            onClick={() => deleteCanvas(props.selector, canvasBackground.color, canvasSize, setCanvasSize, setCanvasHistory)}>
            <DeleteForeverIcon style={{ fontSize: fontSize1 }} />
        </CustomBtn1>
    )
}