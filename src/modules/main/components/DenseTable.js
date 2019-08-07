import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Radio from '@material-ui/core/Radio';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein, status) {
  return { name, calories, fat, carbs, protein, status };
}

const rows = [
  createData('1234', "2018-11-25 01:22:12", 'PROD', "F628532", 123456, 'Paused'),
  createData('1234', "2018-11-25 01:22:12", 'PROD', "F628532", 123456, 'Paused'),
  createData('1234', "2018-11-25 01:22:12", 'PROD', "F628532", 123456, 'Error'),
  createData('1234', "2018-11-25 01:22:12", 'UAT', "F628532", 123456, 'Paused'),
  createData('1234', "2018-11-25 01:22:12", 'UAT2', "F628532", 123456, 'Paused'),
];


export default function DenseTable(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  function handleChange(event,dbType=null) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    if(dbType){
      if(dbType==="source"){
        props.onSourceDbchange(event)
      }else{
        props.onTargetDbChange(event);
      }
    }
    
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>

        </Table>

        <div>
          <table width={{ width: '100%' }}>
            <tbody>
            <tr>
              <td>Source DB</td>
              <td>
              <FormControl variant="outlined" >
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple" >
                  Source DB
                </InputLabel>
                <Select style={{width:'200px'}}
                  disabled ={props.isInvalidTag}
                  value={values.age}
                  onChange={(event)=>handleChange(event,"source")}
                  input={<OutlinedInput labelWidth={labelWidth} name="SourceDB" id="outlined-age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>UAT</MenuItem>
                <MenuItem value={20}>DEV</MenuItem>
                <MenuItem value={30}>PROD</MenuItem>
                </Select>
              </FormControl>
              </td>
              <td>Target DB</td>
              <td>
              <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" >
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple" >
                  Target DB
                </InputLabel>
                <Select  disabled ={props.isInvalidTag} style={{width:'200px'}}
                  value={values.age}
                  onChange={handleChange}
                  input={<OutlinedInput labelWidth={labelWidth} name="TargetDB" id="outlined-age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>UAT</MenuItem>
                <MenuItem value={20}>DEV</MenuItem>
                <MenuItem value={30}>PROD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            </td>
            </tr>
            <tr>
              <td>Context Key Level</td>
              <td><Radio
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
              />Enter in Box</td>
              <td>
                <TextareaAutosize aria-label="Minimum height" rows={3} placeholder="Minimum 3 rows" />;
</td>
            </tr>

            <tr>
              <td><Radio
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
              />Upload a file in Text of Excel format</td>
            </tr>
            </tbody>
          </table>
        </div>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.addUser}>
            Validate
              </Button>
          <span> </span>
          <Button variant="contained" color="primary" className={classes.addUser}>
            Submit
              </Button>
        </Grid>
      </Paper>
    </div>
  );
}
