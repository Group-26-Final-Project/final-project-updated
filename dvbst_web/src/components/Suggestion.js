import React, { useState } from 'react'
import { Button, Typography, TextField, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import { addIdeas } from '../features/ideasSlice';

export default function Suggestion() {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    // const ideasState = useSelector((state) => state.ideasState)
    const userState = useSelector((state) => state.userState)

    const initialValues = {
        title: "", description: ""
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const validate = (values) => {
        const errors = {}

        if (!values.title) {
            errors.title = "Title is required"
        }
        if (!values.description) {
            errors.description = "Description is required"
        } else if (values.description.length > 250) {
            errors.description = "Description cant exceed 250 characters"
        }
        else if (values.description.length < 50) {
            errors.description = "Description cant be smaller than 50 characters"
        }
        return errors
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues)
        console.log(errors)
        if (Object.keys(errors).length === 0) {
            dispatch(addIdeas({
                user_id: userState.user._id,
                username: userState.user.name + " " + userState.user.fname,
                ...formValues
            }))
                .unwrap()
                .then((response) => {
                    setFormValues(initialValues)
                    setFormErrors({})
                })
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <Grid container direction='column' justifyContent='center' spacing={1}>
            <Grid item xs={12} >
                <Typography variant='h6'>Suggest an idea</Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="body2">Write a paragraph of the idea you want to see impemented</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12} >
                    <TextField
                        id="standard-textarea"
                        // label="Multiline Placeholder"
                        data-cy="suggestion-title"
                        placeholder="Write the title here..."
                        multiline
                        fullWidth
                        style={{ borderStyle: "dashed", borderColor: "black" }}
                        name='title'
                        value={formValues.title}
                        onChange={changeHandler}
                    />
                    <Typography data-cy="suggestion-title-error" style={{color: 'red'}} variant="caption">{formErrors.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-textarea"
                        // label="Multiline Placeholder"
                        data-cy="suggestion-desc"
                        placeholder="Write your suggestions here..."
                        multiline
                        fullWidth
                        rows={10}
                        name='description'
                        value={formValues.description}
                        onChange={changeHandler}
                    />
                    <Typography data-cy="suggestion-desc-error" style={{color: 'red', alignItems: 'center'}} variant="caption">{formErrors.description}</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Button fullWidth variant="contained"
                        data-cy="suggestion-submit"
                        type='submit'
                        style={{
                            borderRadius: 5,
                            color: "#fff",
                            backgroundColor: "#00D05A",
                            padding: "18px 36px",
                            fontSize: "18px"
                        }}
                    >Post</Button>
                </Grid>
            </form>
            {/* <Typography>side</Typography> */}
        </Grid>
    )
}