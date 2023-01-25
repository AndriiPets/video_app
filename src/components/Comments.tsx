import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

const Container = styled.div`
    
`
const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const Input = styled.input`
    border: none;
    background-color: transparent;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    outline: none;
    padding: 5px;
    width: 100%;
`

function Comments() {
  return (
    <Container>
        <NewComment>
            <Avatar src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo' />
            <Input placeholder='Add a comment...' />
        </NewComment>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
    </Container>
  )
}

export default Comments