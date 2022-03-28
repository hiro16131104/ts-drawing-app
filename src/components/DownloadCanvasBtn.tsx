/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';

import { CustomBtn1, FontSize1Context } from '../App'
import { Args3 } from './DeleteCanvasBtn'

/* ダウンロードファイルのプレフィックスを作成 */
const CreatePrefix_DateTime = (): string => {
    const dateTime = new Date()
    const year = dateTime.getFullYear().toString().padStart(2, '0')
    const month = dateTime.getMonth().toString().padStart(2, '0')
    const date = dateTime.getDate().toString().padStart(2, '0')
    const hours = dateTime.getHours().toString().padStart(2, '0')
    const minutes = dateTime.getMinutes().toString().padStart(2, '0')

    return `${year}${month}${date}_${hours}${minutes}`
}

/* キャンバスのデータを画像ファイルとしてダウンロード */
const DownloadBlob = (selector: string) => {
    const canvas = document.querySelector(selector) as HTMLCanvasElement

    /* キャンバスのデータをバイナリオブジェクトとして取得 */
    canvas.toBlob((blob) => {
        if (blob == null) return

        /* バイナリオブジェクトのリンク（URL）を生成 */
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')

        document.body.appendChild(a)

        /* アンカータグに情報を付与 → クリック → ダウンロード開始 */
        a.download = `${CreatePrefix_DateTime()}_Picture.png`
        a.href = url
        a.click()
        a.remove()

        /* 10秒経過した後、リンクを除去 */
        setTimeout(() => {
            URL.revokeObjectURL(url)
        }, 1e4)
    }, 'image/png')    /* PNGファイル */
}

/* ダウンロードボタン */
export const DownloadCanvasBtn = (props: Args3) => {
    const fontSize1 = useContext(FontSize1Context)

    const downloadCanvas = (
        e: React.MouseEvent | React.TouchEvent,
        selector: string
    ) => {
        /* 元々のイベントをキル */
        e.preventDefault()
        DownloadBlob(selector)
    }

    return (
        <CustomBtn1 id={props.id} onClick={(e) => downloadCanvas(e, props.selector)}>
            <DownloadIcon style={{ fontSize: fontSize1 }} />
        </CustomBtn1>
    )
}