import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';

interface IState {
    //links: any[];
    headline: any[];
}
interface IMediaGridProps {
    SearchQuery: (string | null);

}
function MediaGrid(props: IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{headline: []}]);

    useEffect(() => {//
        fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + props.SearchQuery + '&api-key=' + process.env.REACT_APP_NYT_API_KEY)
        .then(response => response.json())
            .then(response => {

                //console.log(response.response.docs)
                //console.log(response.response.docs[0].multimedia[0].url)
                setItemArray(response.response.docs)
                //console.log(response.response.docs[0].headline.main)
            })

    }, [props.SearchQuery]);
    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: any, i: Number) => {
        //console.log(el)
        //console.log(el.headline)
        if (!el || !el.abstract) {
            console.log("Skipping")
            return;
        }
        //console.log(el.headline.main)
        
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard Description={el['headline']["main"]} />
            </Grid>)
        
    })

    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid
/**/