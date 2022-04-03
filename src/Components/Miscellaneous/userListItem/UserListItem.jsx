import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import './userlistIte.scss'
function UserListItem({data,handleFunction}) {
  return (
    <Box onClick={handleFunction} className='listItem'>
      <Box className='inner_box'>
      <Text>{data.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {data.email}
        </Text>
      </Box>
      
    </Box>
  )
}

export default UserListItem