/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

import { CustomBtn1, AnchorElement1Context, FontSize1Context, PenSettingsContext } from '../App'

export type Args2 = {
    id: string,
    color: string
}

const Colors1 = {
    red: '#f44336',
    pink: '#e91e63',
    purple: '#9c27b0',
    blue: '#2196f3',
    green: '#4caf50',
    yellow: '#ffeb3b',
    orange: '#ff9800',
    brown: '#795548',
    grey: '#9e9e9e',
    black: '#000',
    white: '#fff'
}

/* 値の応じたカラーコードを返す */
const SelectColorCode1 = (val: number): string => {
    switch (val) {
        case 0:
            return Colors1.red
        case 1:
            return Colors1.pink
        case 2:
            return Colors1.purple
        case 3:
            return Colors1.blue
        case 4:
            return Colors1.green
        case 5:
            return Colors1.yellow
        case 6:
            return Colors1.orange
        case 7:
            return Colors1.brown
        case 8:
            return Colors1.grey
        case 9:
            return Colors1.black
        case 10:
            return Colors1.white
        default:
            return ''
    }
}

/* 背後のエレメントを取得 */
export const GetBackElement = (
    element1: HTMLElement,
    target_Id: string,
    loopLimit: number
): HTMLElement => {
    let count = 0
    let element2 = element1

    /* 指定したIDが見つかるまで、又は、指定した回数制限に達するまで。 */
    while (!element2.id.includes(target_Id) && count < loopLimit) {
        /* 親エレメントを取得し、代入 */
        element2 = element2.parentElement as HTMLElement
        count++
    }

    return element2
}

/* ペンカラーボタン */
export const SettingPenColorBtn = (props: Args2) => {
    const { anchorEl1, setAnchorEl1 } = useContext(AnchorElement1Context)
    const fontSize1 = useContext(FontSize1Context)
    const { penSettings, setPenSettings } = useContext(PenSettingsContext)

    const open = Boolean(anchorEl1)
    const id = {
        btn: `${props.id}_Btn`,
        menu: `${props.id}_Menu`,
        menuItem: `${props.id}_MenuItem`
    }

    /* 選択されたペンの色を反映させる */
    const selectPenColor = (e: React.MouseEvent | React.TouchEvent) => {
        const el1 = e.target as HTMLElement
        const el2 = GetBackElement(el1, id.menuItem, 3) as HTMLLIElement

        setPenSettings({
            color: SelectColorCode1(el2.value),
            width: penSettings.width
        })
        setAnchorEl1(null)
    }

    return (
        <>
            <CustomBtn1 id={id.btn} style={{ color: props.color }}
                aria-controls={open ? id.menu : undefined}
                aria-haspopup={'true'}
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl1(e.currentTarget)}
            >
                <EditIcon style={{ fontSize: fontSize1 }} />
            </CustomBtn1>
            <Menu id={id.menu}
                style={{ fontSize: fontSize1 }}
                aria-labelledby={id.btn}
                anchorEl={anchorEl1}
                open={open}
                onClose={() => setAnchorEl1(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MenuItem id={`${id.menuItem}_Red`} value={0}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.red }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Pink`} value={1}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.pink }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Purple`} value={2}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.purple }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Blue`} value={3}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.blue }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Green`} value={4}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.green }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Yellow`} value={5}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.yellow }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Orange`} value={6}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.orange }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Brown`} value={7}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.brown }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Grey`} value={8}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.grey }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_Black`} value={9}
                    onClick={(e) => selectPenColor(e)}
                ><Brightness1Icon style={{ color: Colors1.black }} />
                </MenuItem>
                <MenuItem id={`${id.menuItem}_White`} value={10}
                    onClick={(e) => selectPenColor(e)}
                ><AutoFixNormalIcon style={{ color: Colors1.black }} />
                </MenuItem>
            </Menu>
        </>
    )
}