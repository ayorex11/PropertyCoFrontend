"use client"

import { Grid, GridItem } from '@chakra-ui/react'
import RightSearchContainer from '../RightSearchContainer'
import ConfirmEmail from './ConfirmEmail/page'

interface IConfimEmailProps {
    token: string
}

const VerifyEmail = ({token}: IConfimEmailProps) => {
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{base: 1, md: 4}} color="#000048" px="40px">
        <ConfirmEmail token={token}/>
      </GridItem>
      <GridItem colSpan={{base: 1, md: 2}}>
        <RightSearchContainer/>
      </GridItem>
    </Grid>
  )
}

export default VerifyEmail
