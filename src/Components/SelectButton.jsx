import { Box, styled } from '@mui/material'
import React from 'react'

const Button = styled(Box)({
    border: '1px solid gold',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    "&:hover":{
        backgroundColor:'gold',
        color:'black'
    },
    width:'22%'
})

function SelectButton({children,selected,onClick}) {
  return (
    <Button component='span'
    onClick={onClick}
    sx={{
        backgroundColor: selected ? 'gold' : '',
    color: selected ? 'black' : "",
    fontWeight: selected ? 700 : 500,
    }}
    >
        {children}
    </Button>
  )

}

export default SelectButton