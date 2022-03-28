/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import { DragFlgContext, LastPositionContext, PenSettingsContext, CanvasBackgroundContext, CanvasSizeContext, CanvasHistoryContext } from '../App';

type Args1 = { id: string }

const CustomCanvas = styled.canvas`
    touch-action: none;
    user-select: none;
    &:hover {
        cursor: crosshair;
    }
`

/* キャンバス上に描画するため情報を設定 */
const SettingContext = (
    context: CanvasRenderingContext2D,
    penSettings: {
        color: string;
        width: number;
    }
) => {
    /* 描画する線の端、角は丸に。 */
    context.lineCap = 'round'
    context.lineJoin = 'round'

    /* ペンの太さ */
    context.lineWidth = penSettings.width
    /* ペンの色 */
    context.strokeStyle = penSettings.color
}

/* 線を引く（書く） */
const DrawingLine = (
    context: CanvasRenderingContext2D,
    lastPosition: {
        x: number,
        y: number
    },
    currentPosition: {
        x: number,
        y: number
    }
) => {
    if (lastPosition.x < 0 || lastPosition.y < 0) {
        context.moveTo(currentPosition.x, currentPosition.y)
    } else {
        /* 直前の位置へ移動 */
        context.moveTo(lastPosition.x, lastPosition.y)
    }

    /* 現在の位置までのラインを設定 */
    context.lineTo(currentPosition.x, currentPosition.y)
    /* 線を引く */
    context.stroke()
}

/* キャンバスに描画する（PC用） */
const DrawCanvas = (
    e: React.MouseEvent,
    isDrag: boolean,
    penSettings: {
        color: string;
        width: number;
    },
    lastPosition: {
        x: number,
        y: number
    },
    setLastPosition: React.Dispatch<React.SetStateAction<{
        x: number,
        y: number
    }>>
) => {
    const canvas = e.target as HTMLCanvasElement
    const context = canvas.getContext('2d')
    const { offsetX, offsetY } = e.nativeEvent

    if (isDrag && context != null) {
        /* キャンバスに描画するための情報を設定 */
        SettingContext(context, penSettings)
    } else {
        /* ドラッグ中でない場合は処理を抜ける */
        return
    }

    /* 線を引く */
    DrawingLine(context, lastPosition, { x: offsetX, y: offsetY })
    /* 最終の位置情報を記録 */
    setLastPosition({ x: offsetX, y: offsetY })
}

/* キャンバスに描画する（スマホ用） */
const DrawCanvas_Touch = (
    e: React.TouchEvent,
    isDrag: boolean,
    penSettings: {
        color: string;
        width: number;
    },
    lastPosition: {
        x: number,
        y: number
    },
    setLastPosition: React.Dispatch<React.SetStateAction<{
        x: number,
        y: number
    }>>
) => {
    const canvas = e.target as HTMLCanvasElement
    const context = canvas.getContext('2d')
    /* タッチした場所を取得 */
    const touchPosition = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
    }
    /* キャンバスの位置情報を取得 */
    const canvasPosition = {
        x: canvas.getBoundingClientRect().left + window.scrollX,
        y: canvas.getBoundingClientRect().top + window.scrollY
    }

    /* ページ内のタッチした位置 － ページ内のキャンバスの位置 ＝ キャンバス内のタッチした位置 */
    touchPosition.x -= canvasPosition.x
    touchPosition.y -= canvasPosition.y

    if (isDrag && context != null) {
        /* キャンバスに描画するための情報を設定 */
        SettingContext(context, penSettings)
    } else {
        /* ドラッグ中でない場合は処理を抜ける */
        return
    }

    /* 線を引く */
    DrawingLine(context, lastPosition, touchPosition)
    /* 最終の位置情報を記録 */
    setLastPosition({ x: touchPosition.x, y: touchPosition.y })
}

/* ドラッグ開始 */
const DragStart = (
    e: React.MouseEvent | React.TouchEvent,
    setIsDrag: React.Dispatch<React.SetStateAction<boolean>>,
    canvasHistory: ImageData[],
    setCanvasHistory: React.Dispatch<React.SetStateAction<ImageData[]>>
) => {
    const canvas = e.target as HTMLCanvasElement
    const context = canvas.getContext('2d')
    let history: ImageData[] = []

    /* 値渡し */
    history.push(...canvasHistory)

    /* キャンバスのデータ（画像）を配列へ追加 */
    history.push(context!.getImageData(0, 0, canvas.width, canvas.height))

    /* キャンバスの履歴が7個を超える場合、先頭の要素を削除 */
    if (history.length > 7) history.shift()

    /* キャンバスの履歴をステートフックへ記録 */
    setCanvasHistory(history)

    context?.beginPath()
    setIsDrag(true)
}

/* ドラッグ終了 */
const DragEnd = (
    e: React.MouseEvent | React.TouchEvent,
    setIsDrag: React.Dispatch<React.SetStateAction<boolean>>,
    setLastPosition: React.Dispatch<React.SetStateAction<{
        x: number,
        y: number
    }>>
) => {
    const canvas = e.target as HTMLCanvasElement
    const context = canvas.getContext('2d')

    context?.closePath()
    setIsDrag(false)

    /* 直近の位置情報をリセット */
    setLastPosition({ x: -1, y: -1 })
}

/* キャンバスの下地（色）を設定 */
export const SetCanvasBackColor = (
    canvasId: string,
    canvasSize: {
        width: number,
        height: number
    },
    canvasBackColor: string
) => {
    const canvasEl = document.querySelector(`#${canvasId}`) as HTMLCanvasElement
    const context = canvasEl.getContext('2d')

    if (context == null) return

    /* 色を設定する */
    context.fillStyle = canvasBackColor
    /* 設定を反映させる */
    context.fillRect(0, 0, canvasSize.width, canvasSize.height)
}

/* キャンバスエリア */
export const DrawArea = (props: Args1) => {
    const { lastPosition, setLastPosition } = useContext(LastPositionContext)
    const { isDrag, setIsDrag } = useContext(DragFlgContext)
    const { penSettings, setPenSettings } = useContext(PenSettingsContext)
    const { canvasBackground, setCanvasBackground } = useContext(CanvasBackgroundContext)
    const { canvasSize, setCanvasSize } = useContext(CanvasSizeContext)
    const { canvasHistory, setCanvasHistory } = useContext(CanvasHistoryContext)

    /* キャンバスのサイズが変わったとき（ウィンドウのロード、サイズ変更）のみ下地（色）の再設定を行う。 */
    useEffect(() => {
        SetCanvasBackColor(props.id, canvasSize, canvasBackground.color)
    }, [canvasSize.width, canvasSize.height])

    return (
        <CustomCanvas id={props.id}
            width={canvasSize.width} height={canvasSize.height}
            onMouseDown={(e) => DragStart(e, setIsDrag, canvasHistory, setCanvasHistory)}
            onMouseUp={(e) => DragEnd(e, setIsDrag, setLastPosition)}
            onMouseOut={(e) => DragEnd(e, setIsDrag, setLastPosition)}
            onMouseMove={(e) => DrawCanvas(e, isDrag, penSettings, lastPosition, setLastPosition)}
            onTouchStart={(e) => DragStart(e, setIsDrag, canvasHistory, setCanvasHistory)}
            onTouchEnd={(e) => DragEnd(e, setIsDrag, setLastPosition)}
            onTouchCancel={(e) => DragEnd(e, setIsDrag, setLastPosition)}
            onTouchMove={(e) => DrawCanvas_Touch(e, isDrag, penSettings, lastPosition, setLastPosition)}
        ></CustomCanvas>
    )
}