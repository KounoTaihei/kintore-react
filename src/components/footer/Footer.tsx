import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

function Footer () {
    const [value, setValue] = useState(0);

    return (
        <footer>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: '0.3rem' }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
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