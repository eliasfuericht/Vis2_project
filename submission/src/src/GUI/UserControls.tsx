import {Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography} from "@mui/material";
import {ReactElement} from "react";
import {DataSet} from "../EdgeBundling/EdgeBundling.types.ts";

/** The UserControlsProps type. */
export type UserControlsProps = {
    /**
     * The setter for the deroute parameter.
     */
    setK: (k: number) => void;
    /**
     * The deroute parameter.
     */
    k: number;
    /**
     * The setter for the edge weight parameter.
     */
    setD: (d: number) => void;
    /**
     * The edge weight parameter.
     */
    d: number;
    /**
     * The setter for the number of segments.
     */
    setNumSegments: (numSegments: number) => void;
    /**
     * The number of segments.
     */
    numSegments: number;
    /**
     * The setter for the data set.
     */
    setDataSet: (dataSet: DataSet) => void;
    /**
     * The data set.
     */
    dataSet: DataSet | '';
};

/**
 * This component renders the user controls for the edge bundling parameters.
 *
 * @param props - The UserControlsProps object.
 * @param props.setK - The setter for the deroute parameter.
 * @param props.k - The deroute parameter.
 * @param props.setD - The setter for the edge weight parameter.
 * @param props.d - The edge weight parameter.
 * @param props.setNumSegments - The setter for the number of segments.
 * @param props.numSegments - The number of segments.
 * @param props.setDataSet - The setter for the data set.
 * @param props.dataSet - The data set.
 */
export function UserControls(
    { setK, k, setD, d, setNumSegments, numSegments, dataSet, setDataSet }: UserControlsProps
): ReactElement {
    return (
    <Box
        sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(68, 68, 68, 0.7)',
            borderRadius: '8px',
            padding: '16px',
            width: '12rem',
            zIndex: (theme) => theme.zIndex.drawer + 2
        }}
    >
        <Typography variant="h6" fontSize={18} gutterBottom>
            Parameters
        </Typography>

        <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth style={{ marginTop: "16px" }}>
                <InputLabel>Select a Dataset</InputLabel>
                <Select
                    label="Data Set"
                    value={dataSet}
                    onChange={(e) => setDataSet(e.target.value as DataSet)}
                    displayEmpty
                >
                    <MenuItem value={DataSet.DEMO}>Demo</MenuItem>
                    <MenuItem value={DataSet.PRESENTATION}>Presentation</MenuItem>
                </Select>
            </FormControl>
        </Box>

        {/* Slider for 'k' */}
        <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="body1" fontSize={14}>Deroute Parameter (k)</Typography>
            <Slider
                value={k}
                onChange={(_e, value) => setK(value as number)}
                min={0.5}
                max={10}
                step={0.1}
                valueLabelDisplay="auto"
                size={'small'}
            />
        </Box>

        {/* Slider for 'd' */}
        <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="body1" fontSize={14}>Edge Weight Parameter (d)</Typography>
            <Slider
                value={d}
                onChange={(_e, value) => setD(value as number)}
                min={0.5}
                max={10}
                step={0.1}
                valueLabelDisplay="auto"
                size={'small'}
            />
        </Box>

        {/* Slider for 'numSegments' */}
        <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="body1" fontSize={14}>Curve Smoothness (number of segments)</Typography>
            <Slider
                value={numSegments}
                onChange={(_e, value) => setNumSegments(value as number)}
                min={10}
                max={200}
                step={1}
                valueLabelDisplay="auto"
                size={'small'}
            />
        </Box>
    </Box>
    );
  }