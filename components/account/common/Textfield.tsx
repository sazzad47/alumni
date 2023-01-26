import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';


 interface Props {
  variant: "outlined" | "standard" | "filled",
  label?: string,
  placeholder?: string,
  fullWidth?: boolean,
  multiline?: boolean,
  minRows?: number,
  inputColor?: string,
  labelColor?: string,
  labelFocusedColor?: string,
  underlineBeforeColor?: string,
  underlineBeforeHoverColor?: string,
  underlineAfterColor?: string,
  underlineAfterHoverColor?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  value?: string,

}
export const CustomTextField = (props: Props) => {
          return (
            <TextField 
              multiline={props.multiline}
              minRows={props.minRows}
              variant={props.variant}
              label={props.label}
              placeholder={props.placeholder}
              fullWidth = {props.fullWidth}
              sx={{
                input: {
                  color: props.inputColor
                },
                textarea: {
                  color: props.inputColor
                },
                label: {
                  color: props.labelColor
                },
                '& label.Mui-focused': {color: props.labelFocusedColor},
                '& .MuiInput-underline:before': { borderBottomColor: props.underlineBeforeColor },
                '& .MuiInput-underline:hover:before': { borderBottomColor: props.underlineBeforeHoverColor },
                '& .MuiInput-underline:after': { borderBottomColor: props.underlineAfterColor },
                '& .MuiInput-underline:hover:after': { borderBottomColor: props.underlineAfterHoverColor },
              }}
              onChange={props.onChange}
              onFocus={props.onFocus}
              onBlur={props.onFocus}
              value={props.value}
              autoComplete="off"
            />
          )
}

export const CssTextField = styled(TextField)({
   '& .MuiInputBase-input': {
    borderColor: 'green',
   },
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

export default function CustomizedInputs() {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
    >
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Bootstrap
        </InputLabel>
        <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
      </FormControl>
      <RedditTextField
        label="Reddit"
        defaultValue="react-reddit"
        id="reddit-input"
        variant="filled"
        style={{ marginTop: 11 }}
      />
      <CssTextField label="Custom CSS" id="custom-css-outlined-input" />
      <ValidationTextField
        label="CSS validation style"
        required
        variant="outlined"
        defaultValue="Success"
        id="validation-outlined-input"
      />
    </Box>
  );
}