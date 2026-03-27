import { Typography, Card, CardContent, Stack } from '@mui/material';
import { type SvgIconComponent } from '@mui/icons-material';

export type CardProps = {
  metric: string;
  value: string | number;
  Icon: SvgIconComponent;
};

function MetricCard({ metric, value, Icon }: CardProps) {
  return (
    <Card elevation={3} className="metric-card" sx={{ bgcolor: "#4d3c8a", color: "#e3d0f5" }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon fontSize="large" />
          <Typography sx={{ fontSize: 20 }}>{metric}:</Typography>
          <Typography sx={{ fontSize: 30 }} fontWeight="bold">{value}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MetricCard;