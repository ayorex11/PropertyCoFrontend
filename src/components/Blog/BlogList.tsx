'use client'
import React, { useEffect } from 'react'
import Pagination from '../Pagination'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import RightSearchContainer from '../RightSearchContainer';
import { BlogCard } from '../Card';
import { fetchBlogs } from '@/lib/features/blogs/blogsSlice';

const BlogList = () => {
    const {data, loading} = useAppSelector((state) => state.blogs.blogs);
    const dispatch = useAppDispatch();
    useEffect(() => {
    dispatch(fetchBlogs());
    }, [dispatch]);
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{ base: 1, md: 4}} color="#000048">
        <Pagination 
        data={data}
        type='blog'
        isLoading={loading}
        title='Articles'
        emptyMessage='No Article available...'
        resetTrigger={data.length}
        render={(blog)=> (
          <Box mb="3rem">
            <BlogCard key={blog.id} blog={blog}/>
          </Box>
        )}
        />
      </GridItem>
      <GridItem colSpan={{base: 1, md: 2}}>
        <RightSearchContainer/>
      </GridItem>
    </Grid>
  )
}

export default BlogList;
