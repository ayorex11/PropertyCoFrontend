import { DashBlogCard } from '@/components/Card'
import Pagination from '@/components/Pagination'
import { Blog } from '@/lib/types'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Blogs = ({data, loading, draft}: {data: Blog[], loading: boolean, draft?: boolean}) => {
  return (
    <Pagination
        data={data}
        resetTrigger={data.length}
        title={draft ? "Drafts" : "Articles"}
        emptyMessage={draft ? "No Drafts available..." : "No Blog available..."}
        isLoading={loading}
        type="blog"
        render={(blog) => (
          <Box px={{base: "0rem", md: "4rem"}} mb={{base: "1rem", md: "3rem"}}>
            <DashBlogCard blog={blog} draft={draft}/>
          </Box>
        )}
      />
  )
}

export default Blogs
