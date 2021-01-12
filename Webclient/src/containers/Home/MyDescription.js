import { Avatar, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    }
}));

function MyDescription() {

    const classes = useStyles();

    return (
        <div>
            <Grid container alignItems='center' spacing={3}>
                <Grid item alignContent='center' xs={6}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                </Grid>
                <Grid item xs={6}>
                    <p>Passionate about programming and ways in which technology can improve our everyday lives. I find Computer Science and Artificial Intelligence interesting, since abstracting real world problems into code is very fascinating. I want to study in this field so I can broaden my knowledge and build a career afterwards.</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default MyDescription
