import { Checkbox, FormControlLabel, Box, FormGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  headerText: {
    color: "#674EA7",
  },
  text: {
    color: "red",
  },
  logo: {
    height: 60,
    paddingTop: 3,
  },
});

export default function CheckmarkDisplayer({
  value,
  setValue,
  headerText,
  itemList,
}) {
  const classes = useStyles();

  const handleChange = (event, index) => {
    const newValue = value;
    newValue[index].checked = event.target.checked;
    setValue(newValue);
  };

  return (
    <Box>
      {/* Body - checklist */}
      <Box sx={{ paddingLeft: 1 }}>
        <FormGroup>
          {itemList.map((element, index) => {
            return (
              <FormControlLabel
                key={element.id}
                control={
                  <Checkbox
                    value={value[index].checked}
                    onChange={(event) => handleChange(event, index)}
                  />
                }
                label={element.label}
              />
            );
          })}
        </FormGroup>
      </Box>
    </Box>
  );
}
