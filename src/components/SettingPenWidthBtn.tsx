/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import AdjustIcon from '@mui/icons-material/Adjust';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import { CustomBtn1, AnchorElement2Context, FontSize1Context, PenSettingsContext } from '../App'
import { Args2, GetBackElement } from './SettingPenColorBtn'

const CustomIcon2 = styled(Brightness1Icon)`
    color: #000;
    margin-left: auto;
    margin-right: auto;
`

/* ペン幅ボタン */
export const SettingPenWidthBtn = (props: Args2) => {
    const { anchorEl2, setAnchorEl2 } = useContext(AnchorElement2Context)
    const fontSize1 = useContext(FontSize1Context)
    const { penSettings, setPenSettings } = useContext(PenSettingsContext)
    const open = Boolean(anchorEl2)
    const id = {
        btn: `${props.id}_Btn`,
        menu: `${props.id}_Menu`,
        menuItem: `${props.id}_MenuItem`
    }

    /* 選択されたペン幅を反映させる */
    const selectPenWidth = (e: React.MouseEvent | React.TouchEvent) => {
        const el1 = e.target as HTMLElement
        /* アイコンをクリックされた場合でも、背後のボタンエレメントを取得する。 */
        const el2 = GetBackElement(el1, id.menuItem, 3) as HTMLLIElement

        /* ステートフックを更新 */
        setPenSettings({
            color: penSettings.color,
            width: el2.value
        })
        setAnchorEl2(null)
    }

    const CustomMenuItem1 = styled(MenuItem)`
        height: 35px;
    `

    return (
        <>
            <CustomBtn1 id={id.btn} style={{ color: props.color }}
                aria-controls={open ? id.menu : undefined}
                aria-haspopup={'true'}
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl2(e.currentTarget)}
            >
                <AdjustIcon style={{ fontSize: fontSize1 }} />
            </CustomBtn1>
            <Menu id={id.menu}
                style={{ fontSize: fontSize1 }}
                aria-labelledby={id.btn}
                anchorEl={anchorEl2}
                open={open}
                onClose={() => setAnchorEl2(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <CustomMenuItem1 id={`${id.menuItem}_9`} value={9}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '9px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_8`} value={8}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '8px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_7`} value={7}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '7px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_6`} value={6}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '6px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_5`} value={5}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '5px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_4`} value={4}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '4px' }} />
                </CustomMenuItem1>
                <CustomMenuItem1 id={`${id.menuItem}_3`} value={3}
                    onClick={(e) => selectPenWidth(e)}
                ><CustomIcon2 style={{ height: '3px' }} />
                </CustomMenuItem1>
            </Menu>
        </>
    )
}