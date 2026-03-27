import { Person, SportsEsports, Timeline, AccessTime, Thermostat } from "@mui/icons-material";
import MetricCard, { type CardProps } from "./MetricCard";
import { Grid } from "@mui/material";


const cards: CardProps[] = [
    { metric: "Total users", value: 100, Icon: Person },
    { metric: "Active sessions", value: 15, Icon: SportsEsports },
    { metric: "Dev progress", value: "84%", Icon: Timeline },
    { metric: "Time", value: "10:30", Icon: AccessTime },
    { metric: "Temperature", value: "6°", Icon: Thermostat }
];

function Dashboard() {
    return (
        <Grid container spacing={2}>
            {cards.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard {...item} />
                </Grid>))}
        </Grid>
    )
}

export default Dashboard;