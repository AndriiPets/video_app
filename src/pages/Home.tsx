import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
` 

function Home() {
  return (
    <Container>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
      <Card type='bg'/>
    </Container>
  )
}

export default Home
