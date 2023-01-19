import React from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.bgSide};
    height: 56px;
    color:  ${({theme}) => theme.text };
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    pad: 0px 20px;
    position: relative;
`;

const Search = styled.div`
    position: absolute;
    width: 40%;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
`;

const Button = styled.button`
    padding: 5px 15px;
    margin-right: 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`

function Navbar() {
  return (
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder='Search...' />
                <SearchOutlinedIcon />
            </Search>
            <Button>
                <AccountCircleOutlinedIcon/>
                SIGN IN
            </Button>
        </Wrapper>
    </Container>
  )
}

export default Navbar