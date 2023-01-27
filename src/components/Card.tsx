import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Container = styled.div<CardProps>`
    width: ${(prop) => prop.type !== 'sm' && '290px'};
    margin-bottom: ${(prop) => (prop.type === 'sm' ? '10px' : '45px')};
    cursor: pointer;
    display: ${(prop) => prop.type === 'sm' && 'flex'};
    gap: 10px;
`

const Image = styled.img<CardProps>`
    width: 100%;
    height: ${(prop) => (prop.type === 'sm' ? '110px' : '192px')};
    background-color: #999;
    flex: 1;
    border-radius: ${(prop) => prop.type === 'sm' ? '10px' : '0%'};
`
const Details = styled.div<CardProps>`
    display: flex;
    margin-top: ${(prop) => prop.type !== 'sm' && '16px'};
    gap: 12px;
    flex: 1;
`

const ChannelImage = styled.img<CardProps>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(prop) => prop.type === 'sm' && 'none'};
`
const Texts = styled.div`
    
`
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`
const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
    margin: 9px 0px;
`
const Info = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
`
interface CardProps {
  type: string
}

function Card({type}: CardProps) {
  return (
    <Link to='video/test' style={{textDecoration: "none"}}>
    <Container type={type}>
      <Image 
      type={type}
      src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"/>
      <Details type={type}>
        <ChannelImage 
        type={type}
        src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <Texts>
            <Title>Test video</Title>
            <ChannelName>Dev Dev</ChannelName>
            <Info>660,908 views  1 day ago</Info>
        </Texts>
      </Details>
    </Container>
    </Link>
  )
}

export default Card
