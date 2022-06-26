import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { SpinnerCircularFixed } from "spinners-react";
import SearchBar from '../components/SearchBar';
import FilterComponent from '../components/FilterComponent';
import IdeaDetails from '../components/IdeaDetails'
import { useDispatch, useSelector } from 'react-redux';
import { getIdeas } from '../features/ideasSlice';
import { CgDanger } from 'react-icons/cg'

export default function PendingPage() {
    const dispatch = useDispatch()
    const ideasState = useSelector((state) => state.ideasState)

    useEffect(() => {
        if (ideasState.getIdeasStatus === '') {
            dispatch(getIdeas())
        }
    }, [dispatch, ideasState.getIdeasStatus])

    return (
        <Grid container alignItems='center' justifyContent='center' style={{ height: '95vh' }}>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={12} sm={8} md={7} lg={6} spacing={3} >
                    <Grid container spacing={4} justifyContent="center">
                        {ideasState.getIdeasStatus === "pending" && (
                            <Typography>Loading ....</Typography>
                        )}
                        {ideasState.getIdeasStatus === "failed" && (
                            <Typography>failed</Typography>
                        )}
                        {ideasState.getIdeasStatus === "success" && (
                            <Grid item xs={12} alignItems='flex-end'>
                                <Grid container direction='column' justifyContent='space-around' alignItems='center' spacing={3}>
                                    <FilterComponent />
                                    <SearchBar />
                                    <>
                                        {ideasState.ideas.length === 0 && (
                                            <Typography>No Ideas Yet</Typography>
                                        )}
                                        {ideasState.ideas.map((idea) => (
                                            <IdeaDetails
                                                id={idea._id}
                                                userName={idea.username}
                                                title={idea.title}
                                                description={idea.description}
                                                likeCount={idea.likeCount}
                                            />
                                        ))}
                                    </>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}