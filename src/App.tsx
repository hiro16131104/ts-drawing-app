/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useEffect, useState, createContext } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { DrawArea } from './components/DrawArea'
import { DownloadCanvasBtn } from './components/DownloadCanvasBtn'
import { DeleteCanvasBtn } from './components/DeleteCanvasBtn'
import { SettingPenColorBtn } from './components/SettingPenColorBtn'
import { SettingPenWidthBtn } from './components/SettingPenWidthBtn'
import { UploadPictureBtn } from './components/UploadPictureBtn'
import { BackCanvasBtn } from './components/BackCanvasBtn'

const FontColor1 = '#fff'
const FontSize1 = '4.3vh'
const BackColor1 = '#B983FF'

const CustomDiv1 = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
`
const CustomBox1 = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const CustomBox1_1 = styled(CustomBox1)`
  width: 100%;
  height: 8vh;
  background-color: ${BackColor1};
`
const CustomBox1_2 = styled(CustomBox1)`
  width: 100%;
  height: 84vh;
  background-color: ${BackColor1};
`
const CustomBox1_3 = styled(CustomBox1)`
  width: 100%;
  height: 84vh;
  background-color: #ddd;
`
const CustomBox1_4 = styled(CustomBox1)`
  width: 100%;
  height: 8vh;
  background-color: ${BackColor1};
  justify-content: space-evenly !important;
`
const CustomIcon1 = styled(BrushOutlinedIcon)`
  color: ${FontColor1};
  font-size: ${FontSize1};
  margin-right: 2vw;
  &:hover {
    animation: rotation1 1.5s linear;
  }
  @keyframes rotation1 {
    0% {transform: rotate(0);}
    100% {transform: rotate(360deg);}
  }
`
const CustomTitle1 = styled(Typography)`
  color: ${FontColor1};
  font-size: ${Number(FontSize1.replace('vh', '')) * 0.9}vh;
  transform: skewX(-20deg) skewY(-5deg);
  &:hover {
    cursor: default;
  }
`
export const CustomBtn1 = styled(IconButton)`
  color: ${FontColor1};
  size: ${FontSize1};
`
/* 他のコンポーネントでも使用するコンテキスト */
export const FontSize1Context = createContext({} as string)
export const DragFlgContext = createContext({} as {
  isDrag: boolean,
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>
})
export const LastPositionContext = createContext({} as {
  lastPosition: { x: number, y: number },
  setLastPosition: React.Dispatch<React.SetStateAction<{
    x: number,
    y: number
  }>>
})
export const AnchorElement1Context = createContext({} as {
  anchorEl1: HTMLElement | null,
  setAnchorEl1: React.Dispatch<React.SetStateAction<HTMLElement | null>>
})
export const AnchorElement2Context = createContext({} as {
  anchorEl2: HTMLElement | null,
  setAnchorEl2: React.Dispatch<React.SetStateAction<HTMLElement | null>>
})
export const PenSettingsContext = createContext({} as {
  penSettings: {
    color: string,
    width: number
  },
  setPenSettings: React.Dispatch<React.SetStateAction<{
    color: string,
    width: number
  }>>
})
export const CanvasBackgroundContext = createContext({} as {
  canvasBackground: { color: string },
  setCanvasBackground: React.Dispatch<React.SetStateAction<{ color: string }>>
})
export const CanvasSizeContext = createContext({} as {
  canvasSize: {
    width: number,
    height: number
  },
  setCanvasSize: React.Dispatch<React.SetStateAction<{
    width: number,
    height: number
  }>>
})
export const CanvasHistoryContext = createContext({} as {
  canvasHistory: ImageData[],
  setCanvasHistory: React.Dispatch<React.SetStateAction<ImageData[]>>
})

export const App = () => {
  /* ステートフックを初期化 */
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 0.84
  })
  const [isDrag, setIsDrag] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: -1, y: -1 })
  const [penSettings, setPenSettings] = useState({ color: '#000', width: 3 })
  const [canvasBackground, setCanvasBackground] = useState({ color: '#fff' })
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([])
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null)
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null)

  /* コンテキストに渡すオブジェクト */
  const canvasSizeVal = { canvasSize, setCanvasSize }
  const dragFlgVal = { isDrag, setIsDrag }
  const lastPositionVal = { lastPosition, setLastPosition }
  const penSettingsVal = { penSettings, setPenSettings }
  const canvasBackgroundVal = { canvasBackground, setCanvasBackground }
  const canvasHistoryVal = { canvasHistory, setCanvasHistory }
  const anchorElement1Val = { anchorEl1, setAnchorEl1 }
  const anchorElement2Val = { anchorEl2, setAnchorEl2 }

  const selector1 = '#drawArea1'

  /* ウィンドウのサイズを基にキャンバスのサイズを計算する */
  const calcCanvasSize = (w: Window) => {
    setCanvasSize({
      width: w.innerWidth,
      height: w.innerHeight * 0.84
    })
  }

  useEffect(() => {
    /* PCのみスクロール禁止に */
    document.addEventListener('mousewheel', (e) => e.preventDefault(), { passive: false })
  }, [])

  return (
    <FontSize1Context.Provider value={FontSize1}>
      <PenSettingsContext.Provider value={penSettingsVal}>
        <CanvasSizeContext.Provider value={canvasSizeVal}>
          <CanvasBackgroundContext.Provider value={canvasBackgroundVal}>
            <CanvasHistoryContext.Provider value={canvasHistoryVal}>

              <CustomDiv1 id={'main1'}>
                {/* ヘッダー部分（タイトルエリア） */}
                <CustomBox1_1 id={'header1'}>
                  <CustomIcon1 id={'titleIcon1'} onTouchStart={undefined} />
                  <h1><CustomTitle1 id={'title1'}>oekaki</CustomTitle1></h1>
                </CustomBox1_1>

                {/* ボディ部分（描画エリア） */}
                <CustomBox1_2 id={'body1'}>
                  <CustomBox1_3 id={'body1-1'}>
                    <DragFlgContext.Provider value={dragFlgVal}>
                      <LastPositionContext.Provider value={lastPositionVal}>
                        <DrawArea id={'drawArea1'}></DrawArea>
                      </LastPositionContext.Provider>
                    </DragFlgContext.Provider>
                  </CustomBox1_3>
                </CustomBox1_2>

                {/* フッター部分（メニューエリア） */}
                <CustomBox1_4 id={'footer'}>
                  <UploadPictureBtn id={'uploadPictureBtn1'} selector={selector1} color={FontColor1} />

                  <DownloadCanvasBtn id={'downloadCanvasBtn1'} selector={selector1} />

                  <DeleteCanvasBtn id={'deleteCanvasBtn1'} selector={selector1} />

                  <BackCanvasBtn id={'backCanvasBtn1'} selector={selector1} />

                  <AnchorElement2Context.Provider value={anchorElement2Val}>
                    <SettingPenWidthBtn id={'settingPenWidthBtn1'} color={FontColor1} />
                  </AnchorElement2Context.Provider>

                  <AnchorElement1Context.Provider value={anchorElement1Val}>
                    <SettingPenColorBtn id={'settingPenColorBtn1'} color={FontColor1} />
                  </AnchorElement1Context.Provider>
                </CustomBox1_4>

              </CustomDiv1>
            </CanvasHistoryContext.Provider>
          </CanvasBackgroundContext.Provider>
        </CanvasSizeContext.Provider>
      </PenSettingsContext.Provider>
    </FontSize1Context.Provider>
  );
}
