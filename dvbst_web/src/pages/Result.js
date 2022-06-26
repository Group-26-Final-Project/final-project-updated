import {
  Grid,
  Typography,
  makeStyles,
  Avatar,
  Container,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SpinnerCircularFixed } from "spinners-react";
import {
  getElectionResult,
  getElections,
  renderElectionResult,
} from "../features/electionsSlice";
import { useMoralis } from "react-moralis";
import ReactApexChart from "react-apexcharts";

// function createData(Ranks, Views, Full_name, Other_info) {
//     return { Ranks, Views, Full_name, Other_info }
// }

// const rows = [
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
// ]

function Result() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const electionsState = useSelector((state) => state.electionsState);
  const { Moralis } = useMoralis();
  const [electionname, setElectionname] = useState("");

  const extractSeries = (election) => {
    const series = [];
    const labels = [];
    const data = [];

    
    if(election){
      election.forEach((candidate) => {
        labels.push(candidate.name);
      });

      var total = 0;
      for (let index = 0; index < election.length; index++) {
        total = total + election[index].voteCount;
        
      }

      election.forEach((candidate) => {
        data.push(`${~~((candidate.voteCount/total) * 100)} %`);
      });
    }
    
    return { series, labels, data };
  }
  const options = {
    chart: {
      id: "basic-bar",
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    xaxis: {
      categories: electionsState.election ? extractSeries(electionsState.election).labels : ["nothing"],
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 0.6,
        color: "#00D05A"
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#333"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + ~~val + " %";
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    series: [
      {
        name: "AAiT Election",
        data: electionsState.election ? extractSeries(electionsState.election).data : [2],
      },
    ],
  };
  useEffect(() => {
    dispatch(getElections());
  }, [dispatch]);

  const subscribeToResult = async (e) => {
    const syncTable = Moralis.Object.extend("ResultRTTrial");
    const query = new Moralis.Query(syncTable);
    query.equalTo("electionName", e.target.value);
    var result = await query.find();
    // console.log("result", result[0]);
    // console.log("candidate", result[0].get("candidate"));
    // console.log("count", result[0].get("voteCount"));
    var subscription = await query.subscribe();
    subscription.on("update", (res) => {
      console.log("object updated");
      console.log(res[0]);
      var electionResult = result[0].get("result");
      dispatch(renderElectionResult(electionResult));
    });
    var electionResult = result[0].get("result");
    dispatch(renderElectionResult(electionResult));

    console.log("electionResult", electionResult);
    setElectionname(e.target.value);
  };
  const handleChange = async (event) => {
    dispatch(getElectionResult(event.target.value));
  };

  return (
    <Grid container>
      <Grid container justifyContent="center" className={classes.my_background}>
        {(electionsState.getElectionsStatus === "pending" ||
          electionsState.getElectionResultStatus === "pending") && (
          <>
            <SpinnerCircularFixed
              size={50}
              thickness={100}
              speed={100}
              color="#36ad47"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          </>
        )}
        {(electionsState.getElectionsStatus === "failed" ||
          electionsState.getElectionResultStatus === "failed") && (
          <>
            <h3>Ooops something went wrong</h3>
            <button onClick={() => window.location.reload()}>Refresh</button>
          </>
        )}
        {
          (electionsState.getElectionsStatus === "success" ||
          electionsState.getElectionResultStatus === "success") && (electionsState.elections.length === 0) && (
          <>
            <Typography className={classes.my_typogrphy} variant="h5">
              No Election Results
            </Typography>
          </>
        )
        }
        {
          (electionsState.getElectionsStatus === "success" ||
          electionsState.getElectionResultStatus === "success") && (electionsState.elections.length !== 0) && (
            <Grid container >
          <Grid alignContent="flex-start" item xs={4} sm={3}>
            <Typography className={classes.my_typogrphy} variant="h5">
              Election Results
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                data-cy="election-dropdown"
                style={{ background: "white" }}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={
                  electionsState.election ? electionsState.election._id : ""
                }
                onChange={subscribeToResult}
                label="Section"
              >
                {/* <MenuItem selected disabled hidden>--Select--</MenuItem> */}
                {electionsState.elections.map((election) => (
                  <MenuItem
                    data-cy="election-dropdown-item"
                    key={election._id}
                    value={election.name}
                  >
                    {election.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
          </Grid>
          <Grid item xs={8} sm={8} justifyContent="center" alignContent="center">
          <Typography className={classes.my_typogrphy} variant="h4">
              {electionname}{" "}
            </Typography>
            </Grid>
        </Grid>
          )
        }
        
        {electionsState.getElectionsStatus !== "pending" &&
          electionsState.getElectionResultStatus !== "pending" &&
          electionsState.elections &&
          electionsState.election &&
          electionsState.election.length >= 3 &&

           (
            <>
              <Grid item xs={12} sm={12} md={10}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Box display="flex" alignItems="flex-end" mb={0.5}>
                      <Typography
                        data-cy="candidate-rank"
                        className={classes.my_typogrphy}
                        variant="h3"
                      >
                        2
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        nd
                      </Typography>
                    </Box>
                    <Avatar
                      data-cy="candidate-avatar"
                      className={classes.large}
                      src="https://randomuser.me/api/portraits/women/81.jpg"
                    ></Avatar>
                    <Box mt={0.7}>
                      <Typography
                        data-cy="candidate-name"
                        className={classes.my_typogrphy}
                      >
                        {electionsState.election[1].name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Typography
                        data-cy="candidate-votecount"
                        className={classes.my_typogrphy}
                        variant="h3"
                      >
                        {electionsState.election[1].voteCount}
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        votes
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Box display="flex" alignItems="flex-end" mb={0.5}>
                      <Typography className={classes.my_typogrphy} variant="h3">
                        1
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        st
                      </Typography>
                    </Box>
                    <Avatar
                      className={classes.large}
                      src="https://randomuser.me/api/portraits/women/81.jpg"
                    ></Avatar>
                    <Box mt={0.7}>
                      <Typography className={classes.my_typogrphy}>
                        {electionsState.election[0].name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4.5}>
                      <Typography className={classes.my_typogrphy} variant="h3">
                        {electionsState.election[0].voteCount}
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        votes
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Typography className={classes.my_typogrphy} variant="h3">
                        3
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        rd
                      </Typography>
                    </Box>
                    <Avatar
                      className={classes.large}
                      src="https://randomuser.me/api/portraits/women/81.jpg"
                    ></Avatar>
                    <Box mt={0.7}>
                      <Typography className={classes.my_typogrphy}>
                        {electionsState.election[2].name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Typography className={classes.my_typogrphy} variant="h3">
                        {electionsState.election[2].voteCount}
                      </Typography>
                      <Typography className={classes.my_typogrphy} variant="h6">
                        votes
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}{(electionsState.election) &&

          
            <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <Grid item className={classes.grid}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ranks </TableCell>
                      <TableCell align="left">Full Name</TableCell>
                      <TableCell align="left">Vote Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {electionsState.election.map((row,index) => (
                      <TableRow key={index}>
                                                <TableCell align="left">{index+1}</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>

                        <TableCell align="left">{row.voteCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid>
            <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
      {/* <button className="loginButton" onClick={handleRefreshData}>
        Refresh Data{" "}
      </button> */}
            </Grid>
          </Grid>
          }
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  my_typogrphy: {
    color: "white",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 600,
  },
  my_background: {
    backgroundColor: "#2F313D",
    height: "60vh",
  },
  grid: {
    marginTop: "-10px",
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));
export default Result;
