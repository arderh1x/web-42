import { Alert, AlertTitle, Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, Slider, Snackbar, TextField, Typography, type SnackbarCloseReason } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { toast, ToastContainer } from "react-toastify";

type Asset = {
    name: string;
    description: string;
    category: string;
    price: string;
    priority: number;
}

type MUIToast = {
    open: boolean;
    message: string;
    severity: "success" | "error";
}

function AssetRegistration() {
    const emptyFormData: Asset = {
        name: "",
        description: "",
        category: "",
        price: "",
        priority: 5,
    };
    const emptyMuiToast: MUIToast = {open: false, message: "", severity: "success"};

    const [formData, setFormData] = useState<Asset>(emptyFormData);
    const [muiToast, setMuiToast] = useState<MUIToast>(emptyMuiToast);

    const handleCloseToast = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        setMuiToast(emptyMuiToast);
    }

    const handleChange = (field: keyof Asset, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toast.success(<span>Asset was registered!<br />[ToastContainer by react-toastify]</span>);
        setMuiToast({
            open: true,
            message: "Asset was registered!",
            severity: "success"
        });
        console.log("REGISTERED ASSET: ", formData);
        setFormData(emptyFormData);
    };

    return (
        <Paper elevation={5} sx={{ p: 3, maxWidth: 600, mx: "auto", bgcolor: "#d8d1f3" }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#32285c" }}>
                Asset Registration
            </Typography>

            <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                
                <Paper elevation={3} sx={{ bgcolor: "#d8d1f3" }}>
                    <TextField variant="outlined" label="Asset name" value={formData.name} fullWidth
                        onChange={(e) => handleChange("name", e.target.value)} required />
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "#d8d1f3" }}>
                    <TextField variant="filled" label="Asset description" value={formData.description} fullWidth
                        multiline rows={3}
                        onChange={(e) => handleChange("description", e.target.value)} required />
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "#d8d1f3" }}>
                    <TextField label="Cost" variant="outlined" type="number" value={formData.price} fullWidth
                        onChange={(e) => handleChange("price", e.target.value)} required
                        slotProps={{ input: { startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>)}}} />
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "#d8d1f3" }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-category">Category</InputLabel>
                        <Select labelId="select-category" label="Category" value={formData.category}
                            onChange={(e) => handleChange("category", e.target.value)} required
                            MenuProps={{ PaperProps: { sx: { bgcolor: "#d8d1f3" } } }} >

                            <MenuItem value="model">3D-model</MenuItem>
                            <MenuItem value="texture">Texture</MenuItem>
                            <MenuItem value="script">Script</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>

                <Paper elevation={5} sx={{ p: 2, bgcolor: "#d8d1f3" }}>
                    <Typography sx={{ color: "text.secondary", mb: 1 }}>
                        Priority level
                    </Typography>
                    <Slider value={formData.priority} sx={{ color: "#32285c" }}
                        onChange={(_event, value) => handleChange("priority", value as number)}
                        step={1} min={1} max={10} marks valueLabelDisplay="auto" />
                </Paper>

                <Button type="submit" variant="contained"
                    sx={{ bgcolor: "#32285c", "&:hover": { bgcolor: "#241c45" } }}>
                    Register
                </Button>
            </Box>
            
            <ToastContainer position="bottom-left" autoClose={3000} />
            <Snackbar open={muiToast.open} autoHideDuration={3000} onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
                <Alert severity={muiToast.severity} variant="filled">
                    <AlertTitle>{muiToast.message}</AlertTitle>
                    [Snackbar by MUI]
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default AssetRegistration;