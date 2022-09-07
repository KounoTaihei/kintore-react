import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { themeColor } from "../data/data";

function Footer () {
    const [value, setValue] = useState(0);

    return (
        <footer>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    sx={{ backgroundColor: themeColor }}
                >
                    <BottomNavigationAction label="何か" icon={<FontAwesomeIcon icon={faShare} />} />
                    <BottomNavigationAction label="何か" icon={<FontAwesomeIcon icon={faShare} />} />
                    <BottomNavigationAction label="何か" icon={<FontAwesomeIcon icon={faShare} />} />
                </BottomNavigation>
            </Paper>
        </footer>
    )
}

export default Footer