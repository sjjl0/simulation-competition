import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export default function CopyRight(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'制作 by '}
            <Link color="inherit" href="https://mui.com/">
                秃头联盟
            </Link>{' '}
            {'2021.11'}
        </Typography>
    );
}