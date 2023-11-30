import { useState } from 'react';
import { Card, IconButton, Collapse, Container, SxProps, Typography, Box } from '@mui/material';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type CollapsibleBoxProps = {
    children: JSX.Element[] | JSX.Element | string,
    text?: string,
    sx?: SxProps,
    id?: string
}

export const CollapsibleBox = (props: CollapsibleBoxProps): JSX.Element => {
    const { children, text, sx, id } = props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Card
            key={id}
            sx={{
                ...sx,
                border: ".5px solid rgba(211,211,211,0.6)"
            }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
            }}>
                <IconButton
                    onClick={() => setOpen(!open)}
                    aria-label="expand"
                    size="small"
                >
                    {
                        open ? <KeyboardArrowUpIcon />
                            : <KeyboardArrowDownIcon />
                    }
                </IconButton>
                <Typography sx={{ fontWeight: "bold", m: 1 }}>{text}</Typography>
            </Box>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <Container sx={
                    {
                        display: "flex",
                        gap: 2,
                        flexWrap: 'wrap'
                    }
                }>
                    {children}
                </Container>
            </Collapse>
        </Card>
    )
}