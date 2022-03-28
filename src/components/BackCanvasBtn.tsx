/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { CustomBtn1, CanvasHistoryContext, FontSize1Context } from '../App'
import { Args3 } from './DeleteCanvasBtn'

/* 戻るボタン */
export const BackCanvasBtn = (props: Args3) => {
    const { canvasHistory, setCanvasHistory } = useContext(CanvasHistoryContext)
    const fontSize1 = useContext(FontSize1Context)

    /* 直前の画像（バイナリオブジェクト）をキャンバスに表示する */
    const restoreLastCanvas = (selector: string) => {
        const canvas = document.querySelector(selector) as HTMLCanvasElement
        const context = canvas.getContext('2d')
        const history: ImageData[] = []

        history.push(...canvasHistory)

        /* 最後尾の要素を切り取って代入 */
        const lastHistory = history.pop()

        /* キャンバスへ表示 */
        if (lastHistory) context?.putImageData(lastHistory, 0, 0)

        setCanvasHistory(history)
    }

    return (
        <CustomBtn1 id={props.id}
            onClick={() => restoreLastCanvas(props.selector)}>
            <ArrowBackIcon style={{ fontSize: fontSize1 }} />
        </CustomBtn1>
    )
}