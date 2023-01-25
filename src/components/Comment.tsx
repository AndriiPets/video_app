import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    gap: 24px;
    margin: 30px 0px;
`
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`
const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    color: ${({ theme }) => theme.textSoft};
`

const Text = styled.span`
    font-size: 14px;
`

function Comment() {
  return (
    <Container>
        <Avatar src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo' />
        <Details>
            <Name>
                Joe Shmoe
                <Date>1 day ago</Date>
            </Name>    
                <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                    at.
                </Text>
        </Details>
    </Container>
  )
}

export default Comment