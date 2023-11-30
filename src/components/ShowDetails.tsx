import { useEffect, useMemo, useState } from "react";
import parse from 'html-react-parser';
import { Box, Link, Typography } from '@mui/material';
import { cast$, episodes$, queryShowCast, queryShowEpisodes, selected$ } from "../store";
import { CastMemberInfo, EpisodeInfo, ShowInfo } from "../types";
import { CollapsibleBox } from "./UI/Collapsible";
import { Rating } from "./UI/Rating";

export type EpisodesBySeason = {
    [key in number]: EpisodeInfo[]
};

export const ShowDetails = () => {
    const [show, setShow] = useState<ShowInfo | undefined>()
    const [episodes, setEpisodes] = useState<EpisodeInfo[]>([])
    const [cast, setCast] = useState<CastMemberInfo[]>([])

    useEffect(() => {
        const selectedSubscription = selected$.subscribe(setShow)
        const episodesSubscription = episodes$.subscribe(setEpisodes)
        const castSubscription = cast$.subscribe(setCast)

        return () => {
            selectedSubscription.unsubscribe()
            episodesSubscription.unsubscribe()
            castSubscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (show) {
            queryShowEpisodes(show.show.id)
            queryShowCast(show.show.id)
        }
    }, [show])

    const episodesBySeason = useMemo((): EpisodesBySeason =>
        episodes.reduce((acc: EpisodesBySeason, cur) =>
            (acc)[cur.season] ? { ...acc, [cur.season]: [...(acc)[cur.season], cur] } : { ...acc, [cur.season]: [cur] }, {}), [episodes]
    )

    if (!show) {
        return null
    }

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 2,
        }}
    >
        <Typography variant="h3">
            {show.show.name}
        </Typography>
        <Rating score={show.score} />
        <Box sx={{
            display: "flex",
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'

        }}>
            <img
                alt={show.show.name}
                src={show.show.image.original}
                style={{
                    maxWidth: 400
                }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Row text="Genre" value={show.show.genres} />
                <Row text="Country" value={show.show.network.country.name} />
                <Row text="Network" value={show.show.network.name} />
                <Row text="Started" value={show.show.premiered} />
                <Row text="Ended" value={show.show.ended} />
                {show.show.officialSite && <Link href={show.show.officialSite} >Official Website</Link>}
            </Box>
        </Box>
        <Typography
            sx={{ px: 8 }}
        >
            {show.show.summary && parse(show.show.summary)}
        </Typography>
        {episodes.length &&
            <>
                <CollapsibleBox
                    sx={{
                        width: '100%',
                        p: 1
                    }}
                    text="Episodes"
                >
                    {Object.entries(episodesBySeason).map(([season, episodes]) =>
                        <CollapsibleBox
                            text={`Season ${season}`}
                            sx={{ width: '100%' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%'
                                }}
                            >
                                {episodes.map((episode, index) => (
                                    episode.summary ?
                                        <CollapsibleBox
                                            id={episode.id.toString()}
                                            text={`Ep.${index + 1} ${episode.name}`}
                                            sx={{ width: '100%' }}
                                        >
                                            {parse(episode.summary)}
                                        </CollapsibleBox>
                                        :

                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                m: 1
                                            }}>
                                            {`Ep.${index + 1} ${episode.name}`}
                                        </Typography>

                                ))}
                            </Box>
                        </CollapsibleBox>
                    )}
                </CollapsibleBox >
                <CollapsibleBox
                    sx={{
                        width: '100%',
                        p: 1
                    }}
                    text="Cast"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2
                        }}
                    >
                        {cast.map((castMember) =>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                {
                                    castMember.person.image &&
                                    <img
                                        alt={castMember.person.name}
                                        src={castMember.person.image.medium}
                                        style={{
                                            maxWidth: 60
                                        }}
                                    />
                                }
                                {
                                    castMember.character.image &&
                                    <img
                                        alt={castMember.character.name}
                                        src={castMember.character.image.medium}
                                        style={{
                                            maxWidth: 60
                                        }}
                                    />
                                }
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        m: 1
                                    }}>
                                    {`${castMember.person.name} - ${castMember.character.name}`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CollapsibleBox>
            </>
        }
    </Box>
}

const Row = (props: { text: string, value: string | string[] }) => {
    const { text, value } = props;

    if (!value) {
        return null
    }

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>{text}: </Typography>
            {typeof value === "string" ? <Typography>{value}</Typography> : <Typography>{value.map((genre, i) => `${genre}${i === value.length - 1 ? "" : ", "}`)}</Typography>}
        </Box>
    )
}