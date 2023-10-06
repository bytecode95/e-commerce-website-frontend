import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';



const ColorButton1 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#76d300'),
    backgroundColor: '#76d300',
    '&:hover': {
        backgroundColor: '#76d300',
    },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#000000',
    '&:hover': {
        backgroundColor: '#000000',
    },
}));

const ColorButton3 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#f9ad02'),
    backgroundColor: '#f9ad02',
    '&:hover': {
        backgroundColor: '#f9ad02'
    },
}));

const ColorButton4 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#e22137'),
    backgroundColor: '#e22137',
    '&:hover': {
        backgroundColor: '#e22137'
    },
}));



export function GreenBtn(prop){
    return(
        <ColorButton1  variant="contained">{prop.name}</ColorButton1>
        )
}

export function BlackBtn(prop){
    return(
        <ColorButton2 variant="contained">{prop.name}</ColorButton2>
    )
}


export function YellowBtn(prop){
    return(
        <ColorButton3  variant="contained">{prop.name}</ColorButton3>
    )
}

export function PinkBtn(prop){
    return(
        <ColorButton4 variant="contained">{prop.name}</ColorButton4>
    )
}

export function CommonBtn(prop){
    return(
        <ColorButton4 style={{backgroundColor: prop.bg}} variant="contained">{prop.name}</ColorButton4>
    )
}